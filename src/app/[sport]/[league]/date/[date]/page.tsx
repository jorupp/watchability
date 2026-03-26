import { getScoreboard } from "@/services/espn";
import Link from "next/link";
import { CalendarComponent } from "../../calendarComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string, date: string }>}) => {
    const { sport, league, date } = await params;
    const scoreboard = await getScoreboard(sport, league, date);
    const formattedDate = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
    return <CalendarComponent {...{sport, league, scoreboard }} header={
        <div className="mb-4">
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                <Link href="/" className="hover:text-primary transition-colors">Sports</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href={`/${sport}`} className="hover:text-primary transition-colors capitalize">{sport}</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href={`/${sport}/${league}`} className="hover:text-primary transition-colors uppercase">{league}</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{new Date(formattedDate + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h1>
                <div className="flex items-center gap-1">
                    <Link href={`/${sport}/${league}/date/${parseInt(date)-1}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                    </Link>
                    <Link href={`/${sport}/${league}/date/${parseInt(date)+1}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    }/>;
}

export default CalendarPage