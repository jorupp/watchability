import { getScoreboard } from "@/services/espn";
import Link from "next/link";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string }>}) => {
    const { sport, league } = await params;
    const scoreboard = await getScoreboard(sport, league);
    const calendar = scoreboard.leagues[0].calendar;
    return (
        <div>
            <h1>Calendar</h1>
            <ul>
                {calendar.map((date) => (
                    <li key={date}>
                        <Link href={`/${sport}/${league}/${date.split('T')[0].replaceAll('-','')}`}>{date}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CalendarPage