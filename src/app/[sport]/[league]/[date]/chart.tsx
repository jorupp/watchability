'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const dimensions = { width: 150, height: 40};
export const Chart = ({ winProbHistogram }: { winProbHistogram: number[] }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) { return <div style={dimensions}/>} // render only a placeholder on the server to hold space but avoid SSR-mismatch issues

    return (
        <BarChart {...dimensions} data={winProbHistogram.map((i, ix) => ({ ix, wnPrb: i}))}>
            <Bar dataKey="wnPrb" fill="#8884d8" />
        </BarChart>
    );
}
