export const pieConfig = (
    data: Array<{ name: string; count: number }>,
    xs: boolean | undefined,
) => {
    const pieWidth = xs ? 360 : 520;
    const fontSize = xs ? 12 : 14;
    const text = xs ? ({ name }: { name: string }) => name.split(' ').join('\n') : 'name';

    return {
        data,
        angleField: 'count',
        colorField: 'name',
        innerRadius: 0.35,
        radius: 0.5,
        label: {
            text,
            fontSize: fontSize,
            position: 'outside',
            connector: false,

            hyphens: 'auto',
        },
        legend: false,
        scale: { color: { palette: 'set3' } },
        width: pieWidth,
    };
};
