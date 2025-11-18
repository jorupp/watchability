import { analyzeGame } from "@/services/analysis";
import { getGame } from "@/services/espn";
import { RootObject as Scoreboard } from "@/types/scoreboard";
import { ReactNode } from "react";
import { CalendarTable } from "@/components/calendarTable";

export const CalendarComponent = async ({ sport, league, scoreboard, header, showDate }: { sport: string, league: string, scoreboard: Scoreboard, header: ReactNode, showDate?: boolean}) => {
    const events = scoreboard.events.sort((a, b) => a.date.localeCompare(b.date));
    const augmentedEvents = await Promise.all(events.map(async (event) => {
        const game = await getGame(league, event.id);
        const analysis = analyzeGame(game, event.id);
        return {
            ...event,
            game,
            analysis,
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
