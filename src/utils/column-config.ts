import { DataType } from '@utils/get-chart-data';

export const columnConfig = (
    data: DataType[],
    xs: boolean | undefined,
    activeTab: string,
    keys: Record<string, string>,
) => {
    const scroll = activeTab === keys.month ? { x: { ratio: 0.5 } } : false;
    const spacing = xs ? 8 : 16;
    const sizeField = xs ? 20 : 30;
    return {
        key: activeTab,
        data,
        xField: 'date',
        yField: 'load',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: spacing,
                titlePosition: 'bottom',
                titleFontSize: 14,
                tick: false,
                labelSpacing: spacing,
                labelAutoRotate: false,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: spacing,
                titleFontSize: 14,
            },
        },
        scale: {
            x: { padding: 0.5 },
        },
        style: {
            fill: '#85A5FFFF',
        },
        sizeField,
        scrollbar: scroll,
    };
};
