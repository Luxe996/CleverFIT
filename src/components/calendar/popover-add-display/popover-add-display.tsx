import { Moment } from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Divider, Select } from 'antd';
import { CustomDrawer } from '@components/calendar/custom-drawer';
import {
    setEditTrainingAC,
    setNewTrainingAC,
    TrainingType,
} from '@redux/reducers/calendar-reducer';
import { getContentPopover } from '@utils/get-content-popover';
import s from './popover-add-display.module.scss';

type PopoverAddDisplayProps = {
    date: Moment;
    isOpen: boolean;
    selectTraining: string;
    setSelectTraining: (value: string) => void;
    setIsAddTraining: (addTraining: boolean) => void;
    isCreateTraining: boolean;
    setIsCreateTraining: (createTraining: boolean) => void;
    trainingNames: string[];
};
export const PopoverAddDisplay = ({
    date,
    isOpen,
    selectTraining,
    setSelectTraining,
    setIsAddTraining,
    isCreateTraining,
    setIsCreateTraining,
    trainingNames,
}: PopoverAddDisplayProps) => {
    const dispatch = useAppDispatch();
    const { catalogList, editTraining, newTraining } = useAppSelector(calendarSelector);
    const clearTraining = () => {
        dispatch(
            setNewTrainingAC({
                name: '',
                date: '',
                exercises: [],
            }),
        );
    };

    const handleTrainingChange = (value: string) => {
        setSelectTraining(value);
        clearTraining();
    };
    const onArrowClick = () => {
        setIsAddTraining(false);
        clearTraining();
        dispatch(setEditTrainingAC(null));
        setSelectTraining('Выбор типа тренировки');
    };

    const content = getContentPopover(
        newTraining,
        selectTraining,
        setIsCreateTraining,
        editTraining,
        s,
    );
    const list =
        catalogList &&
        catalogList
            .filter((training: TrainingType) => !trainingNames.includes(training.name))
            .map((training: TrainingType) => (
                <Select.Option key={training.name} value={training.name}>
                    {training.name}
                </Select.Option>
            ));

    return (
        <>
            <div className={s.container}>
                <ArrowLeftOutlined
                    data-test-id={isOpen && 'modal-exercise-training-button-close'}
                    style={{ marginRight: 8 }}
                    onClick={onArrowClick}
                />

                <Select
                    data-test-id='modal-create-exercise-select'
                    bordered={false}
                    defaultValue='Выбор типа тренировки'
                    onChange={handleTrainingChange}
                    value={selectTraining}
                >
                    {list}
                </Select>

                <Divider />

                {content}

                <Divider />
            </div>

            {isCreateTraining && (
                <CustomDrawer
                    date={date}
                    selectTraining={selectTraining}
                    isCreateTraining={isCreateTraining}
                    setIsCreateTraining={setIsCreateTraining}
                />
            )}
        </>
    );
};
