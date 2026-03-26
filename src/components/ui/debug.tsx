'use client';

export const Debug = ({ data }: { data: unknown }) => {
    console.log(data);
    return <pre onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>{JSON.stringify(data, null, 2)}</pre>;
}