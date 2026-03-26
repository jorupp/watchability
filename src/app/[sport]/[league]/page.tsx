import { getScoreboard } from "@/services/espn";
import Link from "next/link";
import { Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar } from "lucide-react";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string }>}) => {
    const { sport, league } = await params;
    const scoreboard = await getScoreboard(sport, league);
    const calendar = scoreboard.leagues[0].calendar;
    const now = new Date();
    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    <Link href="/" className="hover:text-primary transition-colors">Sports</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href={`/${sport}`} className="hover:text-primary transition-colors capitalize">{sport}</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="uppercase text-foreground">{league}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight uppercase">{league} Schedule</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {calendar.map((date, ix) => (
                    (typeof date === 'string') ? (
                        <Link key={date} href={`/${sport}/${league}/date/${date.split('T')[0].replaceAll('-','')}`}>
                            <Card className="hover:border-primary/60 hover:bg-muted/40 transition-all cursor-pointer group">
                                <CardContent className="flex items-center gap-2 p-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="text-sm group-hover:text-primary transition-colors truncate">
                                        {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ) : (
                        <Fragment key={ix}>
                            {date.entries.map(entry => {
                                const isCurrent = new Date(entry.startDate) < now && now < new Date(entry.endDate);
                                return (
                                    <Link key={entry.value} href={`/${sport}/${league}/week/${entry.value}`}>
                                        <Card className={`hover:border-primary/60 hover:bg-muted/40 transition-all cursor-pointer group ${isCurrent ? 'border-primary/40 bg-primary/5' : ''}`}>
                                            <CardContent className="flex items-center justify-between p-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                                                        {date.label}: {entry.label}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(entry.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – {new Date(entry.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                                {isCurrent && <Badge className="ml-2 flex-shrink-0 text-xs">Live</Badge>}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </Fragment>
                    )
                ))}
            </div>
        </div>
    );
}

export default CalendarPage