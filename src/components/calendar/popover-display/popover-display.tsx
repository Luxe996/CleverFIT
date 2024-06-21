import { Moment } from 'moment';
import { setEditTrainingAC, TrainingType } from '@redux/reducers/calendar-reducer';
import { filterTrainings } from '@utils/filter-trainings';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { getBadgeColor } from '@utils/get-badge-color';
import { Badge, Button, Divider } from 'antd';
import Empty from '@public/empty-image.svg?react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import s from './popover-display.module.scss';
import { dayFormat } from '@constants/date';

type PopoverDisplayProps = {
    date: Moment;
    isOpen: boolean;
    trainings: TrainingType[];
    trainingNames: string[];
    handlePopover: (date: Moment) => void;
    setIsAddTraining: (addTraining: boolean) => void;
    setSelectTraining: (selectValue: string) => void;
    setIsCreateTraining: (createTraining: boolean) => void;
};
export const PopoverDisplay = ({
    date,
    isOpen,
    trainings,
    trainingNames,
    handlePopover,
    setIsAddTraining,
    setSelectTraining,
    setIsCreateTraining,
}: PopoverDisplayProps) => {
    const dispatch = useAppDispatch();
    const filteredTrainings = filterTrainings(trainings, date);

    const onEditClick = (name: string) => {
        const selectedTraining = filteredTrainings.find((training) => training.name === name);

        if (selectedTraining) {
            dispatch(setEditTrainingAC(selectedTraining));

            if (selectedTraining?.isImplementation) {
                setIsCreateTraining(true);
            } else {
                setIsAddTraining(true);
            }
            setSelectTraining(selectedTraining?.name || 'Выбор типа тренировки');
        }
    };

    return (
        <div className={s.container}>
            <CloseOutlined
                data-test-id={isOpen && 'modal-create-training-button-close'}
                onClick={() => handlePopover(date)}
                style={{ fontSize: 14, position: 'absolute', top: 0, right: 0 }}
            />
            <div>
                <h4>Тренировки на {date.format(dayFormat)}</h4>
                {trainingNames.length === 0 ? (
                    <h5>Нет активных тренировок</h5>
                ) : (
                    <ul className={s.trainings}>
                        {trainingNames.map((name, index) => {
                            const foundTraining = filteredTrainings.find(
                                (training) => training.name === name,
                            );
                            const isImplementation = foundTraining?.isImplementation || false;

                            return (
                                <li key={name}>
                                    <Button
                                        data-test-id={`modal-update-training-edit-button${index}`}
                                        type='link'
                                        onClick={() => onEditClick(name)}
                                        style={{
                                            color: isImplementation ? '#BFBFBFFF' : '#262626FF',
                                        }}
                                        disabled={isImplementation}
                                    >
                                        <span>
                                            <Badge
                                                color={getBadgeColor(name)}
                                                style={{ marginRight: '6px' }}
                                            />
                                            {name}
                                        </span>

                                        <EditOutlined
                                            style={{
                                                color: isImplementation ? '#BFBFBFFF' : '#2B4ACBFF',
                                            }}
                                        />
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <Divider />
            </div>

            {trainingNames.length === 0 && isOpen ? (
                <div
                    style={{
                        marginTop: '32px',
                        textAlign: 'center',
                    }}
                >
                    <Empty />
                </div>
            ) : null}
        </div>
    );
};
