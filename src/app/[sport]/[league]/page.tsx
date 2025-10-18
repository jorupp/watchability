import { getScoreboard } from "@/services/espn";
import Link from "next/link";
import { Fragment } from "react";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string }>}) => {
    const { sport, league } = await params;
    const scoreboard = await getScoreboard(sport, league);
    const calendar = scoreboard.leagues[0].calendar;
    return (
        <div>
            <h1>Calendar</h1>
            <ul>
                {calendar.map((date,ix) => (
                    (typeof date === 'string') ? <li key={date}>
                        <Link href={`/${sport}/${league}/date/${date.split('T')[0].replaceAll('-','')}`} className="text-blue-500 hover:underline">{date}</Link>
                    </li> : <Fragment key={ix}>
                        {date.entries.map(entry => (
                            <li key={entry.value}>
                                <Link href={`/${sport}/${league}/week/${entry.value}`} className="text-blue-500 hover:underline">{date.label}: {entry.label} ({new Date(entry.startDate).toLocaleDateString()} - {new Date(entry.endDate).toLocaleDateString()})</Link>
                            </li>
                        ))}
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default CalendarPage