import { DataType } from '@utils/get-chart-data';
import { shortDayFormat } from '@constants/date';
import moment from 'moment';

export const getSorteredLoadData = (data: DataType[]) => {
    const sortedData = data.sort(
        (a, b) =>
            moment(a.date, shortDayFormat).valueOf() - moment(b.date, shortDayFormat).valueOf(),
    );

    let currentStartWeek = moment(sortedData[0].date, shortDayFormat).startOf('isoWeek');
    let currentEndWeek = currentStartWeek.clone().endOf('isoWeek');
    let currentDataWeek: DataType[] = [];

    const groupedData = sortedData.reduce<
        { weekStart: moment.Moment; weekEnd: moment.Moment; data: DataType[] }[]
    >((grouped, item) => {
        const itemDate = moment(item.date, shortDayFormat);

        if (itemDate.isBetween(currentStartWeek, currentEndWeek, null, '[]')) {
            currentDataWeek.push(item);
        } else {
            grouped.push({
                weekStart: currentStartWeek,
                weekEnd: currentEndWeek,
                data: currentDataWeek,
            });

            currentStartWeek = itemDate.clone().startOf('isoWeek');
            currentEndWeek = currentStartWeek.clone().endOf('isoWeek');
            currentDataWeek = [item];
        }

        return grouped;
    }, []);

    groupedData.push({
        weekStart: currentStartWeek,
        weekEnd: currentEndWeek,
        data: currentDataWeek,
    });

    return groupedData;
};
