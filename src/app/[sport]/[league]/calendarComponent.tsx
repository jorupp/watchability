import { analyzeGame } from "@/services/analysis";
import { getGame } from "@/services/espn";
import { RootObject as Scoreboard } from "@/types/scoreboard";
import { ReactNode } from "react";
import { CalendarTable } from "@/components/calendarTable";
import { getMythTvProgramUrl } from "@/lib/mythtv";

export const CalendarComponent = async ({ sport, league, scoreboard, header, showDate }: { sport: string, league: string, scoreboard: Scoreboard, header: ReactNode, showDate?: boolean}) => {
    const events = scoreboard.events.sort((a, b) => a.date.localeCompare(b.date));
    const augmentedEvents = await Promise.all(events.map(async (event) => {
        const game = await getGame(league, event.id);
        const analysis = analyzeGame(game, event.id);
        
        // Extract only the minimal data needed for rendering to reduce client-side data transfer
        return {
            ...event,
            mythTvUrl: getMythTvProgramUrl(
                process.env.MYTHTV_BASE_URL,
                event.competitions[0]?.broadcast,
                event.date,
            ),
            // Only send the specific game data needed for display
            gamePredictor: game?.page?.content?.gamepackage?.mtchpPrdctr?.teams?.map((i: { percentage: number }) => ({ percentage: i.percentage })),
            // Only send the analysis fields used in the UI
            analysisScore: analysis?.score,
            analysisHistogram: analysis?.winProbHistogram,
            analysisRaw: analysis, // Keep for tooltip display
        };
    }));
    return (
        <div>
            {header}
            <CalendarTable 
                sport={sport} 
                league={league} 
                augmentedEvents={augmentedEvents} 
                showDate={showDate}
            />
        </div>
    );
}
