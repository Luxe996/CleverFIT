import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import {
    CloseOutlined,
    EditOutlined,
    MinusOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, DatePicker, Drawer, Space } from 'antd';
import { calendarSelector } from '../../../selectors';
import { useEffect, useState } from 'react';
import { dateFormat, dayFormat } from '@constants/date';
import moment, { Moment } from 'moment';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDrawer } from '@hooks/use-drawer';
import { Exercise } from '@components/calendar/custom-drawer/exercise';
import { PeriodsSelect } from '@components/periods-select/periods-select';
import { filterTrainings } from '@utils/filter-trainings';
import { TrainingSelect } from '@components/training-selector';
import {
    createTrainingTC,
    editTrainingTC,
    setEditTrainingAC,
} from '@redux/reducers/calendar-reducer';
import { getItemByPeriod } from '@utils/get-period-data';
import { dataTestId } from '@constants/data-test-id';
import { createJointTrainingTC, PartnerType } from '@redux/reducers/trainigs-reducer.ts';
import { getBadgeColor } from '@utils/get-badge-color.ts';

import s from './trainings-drawer.module.scss';

type TrainingsDrawerType = {
    isCreateTraining: boolean;
    setIsCreateTraining: (value: boolean) => void;
    selectPartner?: PartnerType | null;
};

export const TrainingsDrawer = ({
    isCreateTraining,
    setIsCreateTraining,
    selectPartner,
}: TrainingsDrawerType) => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const { trainings, editTraining } = useAppSelector(calendarSelector);

    const [isSaveActive, setIsSaveActive] = useState(false);
    const [isSendActive, setIsSendActive] = useState(false);
    const [date, setDate] = useState<Moment | null>(null);
    const [selectTraining, setSelectTraining] = useState('Выбор типа тренировки');
    const [period, setPeriod] = useState<number | null>(null);

    const {
        exerciseBlocks,
        handleInputChange,
        handleAddExerciseBlock,
        showDeleteButton,
        handleDeleteExerciseBlock,
        handleDrawerClose,
    } = useDrawer(selectTraining, setIsCreateTraining, false);

    const isDeleteDisabled = !exerciseBlocks.some((exercise) => exercise.isImplementation);

    const filteredTrainings = date ? filterTrainings(trainings, date) : [];
    const trainingNames = filteredTrainings.map((training) => training.name);

    const [isChecked, setIsChecked] = useState(false);
    const onCheckedChange = (e: CheckboxChangeEvent) => {
        setIsChecked(e.target.checked);
        if (!e.target.checked) {
            setPeriod(null);
        }
    };

    const onDateChange = (date: Moment | null) => {
        setDate(date);
    };

    const disabledDate = (current: Moment | null) => {
        return !!(current && current.isSameOrBefore(moment(), 'day'));
    };
    const dateRender = (date: Moment) => {
        const formattedDate = date.format(dateFormat);
        const trainingExists = trainings.some((training) => {
            const trainingDate = moment(training.date).format(dateFormat);
            return trainingDate === formattedDate;
        });
        if (trainingExists) {
            return <div style={{ backgroundColor: '#F0F5FF' }}>{date.date()}</div>;
        }
        return date.date();
    };

    const onCloseDrawer = () => {
        handleDrawerClose();
        setSelectTraining('Выбор типа тренировки');
        setDate(null);
        setIsChecked(false);
        if (editTraining) {
            dispatch(setEditTrainingAC(null));
        }
        setIsCreateTraining(false);
    };
    const onSaveClick = () => {
        const filteredExercise = exerciseBlocks.filter((exercise) => exercise.name !== '');
        const isPastDate = date.isSameOrBefore(moment(), 'day');
        const newTraining = {
            name: selectTraining,
            date: date ? date.format(`${dateFormat}THH:mm:ss`) : '',
            exercises: filteredExercise,
            isImplementation: isPastDate,
            parameters: {
                repeat: isChecked,
                period: period,
            },
        };
        if (editTraining) {
            dispatch(editTrainingTC({ ...newTraining, _id: editTraining._id }, true));
        } else {
            dispatch(createTrainingTC(newTraining, true));
        }

        onCloseDrawer();
    };

    const onSendClick = () => {
        const filteredExercise = exerciseBlocks.filter((exercise) => exercise.name !== '');
        const newTraining = {
            name: selectPartner?.trainingType,
            date: date ? date.format(`${dateFormat}THH:mm:ss`) : '',
            exercises: filteredExercise,
            parameters: {
                repeat: isChecked,
                period: period,
            },
        };
        dispatch(createJointTrainingTC(newTraining, selectPartner?.id));
        onCloseDrawer();
    };

    const setTitle = () => {
        if (!editTraining) {
            return (
                <span>
                    <PlusOutlined style={{ marginRight: '8px' }} />
                    {selectPartner ? 'Совместная тренировка' : 'Добавление упражнений'}
                </span>
            );
        } else {
            return (
                <span>
                    <EditOutlined style={{ marginRight: '8px' }} />
                    Редактирование
                </span>
            );
        }
    };

    useEffect(() => {
        const isName = selectTraining !== 'Выбор типа тренировки';
        const isDate = !!date;
        const isExercise = exerciseBlocks.length > 0 && exerciseBlocks[0].name !== '';
        setIsSaveActive(isName && isDate && isExercise);
        setIsSendActive(isDate && isExercise);
    }, [date, exerciseBlocks, selectTraining]);

    useEffect(() => {
        if (editTraining) {
            setSelectTraining(editTraining.name);
            setDate(moment(editTraining.date));
            setIsChecked(editTraining.parameters.repeat);
            setPeriod(editTraining.parameters.period);
        }
    }, [editTraining]);

    return (
        <Drawer
            data-test-id={dataTestId.modalDrawerRight}
            width={408}
            className={s.drawer}
            title={setTitle()}
            closeIcon={<CloseOutlined data-test-id={dataTestId.modalDrawerRightButtonClose} />}
            open={isCreateTraining}
            onClose={onCloseDrawer}
            placement={xs ? 'bottom' : 'right'}
            height={xs ? '80%' : '100%'}
            destroyOnClose={true}
            footer={
                selectPartner ? (
                    <Button type='primary' onClick={onSendClick} disabled={!isSendActive}>
                        Отправить приглашение
                    </Button>
                ) : (
                    <Button type='primary' onClick={onSaveClick} disabled={!isSaveActive}>
                        Сохранить
                    </Button>
                )
            }
        >
            <div className={s.content}>
                {selectPartner ? (
                    <div className={s.userInfo}>
                        <div className={s.userName}>
                            <Avatar
                                src={selectPartner.imageSrc}
                                alt={selectPartner.name}
                                icon={<UserOutlined />}
                            />
                            <div style={{ width: '50px', marginLeft: '8px' }}>
                                {selectPartner.name}
                            </div>
                        </div>
                        <span>
                            <Badge
                                color={getBadgeColor(selectPartner.trainingType)}
                                style={{ marginRight: '8px' }}
                            />
                            {selectPartner.trainingType}
                        </span>
                    </div>
                ) : (
                    <TrainingSelect
                        selectValue={selectTraining}
                        trainingNames={trainingNames}
                        onChangeSelect={setSelectTraining}
                    />
                )}

                <Space direction='vertical' size={8}>
                    <Space
                        direction='horizontal'
                        size={xs ? 24 : 48}
                        style={{ marginBottom: isChecked ? 0 : '24px' }}
                    >
                        <DatePicker
                            value={date}
                            format={dayFormat}
                            onChange={onDateChange}
                            disabled={editTraining}
                            disabledDate={disabledDate}
                            dateRender={dateRender}
                            style={{ width: xs ? '125px' : '156px' }}
                            data-test-id={dataTestId.modalDrawerRightDatePicker}
                        />

                        <Checkbox
                            checked={isChecked}
                            onChange={onCheckedChange}
                            data-test-id={dataTestId.modalDrawerRightCheckboxPeriod}
                        >
                            С периодичностью
                        </Checkbox>
                    </Space>
                    {isChecked && (
                        <PeriodsSelect
                            period={period ? getItemByPeriod(period) : 'Периодичность'}
                            setPeriod={setPeriod}
                        />
                    )}
                </Space>
                {exerciseBlocks.map((exercise, index) => (
                    <Exercise
                        key={index}
                        exercise={exercise}
                        index={index}
                        selectTraining={selectTraining}
                        handleInputChange={handleInputChange}
                    />
                ))}
                <div className={s.buttons}>
                    <Button type='link' onClick={handleAddExerciseBlock}>
                        <PlusOutlined style={{ color: '#2B4ACBFF' }} /> <span>Добавить ещё</span>
                    </Button>
                    {showDeleteButton && (
                        <Button
                            type='text'
                            onClick={handleDeleteExerciseBlock}
                            disabled={isDeleteDisabled}
                        >
                            <MinusOutlined
                                style={{
                                    color: isDeleteDisabled ? '#BFBFBFFF' : '#262626FF',
                                }}
                            />
                            <span>Удалить</span>
                        </Button>
                    )}
                </div>
            </div>
        </Drawer>
    );
};
