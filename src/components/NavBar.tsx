import Link from "next/link";
import { Activity } from "lucide-react";

export function NavBar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="flex h-14 items-center px-4 gap-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary hover:opacity-90 transition-opacity">
                    <Activity className="h-5 w-5" />
                    <span>Watchability</span>
                </Link>
                <div className="h-4 w-px bg-border/70 hidden sm:block" />
                <p className="text-xs text-muted-foreground hidden sm:block">Sports Data Analysis</p>
            </div>
        </header>
    );
}
