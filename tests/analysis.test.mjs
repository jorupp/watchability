import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzeGame } from '../.next/analysis-tests/analysis.js';

function play(overrides = {}) {
    return { id: 'opportunity', prd: 4, clck: '2:00', hmScr: 20, awyScr: 13,
        tm: 'away', txt: 'Incomplete pass', plyTypId: '3', ...overrides };
}

function game({ sport = 'football', periods = 4, periodSeconds = 900, plays = [play()], homeLoser = false, drives = [] } = {}) {
    const first = plays[0];
    // Seed the scoreboard before the late plays. Both WP entries heavily favor the winner.
    const plys = [play({ id: 'start', prd: 1, clck: `${periodSeconds / 60}:00`, hmScr: first.hmScr,
        awyScr: first.awyScr, tm: 'home', txt: 'Start game', wnPrb: 99, team: homeLoser ? 'AWAY' : 'HOME' }),
        ...plays,
        play({ ...plays.at(-1), id: 'end', clck: '0:00', txt: 'End of Game', wnPrb: 100, team: homeLoser ? 'AWAY' : 'HOME' })];
    const allDrives = sport === 'football' ? [
        { lx: { id: 'start', wp: { favoredTeamAbbrev: homeLoser ? 'AWAY' : 'HOME', favoredTeamWinPercentage: '99' } } },
        ...drives,
        { lx: { id: 'end', wp: { favoredTeamAbbrev: homeLoser ? 'AWAY' : 'HOME', favoredTeamWinPercentage: '100' } } },
    ] : undefined;
    return { page: { content: { gamepackage: {
        gmStrp: { nm: sport, tms: [
            { id: 'home', abbrev: 'HOME', isHome: true, score: homeLoser ? '13' : '20' },
            { id: 'away', abbrev: 'AWAY', isHome: false, score: homeLoser ? '20' : '13' },
        ] }, fmt: { prds: periods, prdScnds: periodSeconds, otScnds: 300 }, plys, allDrives,
    } } } };
}

function score(options) {
    return analyzeGame(game(options), 'test').scoreParts.at(-1);
}

test('football uses the actual clock: 8:00 = 0, 5:00 = 50, 2:00 or later = 100', () => {
    for (const [clck, expected] of [['9:00', 0], ['8:00', 0], ['5:00', 50], ['2:00', 100], ['0:01', 100]]) {
        assert.equal(score({ plays: [play({ clck })] }), expected);
    }
    assert.equal(score({ plays: [play({ prd: 3, clck: '0:01' })] }), 0);
});

test('football accepts deficits through 8 and gives the 30% bonus through 6', () => {
    for (const [deficit, expected] of [[9, 0], [8, 100], [7, 100], [6, 130], [1, 130], [0, 130], [-1, 130]]) {
        assert.equal(score({ plays: [play({ awyScr: 20 - deficit })] }), expected);
    }
    assert.equal(score({ plays: [play({ awyScr: 14, clck: '5:00' })] }), 65);
});

test('when trailing, only the eventual loser having possession qualifies, with home/away handled symmetrically', () => {
    assert.equal(score({ plays: [play({ tm: 'home' })] }), 0);
    assert.equal(score({ homeLoser: true, plays: [play({ tm: 'home', hmScr: 13, awyScr: 20 })] }), 100);
});

test('being tied or ahead qualifies without possession in either sport', () => {
    for (const sport of ['football', 'basketball']) {
        for (const homeLoser of [false, true]) {
            for (const deficit of [0, -1, -10]) {
                assert.equal(score({ sport, homeLoser, plays: [play({
                    tm: homeLoser ? 'away' : 'home',
                    hmScr: homeLoser ? 20 - deficit : 20,
                    awyScr: homeLoser ? 20 : 20 - deficit,
                    txt: 'Opponent has the ball',
                })] }), 130);
            }
        }
    }
});

test('being tied or ahead uses the same timing ramp and bonus without possession', () => {
    for (const [clck, expected] of [['8:00', 0], ['5:00', 65], ['2:00', 130]]) {
        for (const awyScr of [20, 27]) {
            assert.equal(score({ plays: [play({ clck, tm: 'home', awyScr })] }), expected);
        }
    }
});

test('the latest qualifying possession determines the bonus, rather than the highest earlier score', () => {
    assert.equal(score({ plays: [play({ clck: '2:00', awyScr: 14 }),
        play({ clck: '1:30', hmScr: 21, awyScr: 14, tm: 'home', scrng: true, txt: 'Field goal good' }),
        play({ clck: '1:00', hmScr: 21, awyScr: 14 })] }), 100);
});

test('football uses start-team possession on an interception, independent of WP', () => {
    const lastPlay = play({ tm: 'home', txt: 'Pass intercepted', clck: '2:00' });
    assert.equal(score({ plays: [lastPlay], drives: [{ lx: { id: lastPlay.id, ld: '2nd & 10', sa: true } }] }), 100);
});

test('post-play scoring does not manufacture a one-possession opportunity', () => {
    for (const sport of ['football', 'basketball']) {
        const basketball = sport === 'basketball';
        const scored = play({ id: 'score', tm: 'away', awyScr: basketball ? 17 : 13,
            txt: basketball ? 'Player made Three Point Jumper.' : 'Field goal good', scrng: true });
        assert.equal(score({ sport, plays: [play({ id: 'before', clck: '3:00', tm: 'home', awyScr: 10 }), scored] }), 0);
    }
});

test('basketball uses 4 points per possession and bonuses deficits of 2 or less', () => {
    for (const [deficit, expected] of [[5, 0], [4, 100], [3, 100], [2, 130], [1, 130]]) {
        assert.equal(score({ sport: 'basketball', periods: 2, periodSeconds: 1200,
            plays: [play({ prd: 2, clck: '1:20', awyScr: 20 - deficit, txt: 'Player missed Jumper.' })] }), expected);
    }
});

test('basketball scales to halves, quarters and NBA regulation length', () => {
    for (const [periods, periodSeconds, clck, expected] of [
        [2, 1200, '5:20', 0], [2, 1200, '3:20', 50], [2, 1200, '1:20', 100],
        [4, 600, '1:20', 100], [4, 720, '1:36', 100],
    ]) {
        assert.equal(score({ sport: 'basketball', periods, periodSeconds,
            plays: [play({ prd: periods, clck, awyScr: 17, txt: 'Player missed Jumper.' })] }), expected);
    }
});

test('basketball defensive fouls, blocks and substitutions do not imply offensive possession', () => {
    for (const txt of ['Foul on Player.', 'Player Block.', 'Player subbing in']) {
        assert.equal(score({ sport: 'basketball', plays: [play({ awyScr: 17, txt })] }), 0);
    }
    assert.equal(score({ sport: 'basketball', plays: [play({ awyScr: 17, txt: 'Player Defensive Rebound.' })] }), 100);
});

test('overtime opportunities receive full timing credit', () => {
    assert.equal(score({ plays: [play({ prd: 5, clck: '2:30' })] }), 100);
});

test('unsupported sports and missing or invalid possession data give no extra score', () => {
    assert.equal(score({ sport: 'hockey' }), 0);
    assert.equal(score({ plays: [play({ tm: undefined })] }), 0);
    assert.equal(score({ plays: [play({ clck: 'invalid' })] }), 0);
    const g = game();
    delete g.page.content.gamepackage.plys;
    assert.equal(analyzeGame(g, 'test').scoreParts.at(-1), 0);
});

test('the new component participates in the combined analysis score', () => {
    const analysis = analyzeGame(game(), 'test');
    assert.equal(analysis.scoreParts.length, 6);
    assert.equal(analysis.scoreParts[5], 100);
    assert.ok(analysis.score >= 100);
});
