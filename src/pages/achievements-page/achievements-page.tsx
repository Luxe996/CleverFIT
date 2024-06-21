import { Layout, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { catalogTC, getTrainingTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { Path } from '../../routes/path';
import { useNavigate } from 'react-router-dom';
import { Achievements } from '@components/achievements';
import s from './achievements-page.module.scss';

enum Keys {
    week = 'week',
    month = 'month',
    all = 'all',
}

export const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectTraining, setSelectTraining] = useState('Все');

    const { trainings, isTrainingsError } = useAppSelector(calendarSelector);

    const items = [
        {
            label: 'За неделю',
            key: Keys.week,
            children: (
                <Achievements
                    activeTab={Keys.week}
                    keys={Keys}
                    selectTraining={selectTraining}
                    setSelectTraining={setSelectTraining}
                />
            ),
        },
        {
            label: 'За месяц',
            key: Keys.month,
            children: (
                <Achievements
                    activeTab={Keys.month}
                    keys={Keys}
                    selectTraining={selectTraining}
                    setSelectTraining={setSelectTraining}
                />
            ),
        },
        {
            label: 'За всё время (Pro)',
            key: Keys.all,
            disabled: true,
        },
    ];

    useEffect(() => {
        dispatch(getTrainingTC());
    }, [dispatch]);

    useEffect(() => {
        if (trainings) {
            dispatch(ResetStateAC());
            dispatch(catalogTC());
        }
    }, [dispatch, trainings]);

    useEffect(() => {
        isTrainingsError && navigate(Path.MAIN);
    }, [isTrainingsError, navigate]);
    return (
        <Layout className={s.container}>
            <Tabs className={s.tabs} items={items} destroyInactiveTabPane={true} />
        </Layout>
    );
};
