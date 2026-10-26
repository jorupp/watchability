import type { RootObject as Game } from "../types/game";
import { groupBy, last, max, range, takeWhile, zip } from 'lodash';

export interface AnalysisResult {
    avgLoserWP: number;
    maxLoserWP: number;
    totalChange: number;
    avgChangePerPlay: number;
    numPlays: number;
    maxLoserWPAfter50Pct: number;
    maxLoserWPAfter75Pct: number;
    maxLoserWPAfter90Pct: number;
    maxLoserWPAfter95Pct: number;
    maxLoserWPAfter975Pct: number;
    scoreParts: number[];
    score: number;
    winProbHistogram: number[];
    numberOfRuns: number;
}

function parseClock(clck: string) {
    const [minutes, seconds] = clck.split(':').map(Number);
    return minutes * 60 + seconds;
}

function latePossessionScore(game: Game): number {
    const pkg = game?.page?.content?.gamepackage;
    const sport = pkg?.gmStrp?.nm;
    if (sport !== 'football' && sport !== 'basketball') return 0;

    const teams = pkg.gmStrp.tms;
    const home = teams?.find(team => team.isHome);
    const away = teams?.find(team => !team.isHome);
    if (!home || !away) return 0;
    // Use the final score, not the team attached to the last play or WP entry.
    const homeScore = Number(home.score);
    const awayScore = Number(away.score);
    if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore) || homeScore === awayScore) return 0;
    const loser = homeScore < awayScore ? home : away;
    const otherTeam = (team: string) => team === home.id ? away.id : home.id;
    const periods = pkg.fmt?.prds;
    const periodSeconds = pkg.fmt?.prdScnds;
    const duration = periods * periodSeconds;
    if (!(duration > 0)) return 0;
    const maxPoints = sport === 'football' ? 8 : 4;
    const easyLeadPoints = sport === 'football' ? 6 : 2;
    const footballPlays = new Map(pkg.allDrives?.map(drive => [drive.lx?.id, drive.lx]));
    let possession: string | undefined;
    let previous: { hmScr: number; awyScr: number } = { hmScr: 0, awyScr: 0 };
    let previousPeriod: number | undefined;
    let latest: { remaining: number; deficit: number } | undefined;

    function consider(team: string | undefined, scores: typeof previous, remaining: number) {
        const deficit = loser.isHome ? scores.awyScr - scores.hmScr : scores.hmScr - scores.awyScr;
        const competitive = deficit <= 0 || (team === loser.id && deficit <= maxPoints);
        if (competitive && (!latest || remaining <= latest.remaining)) {
            latest = { remaining, deficit };
        }
    }

    // Keep plays without WP: possession can make a game competitive even when WP says otherwise.
    for (const play of pkg.plys ?? []) {
        if (!Number.isFinite(play.prd) || typeof play.clck !== 'string' ||
            !Number.isFinite(play.hmScr) || !Number.isFinite(play.awyScr)) continue;
        const clock = parseClock(play.clck);
        if (!Number.isFinite(clock) || clock < 0 || clock > (play.prd > periods ? (pkg.fmt.otScnds ?? periodSeconds) : periodSeconds)) continue;
        const remaining = play.prd > periods ? 0 : (periods - play.prd) * periodSeconds + clock;
        if (play.prd !== previousPeriod) possession = undefined;
        previousPeriod = play.prd;
        const actor = teams.some(team => team.id === play.tm) ? play.tm : undefined;
        const text = play.txt ?? '';
        const endOfPeriod = /^End of /i.test(text);
        let before = possession;
        let after = possession;

        if (sport === 'football') {
            const details = footballPlays.get(play.id);
            // The play's team can be the defense on a turnover. The start-team flag
            // identifies who actually had the scoring opportunity before that play.
            before = details?.ld ? (details.sa ? away.id : home.id) : actor;
            after = actor;
            if (/kickoff/i.test(text)) before = undefined;
            if (play.scrng) after = undefined;
            if (/extra point|two.point (pass|rush|conversion)/i.test(text) && !/touchdown/i.test(text)) {
                before = undefined;
                after = undefined;
            }
        } else if (actor) {
            if (/\b(made|missed|turnover)\b/i.test(text)) {
                before = actor;
                after = /turnover|\bmade\b/i.test(text) && !/free throw/i.test(text) ? otherTeam(actor) : undefined;
            } else if (/rebound|\bsteal\b/i.test(text)) {
                after = actor;
            } else if (/\bblock\b/i.test(text)) {
                before = otherTeam(actor);
                after = undefined;
            }
            // Fouls, substitutions and timeouts belong to either team; their tm
            // field alone is not evidence that the team possessed the ball.
        }

        if (!endOfPeriod) {
            // Scores on ESPN plays are post-play. A basket that cuts a six-point
            // deficit to three does not create another possession for the scorer.
            consider(before, previous, remaining);
            if (clock > 0) consider(after, play, remaining);
        }
        possession = endOfPeriod ? undefined : after;
        previous = play;
    }

    if (!latest) return 0;
    // Linear ramp from 4/30 remaining (0) to 1/30 (100), then apply the lead bonus.
    const base = Math.max(0, Math.min(100, (4 - 30 * latest.remaining / duration) / 3 * 100));
    return base * (latest.deficit <= easyLeadPoints ? 1.3 : 1);
}

export function analyzeGame(game: Game, eventId: string): AnalysisResult | null {
    if (game?.page?.content?.gamepackage?.allDrives) {
        const basePlays = game.page.content.gamepackage.allDrives.map(i => i.lx?.wp).filter(Boolean);
        if (basePlays.length >= 1) {
            // gamePct will be simple - just number of plays
            const plays = basePlays.map((i, ix) => ({ favoredTeam: i.favoredTeamAbbrev, wnPrb: parseFloat(i.favoredTeamWinPercentage), gamePct: ix / (basePlays.length - 1)}))
            const winner = plays[plays.length - 1].favoredTeam;
            const lowerWinProb = plays.map(({ wnPrb, gamePct }) => ({wnPrb: 100-(wnPrb || 100), gamePct }));
            const simpleLoserWP = plays.map(({favoredTeam, wnPrb, gamePct}) => ({wnPrb: favoredTeam !== winner ? wnPrb || 0 : 100-(wnPrb || 0), gamePct }));
            // football has fewer plays, so bigger wnPct changes are expected
            return analyzeWinProb(lowerWinProb, simpleLoserWP, [2, 6], latePossessionScore(game));
        }
    }
    if(game?.page?.content?.gamepackage?.plys) {
        const plays = game.page.content.gamepackage.plys.filter(i => i.wnPrb !== undefined && i.wnPrb !== null && i.clck !== undefined && i.prd !== undefined); // only consider plays with win probability and clock defined
        if (plays.length >= 1)
        {
            const winner = plays[plays.length - 1].team;
            const totalP = max(plays.map(i => i.prd)) || 0;
            const maxClockPerP = Object.fromEntries(Object.entries(groupBy(plays, 'prd')).map(([prd, plays]) => ([prd, max(plays.map(i => parseClock(i.clck))) || 0])));
            // given a period and clock, calculate the percentage of the game that has been played, assuming all periods are equal-length (this gives extra bias to overtimes, but overtimes are good, so that's good)
            function getGamePct(prd: number, clck: string) {
                const maxClock = maxClockPerP[prd];
                const clckSec = parseClock(clck);
                return ((maxClock - clckSec) / maxClock)/totalP + (prd-1)/totalP;
            }
            const lowerWinProb = plays.map(({ wnPrb, prd, clck}) => ({wnPrb: 100-(wnPrb || 100), gamePct: getGamePct(prd, clck) }));
            const simpleLoserWP = plays.map(({team, wnPrb, prd, clck}) => ({wnPrb: team !== winner ? wnPrb || 0 : 100-(wnPrb || 0), gamePct: getGamePct(prd, clck) }));
            // basketball has a lot of plays, so wnPct doesn't change much per play
            return analyzeWinProb(lowerWinProb, simpleLoserWP, [0.5, 2.5], latePossessionScore(game));
        }
    }
    if(false) {
        console.log('No data to use to find win probability for event', {
            eventId,
            drives: game?.page?.content?.gamepackage?.allDrives?.length,
            plays: game?.page?.content?.gamepackage?.plys?.length,
            drive0: game?.page?.content?.gamepackage?.allDrives?.[0],
            drive0lx: game?.page?.content?.gamepackage?.allDrives?.[0]?.lx,
        });
    }
    return null;
}

interface WinProbabilitySegment {
    wnPrb: number; // win probability for the losing team (ie. 100 - winning team's win probability)
    gamePct: number; // percentage of the game that has been played (0-1)
}

function analyzeWinProb(lowerWinProb: WinProbabilitySegment[], simpleLoserWP: WinProbabilitySegment[], changePerPlayRange: [number, number], latePossession: number): AnalysisResult | null {
    const avgLoserWP = simpleLoserWP.reduce((acc, {wnPrb}) => acc + wnPrb, 0) / simpleLoserWP.length;
    const maxLoserWP = max(simpleLoserWP.map(i => i.wnPrb)) || 0;
    const totalChange = zip(simpleLoserWP.slice(0, -1), simpleLoserWP.slice(1)).reduce((acc, [a, b]) => acc + Math.abs((b?.wnPrb || 0) - (a?.wnPrb || 0)), 0);
    const numPlays = simpleLoserWP.length;
    const avgChangePerPlay = totalChange / numPlays;
    // In a 2x20m game, these are at 20:00, 10:00, 4:00, 2:00, and 1:00 left in the game
    const maxLoserWPAfter50Pct = max(simpleLoserWP.filter(i => i.gamePct > 0.5).map(i => i.wnPrb)) || 0;
    const maxLoserWPAfter75Pct = max(simpleLoserWP.filter(i => i.gamePct > 0.75).map(i => i.wnPrb)) || 0;
    const maxLoserWPAfter90Pct = max(simpleLoserWP.filter(i => i.gamePct > 0.9).map(i => i.wnPrb)) || 0;
    const maxLoserWPAfter95Pct = max(simpleLoserWP.filter(i => i.gamePct > 0.95).map(i => i.wnPrb)) || 0;
    const maxLoserWPAfter975Pct = max(simpleLoserWP.filter(i => i.gamePct > 0.975).map(i => i.wnPrb)) || 0;

    // histogram of win probability at 5% intervals normalized by number of plays
    const winProbHistogram = range(45, -1, -5).map(threshold => {
        return lowerWinProb.filter(i => (i.wnPrb > threshold && i.wnPrb <= threshold + 5) || (i.wnPrb === 0 && threshold === 0)).length / numPlays;
    });

    // TODO: find a way to analyze runs - ie. https://www.espn.com/mens-college-basketball/game/_/gameId/401746069 had a 20-2 run to flip the WP from 84.5% to 7.3% in 5:00
    // how do we define a "run"?
    // change in WP is at least 20%, lasts at least 7.5% of game (ie. 3:00)
    //   how do we decide exactly what play starts/ends the run?
    //   look at every N-play sequence where abs(WP change) is at least Y.  Merge together overlapping sequences with WP change in same direction
    const runs = findRuns(simpleLoserWP, 20, 0.075);

    // things that likely indicate a good game:
    //   - maxLoserWP over 80 (this catches blowouts by underdogs, like McNeese vs. Clemson)
    //   - high avgChangePerPlay (likely indicates a lot of late swings - will confim with Arkansas vs. Kansas)
    //   - high maxLoserWPAfter90Pct (is game competitive in the last 4:00 - will confirm with UC San Diego vs. Michigan)
    // Most parts are 0-100; a late possession to take the lead can reach 130.
    const scoreParts = [
        // scale maxLoserWPs 60-90 (clamped) to 0-100
        Math.max(0, Math.min(maxLoserWP, 90) - 60)/30*100,
        // scale avgChangePerPlay between changePerPlayRange (clamped) to 0-100
        Math.max(0, Math.min(avgChangePerPlay, changePerPlayRange[1]) - changePerPlayRange[0])/2*100,
        Math.min(100, maxLoserWPAfter90Pct * 1.5), // last 6:00 of football
        Math.min(100, maxLoserWPAfter975Pct * 2), // last 1:30 of football - weight that more heavily - the losing team can max this out by getting to 66.7% WP at the end of the game
        // pct of time in top two buckets of win probabilities, 2x 45-50 + 1x 40-45
        Math.min(100, (winProbHistogram[0] * 2 + winProbHistogram[1])*100),
        latePossession,
    ];
    // don't want to strictly take the max, because we want to reward games that are good in multiple ways, but don't want to under-reward games good in only one way
    // so we'll take the max + 40% of the second max + 20% of the sum of the other parts
    // The raw score can exceed 100; display normalization is handled by the caller.
    const orderedScores = scoreParts.slice().sort((a, b) => b - a);
    const maxScore = orderedScores[0];
    const secondMaxScore = orderedScores[1];
    const score = maxScore + secondMaxScore * 0.4 + 0.2 * (scoreParts.reduce((acc, i) => acc + i, 0) -maxScore - secondMaxScore);

    return {
        avgLoserWP,
        maxLoserWP,
        totalChange,
        avgChangePerPlay,
        numPlays,
        maxLoserWPAfter50Pct,
        maxLoserWPAfter75Pct,
        maxLoserWPAfter90Pct,
        maxLoserWPAfter95Pct,
        maxLoserWPAfter975Pct,
        scoreParts,
        score,
        winProbHistogram,
        numberOfRuns: runs.length,
    };
}

function findRuns(simpleLoserWP: { wnPrb: number; gamePct: number; }[], minChange: number, minLength: number) {
    const runs : {start: number, end: number, startWnPrb: number, endWnPrb: number, change: number}[] = [];
    for(const i of range(0, simpleLoserWP.length - 1)) {
        const start = simpleLoserWP[i];
        const end = last(takeWhile(simpleLoserWP, i => i.gamePct < start.gamePct + minLength)) || simpleLoserWP[simpleLoserWP.length - 1];
        const change = end.wnPrb - start.wnPrb;
        if (Math.abs(change) >= minChange) {
            runs.push({
                start: start.gamePct,
                startWnPrb: start.wnPrb,
                end: end.gamePct,
                endWnPrb: end.wnPrb,
                change,
            });
        }
    }

    // return runs;

    // merge overlapping runs
    const mergedRuns: {start: number, end: number, startWnPrb: number, endWnPrb: number, change: number}[] = [];
    for (const run of runs) {
        // new run if first, non-overlapping, or different sign of change
        if (mergedRuns.length === 0 || mergedRuns[mergedRuns.length - 1].end < run.start || mergedRuns[mergedRuns.length - 1].change * run.change < 0) {
            mergedRuns.push(run);
        } else {
            const lastRun = mergedRuns[mergedRuns.length - 1];
            lastRun.end = Math.max(lastRun.end, run.end);
            lastRun.endWnPrb = run.endWnPrb; // update to the end WP of the last run
            lastRun.change = lastRun.endWnPrb - lastRun.startWnPrb; // recalculate the change based on the new end WP
        }
    }
    
    // TODO: try to shorten runs to the maximum delta

    return mergedRuns;
}
