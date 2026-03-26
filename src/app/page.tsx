import { getSports } from "@/services/espn";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const sportIcons: Record<string, string> = {
  football: "🏈",
  basketball: "🏀",
  baseball: "⚾",
  hockey: "🏒",
  soccer: "⚽",
  tennis: "🎾",
  golf: "⛳",
  mma: "🥊",
  racing: "🏎️",
  volleyball: "🏐",
};

const RootPage = async () => {
    const sports = await getSports();
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Sports</h1>
                <p className="text-muted-foreground text-sm mt-1">Select a sport to explore leagues and games</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {sports.map((sport) => (
                    <Link key={sport} href={`/${sport}`}>
                        <Card className="hover:border-primary/60 hover:bg-muted/40 transition-all cursor-pointer group h-full">
                            <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
                                <span className="text-3xl" role="img">
                                    {sportIcons[sport.toLowerCase()] ?? <Trophy className="h-8 w-8 text-primary" />}
                                </span>
                                <span className="text-sm font-medium capitalize text-center group-hover:text-primary transition-colors">{sport}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RootPage