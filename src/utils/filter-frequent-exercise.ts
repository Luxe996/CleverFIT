import { DataType } from '@utils/get-chart-data';
import moment from 'moment';
import { dayDate, shortDayFormat } from '@constants/date';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const filterFrequentExercise = (data: DataType[]) => {
    const filteredData = [];

    for (const day of days) {
        const dayData = data.filter((item) => {
            const itemDay = moment(item.date, shortDayFormat).format(dayDate);
            return itemDay === day && item.mostFrequentExercise !== null;
        });

        let maxCount = 0;
        let mostFrequentExercise: string | null = null;

        dayData.forEach((item) => {
            const exercise = item.mostFrequentExercise;
            const count = dayData.filter((item) => item.mostFrequentExercise === exercise).length;

            if (count > maxCount) {
                maxCount = count;
                mostFrequentExercise = exercise;
            }
        });

        if (dayData.length > 0 && maxCount > 0) {
            filteredData.push({
                ...dayData[0],
                mostFrequentExercise,
            });
        } else {
            const anyItem = data.find(
                (item) => moment(item.date, shortDayFormat).format(dayDate) === day,
            );
            if (anyItem) {
                filteredData.push({
                    date: anyItem.date,
                    load: 0,
                    approaches: 0,
                    replays: 0,
                    mostFrequentExercise: null,
                });
            }
        }
    }

    return filteredData;
};
