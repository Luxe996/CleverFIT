import { Badge } from 'antd';
import { getBadgeColor } from '@utils/get-badge-color';
import { Moment } from 'moment';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import { filterTrainings } from '@utils/filter-trainings';
import { CustomPopover } from '@components/calendar/custom-popover';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import s from './day-data.module.scss';
import { dateFormat } from '@constants/date';

type DayDataProps = {
    date: Moment;

    trainings: TrainingType[];
    isPopoverVisible: { [key: string]: boolean };
    setIsPopoverVisible: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    isCurrentMonth: boolean;
};

export const DayData = ({
    date,
    trainings,
    isPopoverVisible,
    setIsPopoverVisible,
    isCurrentMonth,
}: DayDataProps) => {
    const { xs } = useBreakpoint();
    const filteredTrainings = filterTrainings(trainings, date);
    const trainingNames = filteredTrainings.map((training) => training.name);

    const formattedDate = date.format(dateFormat);
    const isOpen = isPopoverVisible[formattedDate];

    const handlePopover = (value: Moment) => {
        const formattedValue = value.format(dateFormat);

        setIsPopoverVisible((prevState) => ({
            ...prevState,
            [formattedValue]: !prevState[formattedValue],
        }));
    };

    const hideTrainingsDay = xs && filteredTrainings.length > 0;
    return (
        <>
            {hideTrainingsDay ? (
                <div id='hideTrainings' />
            ) : (
                <ul className={s.trainings}>
                    {trainingNames.map((name) => (
                        <li className={s.training} key={name}>
                            <Badge color={getBadgeColor(name)} style={{ marginRight: '8px' }} />
                            {name}
                        </li>
                    ))}
                </ul>
            )}

            {!isCurrentMonth && xs ? null : (
                <CustomPopover
                    formattedDate={formattedDate}
                    date={date}
                    handlePopover={handlePopover}
                    isOpen={isOpen}
                    setIsPopoverVisible={setIsPopoverVisible}
                />
            )}
        </>
    );
};
