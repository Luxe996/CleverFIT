import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../selectors';
import { useEffect, useState } from 'react';
import {
    ExerciseInputType,
    ExerciseType,
    setEditTrainingAC,
    setNewTrainingAC,
} from '@redux/reducers/calendar-reducer';
import { Moment } from 'moment';
import { dateFormat } from '@constants/date';
import moment from 'moment/moment';

const initialExercises = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 1,
    isImplementation: false,
};

export const useDrawer = (
    selectValue: string,
    setCreateTraining: (createTraining: boolean) => void,
    isSaveOnClose: boolean,
    date?: Moment,
) => {
    const dispatch = useAppDispatch();
    const { editTraining, newTraining } = useAppSelector(calendarSelector);
    const showDeleteButton = editTraining && editTraining.name === selectValue;

    let exercises: ExerciseType[];

    if (editTraining && editTraining.name === selectValue) {
        exercises = editTraining.exercises;
    } else if (newTraining && newTraining.name === selectValue) {
        exercises = newTraining.exercises;
    } else {
        exercises = [initialExercises];
    }

    const [exerciseBlocks, setExerciseBlocks] = useState<ExerciseType[]>(exercises);

    useEffect(() => {
        if (editTraining) {
            setExerciseBlocks(exercises);
        }
    }, [editTraining, exercises]);

    const handleAddExerciseBlock = () => {
        setExerciseBlocks([...exerciseBlocks, initialExercises]);
    };

    const handleInputChange = (
        index: number,
        name: keyof ExerciseInputType,
        value: string | number | boolean,
    ) => {
        const updatedExercises = [...exerciseBlocks];

        updatedExercises[index] = {
            ...updatedExercises[index],
            [name]: value,
        };

        setExerciseBlocks(updatedExercises);
    };
    const handleDeleteExerciseBlock = () => {
        if (exerciseBlocks.length === 1) {
            setExerciseBlocks([initialExercises]);
        } else {
            const updatedExercises = exerciseBlocks.filter(
                (exercise) => !exercise.isImplementation,
            );

            setExerciseBlocks(updatedExercises);
        }
    };

    const handleDrawerClose = () => {
        const updatedExercises = exerciseBlocks
            .filter((exercise) => exercise.name !== '')
            .map((exercise) => ({
                name: exercise.name,
                replays: exercise.replays,
                weight: exercise.weight,
                approaches: exercise.approaches,
                isImplementation: exercise.isImplementation,
            }));

        if (isSaveOnClose && date) {
            if (editTraining && editTraining.name && editTraining.name === selectValue) {
                const isPastDate = date.isSameOrBefore(moment(), 'day');
                const newTraining = {
                    ...editTraining,
                    name: selectValue,
                    exercises: updatedExercises,
                    isImplementation: isPastDate,
                };

                dispatch(setEditTrainingAC(newTraining));
            } else if (updatedExercises.length > 0) {
                const formattedDate = date.format(`${dateFormat}THH:mm:ss`);
                const newTraining = {
                    name: selectValue,
                    date: formattedDate,
                    exercises: updatedExercises,
                };

                dispatch(setNewTrainingAC(newTraining));
            }
        } else {
            setExerciseBlocks([initialExercises]);
        }
        setCreateTraining(false);
    };

    return {
        exerciseBlocks,
        handleInputChange,
        handleAddExerciseBlock,
        showDeleteButton,
        handleDeleteExerciseBlock,
        handleDrawerClose,
    };
};
