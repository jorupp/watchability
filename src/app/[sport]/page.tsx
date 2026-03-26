import { getLeagues } from "@/services/espn";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const SportPage = async ({ params }: {params: Promise<{ sport: string }>}) => {
    const { sport } = await params;
    const leagues = await getLeagues(sport);
    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    <Link href="/" className="hover:text-primary transition-colors">Sports</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="capitalize text-foreground">{sport}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight capitalize">{sport} Leagues</h1>
                <p className="text-muted-foreground text-sm mt-1">Select a league to view the schedule</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {leagues.map((league) => (
                    <Link key={league} href={`/${sport}/${league}`}>
                        <Card className="hover:border-primary/60 hover:bg-muted/40 transition-all cursor-pointer group h-full">
                            <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
                                <span className="text-sm font-medium uppercase text-center group-hover:text-primary transition-colors tracking-wide">{league}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SportPage