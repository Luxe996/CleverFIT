import { TrainingType } from '@redux/reducers/calendar-reducer.ts';

export enum TRAININGS {
    'Ноги' = 'тренировок на ноги',
    'Руки' = 'тренировок на руки',
    'Силовая' = 'силовых тренировок',
    'Спина' = 'тренировок на спину',
    'Грудь' = 'тренировок на грудь',
}

enum TrainingsMapping {
    'Ноги' = 'legs',
    'Руки' = 'hands',
    'Силовая' = 'strength',
    'Спина' = 'back',
    'Грудь' = 'chest',
}

export const popularTraining = (trainings: TrainingType[]) => {
    const result: Record<string, number> = {};

    trainings.forEach((training) => {
        if (training.exercises && training.exercises.length > 0) {
            const key = training.name;
            const totalValue = training.exercises.reduce((total, exercise) => {
                return total + exercise.replays * exercise.weight * exercise.approaches;
            }, 0);

            result[key] = (result[key] || 0) + totalValue;
        }
    });

    const maxKey = Object.entries(result).sort((a, b) => b[1] - a[1])[0][0];

    return TrainingsMapping[maxKey as keyof typeof TrainingsMapping];
};
