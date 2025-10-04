'use client';

export const Debug = ({ data }: { data: any }) => {
    console.log(data);
    return <pre onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>{JSON.stringify(data, null, 2)}</pre>;
}