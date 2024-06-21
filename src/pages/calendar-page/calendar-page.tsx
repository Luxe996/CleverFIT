import { Calendar, Layout } from 'antd';
import 'moment/locale/ru';
import { locale } from '@constants/locale';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { catalogTC, getTrainingTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import moment, { Moment } from 'moment';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { DayData } from '@components/calendar/day-data';
import { ErrorModal } from '@components/modals/error-modal';
import s from './calendar.module.scss';
import { dataTestId } from '@constants/data-test-id';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { xs } = useBreakpoint();

    const { trainings, isTrainingsError, isCatalogError } = useAppSelector(calendarSelector);

    const [isPopoverVisible, setIsPopoverVisible] = useState<{ [key: string]: boolean }>({});
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());

    const onDateSelection = (date: Moment) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        dispatch(getTrainingTC());
    }, [dispatch]);
    useEffect(() => {
        isTrainingsError && navigate(Path.MAIN);
    }, [isTrainingsError, navigate]);
    useEffect(() => {
        if (trainings) {
            dispatch(ResetStateAC());
            dispatch(catalogTC());
        }
    }, [dispatch, trainings]);

    return (
        <Layout>
            {trainings && (
                <Calendar
                    className={s.calendar}
                    fullscreen={!xs}
                    locale={locale}
                    onSelect={(date) => onDateSelection(date)}
                    dateCellRender={(date) => (
                        <DayData
                            date={date}
                            trainings={trainings}
                            isPopoverVisible={isPopoverVisible}
                            setIsPopoverVisible={setIsPopoverVisible}
                            isCurrentMonth={date.isSame(selectedDate, 'months')}
                        />
                    )}
                />
            )}
            <ErrorModal
                title={`При ${isCatalogError ? 'открытии' : 'сохранении'} данных произошла ошибка`}
                description={`${isCatalogError ? 'Попробуйте' : 'Придётся попробовать'} ещё раз`}
                dataTestContent={dataTestId.modalErrorUserTrainingTitle}
                dataTestDescription={dataTestId.modalErrorUserTrainingSubtitle}
                dataTestButton={dataTestId.modalErrorUserTrainingButton}
            />
        </Layout>
    );
};
