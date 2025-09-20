import { getScoreboard } from "@/services/espn";
import Link from "next/link";
import { CalendarComponent } from "../../calendarComponent";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string, date: string }>}) => {
    const { sport, league, date } = await params;
    const scoreboard = await getScoreboard(sport, league, date);
    return <CalendarComponent {...{sport, league, scoreboard }} header={
        <>
            <h1>Calendar for {date}</h1>
            <p className="flex gap-2">
                <Link href={`/${sport}/${league}/date/${parseInt(date)-1}`} className="text-blue-500 hover:underline">Previous</Link>
                <Link href={`/${sport}/${league}/date/${parseInt(date)+1}`} className="text-blue-500 hover:underline">Next</Link>
            </p>
        </>
    }/>;
}

export default CalendarPage