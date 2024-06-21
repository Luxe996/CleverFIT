import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { PopoverContent } from '@components/calendar/popover-content';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setEditTrainingAC } from '@redux/reducers/calendar-reducer';
import { calendarSelector } from '../../../selectors';
import { Popover } from 'antd';
import s from './custom-popover.module.scss';

type CustomPopoverProps = {
    formattedDate: string;
    date: Moment;
    handlePopover: (date: Moment) => void;
    isOpen: boolean;
    setIsPopoverVisible: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export const CustomPopover = ({
    formattedDate,
    date,
    handlePopover,
    isOpen,
    setIsPopoverVisible,
}: CustomPopoverProps) => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const { createError } = useAppSelector(calendarSelector);
    const [isAddTraining, setIsAddTraining] = useState(false);
    const [isCreateTraining, setIsCreateTraining] = useState(false);
    const [selectTraining, setSelectTraining] = useState('Выбор типа тренировки');

    useEffect(() => {
        createError &&
            setIsPopoverVisible((prevState) => ({ ...prevState, [formattedDate]: false }));
    }, [createError, formattedDate, setIsPopoverVisible]);

    const onChangePopover = () => {
        if (isCreateTraining) {
            return false;
        }

        handlePopover(date);
        setIsAddTraining(false);
        setSelectTraining('Выбор типа тренировки');
        dispatch(setEditTrainingAC(null));
    };

    const align = xs
        ? { points: ['tl', 'bc'], offset: [0, 0] }
        : { points: ['tl', 'tl'], offset: [0, 0] };

    return (
        <Popover
            placement='topLeft'
            trigger='click'
            align={align}
            open={isOpen}
            onOpenChange={onChangePopover}
            overlayClassName={s.overlay}
            overlayStyle={{
                zIndex: 6,
                minHeight: '264px',
                maxHeight: '296px',
            }}
            overlayInnerStyle={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
            key={formattedDate}
            content={
                <PopoverContent
                    date={date}
                    isOpen={isOpen}
                    handlePopover={handlePopover}
                    selectTraining={selectTraining}
                    setSelectTraining={setSelectTraining}
                    isAddTraining={isAddTraining}
                    setIsAddTraining={setIsAddTraining}
                    isCreateTraining={isCreateTraining}
                    setIsCreateTraining={setIsCreateTraining}
                />
            }
        >
            <div className={s.trigger} />
        </Popover>
    );
};
