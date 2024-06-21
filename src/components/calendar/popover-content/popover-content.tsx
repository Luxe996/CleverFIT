import { Moment } from 'moment';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import { filterTrainings } from '@utils/filter-trainings';
import { PopoverDisplay } from '@components/calendar/popover-display';
import { PopoverButtons } from '@components/calendar/popover-buttons';
import { PopoverAddDisplay } from '@components/calendar/popover-add-display';
import s from './popover-content.module.scss';

type PopoverContentProps = {
    date: Moment;
    isOpen: boolean;
    handlePopover: (date: Moment) => void;
    selectTraining: string;
    setSelectTraining: (value: string) => void;
    isAddTraining: boolean;
    setIsAddTraining: (value: boolean) => void;
    isCreateTraining: boolean;
    setIsCreateTraining: (value: boolean) => void;
};

export const PopoverContent = ({
    date,
    isOpen,
    handlePopover,
    selectTraining,
    setSelectTraining,
    isAddTraining,
    setIsAddTraining,
    isCreateTraining,
    setIsCreateTraining,
}: PopoverContentProps) => {
    const { trainings } = useAppSelector(calendarSelector);
    const filteredTrainings = filterTrainings(trainings, date);
    const trainingNames = filteredTrainings.map((training) => training.name);

    return (
        <div
            className={s.container}
            data-test-id={
                isOpen && (isAddTraining ? 'modal-create-exercise' : 'modal-create-training')
            }
        >
            {isAddTraining ? (
                <PopoverAddDisplay
                    date={date}
                    isOpen={isOpen}
                    selectTraining={selectTraining}
                    setSelectTraining={setSelectTraining}
                    setIsAddTraining={setIsAddTraining}
                    isCreateTraining={isCreateTraining}
                    setIsCreateTraining={setIsCreateTraining}
                    trainingNames={trainingNames}
                />
            ) : (
                <PopoverDisplay
                    date={date}
                    isOpen={isOpen}
                    trainings={trainings}
                    trainingNames={trainingNames}
                    handlePopover={handlePopover}
                    setIsAddTraining={setIsAddTraining}
                    setSelectTraining={setSelectTraining}
                    setIsCreateTraining={setIsCreateTraining}
                />
            )}
            <PopoverButtons
                date={date}
                trainingNames={trainingNames}
                isAddTraining={isAddTraining}
                selectTraining={selectTraining}
                setIsCreateTraining={setIsCreateTraining}
                setIsAddTraining={setIsAddTraining}
            />
        </div>
    );
};
