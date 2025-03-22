import 'server-only';
import {RootObject as Scoreboard} from "@/types/scoreboard";
import {RootObject as Game} from "@/types/game";

const apiRootUrl = "https://site.api.espn.com/apis/site";
const siteRootUrl = "https://www.espn.com";

export async function getSports(): Promise<string[]> {
    return ['basketball'];
}

export async function getLeagues(sport: string): Promise<string[]> {
    switch(sport) {
        case 'basketball':
            return ['mens-college-basketball'];
        default:
            return [];
    }
}

export function getScoreboard(sport: string, league: string, dates?: string): Promise<Scoreboard> {
    const url = `${apiRootUrl}/v2/sports/${sport}/${league}/scoreboard${dates ? `?dates=${dates}` : ''}`;
    console.log(url);
    return fetch(url)
        .then(response => response.json())
        .then(data => data as Scoreboard);
}

export async function getGame(league: string, gameId: string): Promise<Game> {
    const url = `${siteRootUrl}/${league}/game/_/gameId/${gameId}`;

    const response = await fetch(url);
    const html = await response.text();
    // scape the content out of the script tag in the page
    const match = html.match(/<script>window\['__CONFIG__'\]=.*;window\['__espnfitt__'\]=(.*?);<\/script>/);
    if (!match) {
        throw new Error('Could not find __CONFIG__');
    }

    const data = JSON.parse(match[1]);
    return data as Game
}