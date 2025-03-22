import 'server-only';
import {RootObject as Scoreboard} from "@/types/scoreboard";

const rootUrl = "https://site.api.espn.com/apis/site";

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
    const url = `${rootUrl}/v2/sports/${sport}/${league}/scoreboard${dates ? `?dates=${dates}` : ''}`;
    console.log(url);
    return fetch(url)
        .then(response => response.json())
        .then(data => data as Scoreboard);
}