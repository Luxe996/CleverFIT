import { Badge, Layout, Tabs } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useNavigate } from 'react-router-dom';
import { calendarSelector } from '../../selectors';
import { useEffect, useState } from 'react';
import { catalogTC, getTrainingTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { Path } from '../../routes/path';
import { MyTrainings } from '@components/my-tainings';
import { GroupTrainings } from '@components/group-trainings';
import TabPane from 'antd/lib/tabs/TabPane';
import { trainingsSelector } from '../../selectors/selectors.ts';
import s from './trainings-page.module.scss';
import { ErrorModal } from '@components/modals/error-modal';
import { dataTestId } from '@constants/data-test-id';

const items = [
    {
        label: 'Мои Тренировки',
        key: '1',
        children: <MyTrainings />,
    },
    {
        label: 'Совместные тренировки',
        key: '2',
        children: <GroupTrainings />,
    },
    {
        label: 'Марафоны',
        key: '3',
        disabled: true,
    },
];

export const TrainingsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { trainings, isTrainingsError, isCatalogError } = useAppSelector(calendarSelector);
    const { isError } = useAppSelector(trainingsSelector);
    const { invites } = useAppSelector(trainingsSelector);

    const [key, setKey] = useState('1');

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
        <Layout className={s.container}>
            <Tabs
                className={s.tabs}
                activeKey={key}
                onChange={(activePath: string) => {
                    setKey(activePath);
                }}
            >
                {items.map((item) => (
                    <TabPane
                        key={item.key}
                        tab={
                            item.key === '2' ? (
                                <span>
                                    {item.label}
                                    <Badge className={s.badge} count={invites.length} />
                                </span>
                            ) : (
                                item.label
                            )
                        }
                        disabled={item.disabled}
                    >
                        {key === item.key && item.children}
                    </TabPane>
                ))}
            </Tabs>
            <ErrorModal
                title={`При ${
                    isCatalogError || isError ? 'открытии' : 'сохранении'
                } данных произошла ошибка`}
                description={`${
                    isCatalogError || isError ? 'Попробуйте' : 'Придётся попробовать'
                } ещё раз`}
                dataTestContent={dataTestId.modalErrorUserTrainingTitle}
                dataTestDescription={dataTestId.modalErrorUserTrainingSubtitle}
                dataTestButton={dataTestId.modalErrorUserTrainingButton}
            />
        </Layout>
    );
};
