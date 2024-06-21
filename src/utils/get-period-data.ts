type PeriodDataType = {
    item: string;
    period: number;
};

export const periods: PeriodDataType[] = [
    { item: 'Через 1 день', period: 1 },
    { item: 'Через 2 дня', period: 2 },
    { item: 'Через 3 дня', period: 3 },
    { item: 'Через 4 дня', period: 4 },
    { item: 'Через 5 дней', period: 5 },
    { item: 'Через 6 дней', period: 6 },
    { item: '1 раз в неделю', period: 7 },
];

export const getPeriodItems = () => periods.map((period) => period.item);
export const getItemByPeriod = (period: number | null | undefined): string => {
    const foundItem = periods.find((data) => data.period === period);

    return foundItem ? foundItem.item : '';
};

export const getPeriodByItem = (item: string): number | null => {
    const foundPeriod = periods.find((data) => data.item === item);

    return foundPeriod ? foundPeriod.period : null;
};
