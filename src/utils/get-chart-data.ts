import moment from 'moment/moment';
import { shortDayFormat } from '@constants/date';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import { Moment } from 'moment';
import { filterFrequentExercise } from '@utils/filter-frequent-exercise';
type GetChartDataType = {
    trainings: TrainingType[];
    activeTab: string;
    keys: Record<string, string>;
    selectTraining: string;
};
export type DataType = {
    date: string;
    load: number;
    totalLoad: number;
    approaches: number;
    replays: number;
    mostFrequentExercise: string | null;
};
export const getChartData = ({ trainings, activeTab, keys, selectTraining }: GetChartDataType) => {
    const filteredTrainings =
        selectTraining === 'Все'
            ? trainings
            : trainings && trainings.filter((training) => training.name === selectTraining);
    let selectedPeriodTrainings;
    let firstDate = moment().subtract(6, 'days').startOf('day');
    let endDate = moment().endOf('day');

    const filterTrainingsByDate = (
        trainings: TrainingType[],
        firstDate: Moment,
        endDate: Moment,
    ) => {
        return (
            trainings &&
            trainings.filter((training) =>
                moment(training.date).isBetween(firstDate, endDate, undefined, '[]'),
            )
        );
    };

    if (activeTab === keys.week) {
        selectedPeriodTrainings = filterTrainingsByDate(filteredTrainings, firstDate, endDate);
    } else {
        firstDate = moment().startOf('isoWeek').isoWeekday(1).subtract(3, 'weeks');
        endDate = moment().endOf('isoWeek').isoWeekday(7);
        selectedPeriodTrainings = filterTrainingsByDate(filteredTrainings, firstDate, endDate);
    }
    const data: DataType[] = [];

    while (firstDate.isSameOrBefore(endDate, 'day')) {
        const dateString = firstDate.format(shortDayFormat);
        const trainingDates =
            selectedPeriodTrainings &&
            selectedPeriodTrainings.filter(
                (training) => moment(training.date).format(shortDayFormat) === dateString,
            );

        let totalLoad = 0;
        let totalApproaches = 0;
        let totalReplays = 0;
        let averageLoad = 0;
        let totalExercises = 0;
        const exerciseCounts: { [key: string]: number } = {};

        trainingDates &&
            trainingDates.forEach((training) => {
                training.exercises.forEach((exercise) => {
                    totalLoad += exercise.approaches * exercise.weight * exercise.replays;
                    totalApproaches += exercise.approaches;
                    totalReplays += exercise.replays;
                    totalExercises += 1;

                    if (exercise.name in exerciseCounts) {
                        exerciseCounts[exercise.name] += 1;
                    } else {
                        exerciseCounts[exercise.name] = 1;
                    }
                });

                averageLoad = Math.round(totalLoad / totalExercises);
            });

        const exerciseCountsArray = Object.entries(exerciseCounts);

        const [mostFrequentExercise] = exerciseCountsArray.reduce(
            (acc, [currentExercise, currentCount]) =>
                currentCount > acc[1] ? [currentExercise, currentCount] : acc,
            [null as string | null, 0],
        );

        data.push({
            date: dateString,
            load: averageLoad,
            totalLoad,
            approaches: totalApproaches,
            replays: totalReplays,
            mostFrequentExercise,
        });

        firstDate.add(1, 'day');
    }

    const countMap = selectedPeriodTrainings?.reduce(
        (count: { [key: string]: number }, training: TrainingType) => {
            count[training.name] = (count[training.name] || 0) + 1;
            return count;
        },
        {} as { [key: string]: number },
    );

    const mostFrequentTraining = Object.entries(countMap || {}).reduce(
        (currentTraining, [trainingName, count]) => {
            if (count > currentTraining.count) {
                return { name: trainingName, count };
            }
            return currentTraining;
        },
        { name: '', count: 0 },
    );

    const exerciseCounts: { [key: string]: number } = {};

    selectedPeriodTrainings &&
        selectedPeriodTrainings
            .flatMap((training) => training.exercises)
            .forEach(({ name }) => {
                exerciseCounts[name] = (exerciseCounts[name] || 0) + 1;
            });
    const mostFrequentExercise = Object.entries(exerciseCounts).reduce(
        (currentExercise, [exerciseName, count]) =>
            count > currentExercise.count ? { name: exerciseName, count } : currentExercise,
        { name: '', count: 0 },
    );
    const dataSortForExercise = filterFrequentExercise(data);
    const filteredArray = Object.entries(exerciseCounts)
        .filter(([exerciseName]) =>
            dataSortForExercise.some((item) => item.mostFrequentExercise === exerciseName),
        )
        .map(([name, count]) => ({ name, count }));

    return {
        data,
        mostFrequentExercise,
        mostFrequentTraining,
        filteredArray,
        selectedPeriodTrainings,
    };
};
