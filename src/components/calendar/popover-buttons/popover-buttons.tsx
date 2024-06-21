import moment, { Moment } from 'moment';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import s from './popover-buttons.module.scss';
import { createTrainingTC, editTrainingTC } from '@redux/reducers/calendar-reducer';

type PopoverButtonsProps = {
    date: Moment;
    trainingNames: string[];
    isAddTraining: boolean;
    selectTraining: string;
    setIsCreateTraining: (createTraining: boolean) => void;
    setIsAddTraining: (addTraining: boolean) => void;
};
export const PopoverButtons = ({
    date,
    trainingNames,
    isAddTraining,
    selectTraining,
    setIsCreateTraining,
    setIsAddTraining,
}: PopoverButtonsProps) => {
    const dispatch = useAppDispatch();
    const { catalogList, editTraining, newTraining } = useAppSelector(calendarSelector);
    const isPastDate = date.isSameOrBefore(moment(), 'day');
    const disableAddButton = selectTraining === 'Выбор типа тренировки';
    const disableCreateButton = trainingNames.length === catalogList.length || isPastDate;

    const isDisableSaveButton =
        !(editTraining && editTraining.name === selectTraining) &&
        (!newTraining || newTraining.exercises.length === 0);

    const onSaveClick = () => {
        if (editTraining && editTraining.name && editTraining.name === selectTraining) {
            dispatch(editTrainingTC(editTraining, false));
            setIsAddTraining(false);
        } else {
            dispatch(createTrainingTC(newTraining, false));
            setIsAddTraining(false);
        }
    };
    const onCreateClick = () => {
        setIsAddTraining(true);
    };

    return isAddTraining ? (
        <div className={s.container}>
            <Button
                type='default'
                disabled={disableAddButton}
                onClick={() => {
                    setIsCreateTraining(true);
                }}
            >
                Добавить упражнения
            </Button>
            <Button type='link' disabled={isDisableSaveButton} onClick={onSaveClick}>
                {editTraining && editTraining.name && editTraining.name === selectTraining
                    ? 'Сохранить изменения'
                    : 'Сохранить'}
            </Button>
        </div>
    ) : (
        <Button type='primary' onClick={onCreateClick} disabled={disableCreateButton}>
            Создать тренировку
        </Button>
    );
};
