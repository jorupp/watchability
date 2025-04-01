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
                    (typeof date === 'string') ? <li key={date}>
                        <Link href={`/${sport}/${league}/${date.split('T')[0].replaceAll('-','')}`} className="text-blue-500 hover:underline">{date}</Link>
                    </li> : <li key={date.value}>
                        TODO: add support for NFL/CFB-style season
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CalendarPage