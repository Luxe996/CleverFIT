import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useEffect } from 'react';
import { getJointPartnersTC, getPartnersTC } from '@redux/reducers/trainigs-reducer.ts';
import { Button, Divider, Typography } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { PartnersList } from '@components/group-trainings/partners-list';
import { calendarSelector, trainingsSelector } from '../../selectors/selectors.ts';
import { JointPartnersList } from '@components/group-trainings/joint-partners-list';
import { InviteList } from '@components/group-trainings/invite-list';
import { popularTraining } from '@utils/popular-training.ts';
import s from './group-trinings.module.scss';

export const GroupTrainings = () => {
    const dispatch = useAppDispatch();

    const { jointPartners } = useAppSelector(trainingsSelector);
    const { trainings } = useAppSelector(calendarSelector);

    const randomSelectionHandler = () => {
        dispatch(getJointPartnersTC());
    };
    const selectionByTraining = () => {
        const training = popularTraining(trainings);
        dispatch(getJointPartnersTC(training));
    };

    useEffect(() => {
        dispatch(getPartnersTC());
    }, [dispatch]);

    if (jointPartners.length > 0) {
        return <JointPartnersList />;
    }
    return (
        <div className={s.container}>
            <InviteList />
            <div className={s.description}>
                <Typography.Title style={{ color: '#061178' }} level={3}>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь найти
                    друга для совместных тренировок среди других пользователей.
                </Typography.Title>
                <Typography.Text>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                    уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                </Typography.Text>
                <Divider />
                <ButtonGroup className={s.buttons}>
                    <Button
                        type='link'
                        style={{ color: '#2f54eb' }}
                        onClick={randomSelectionHandler}
                    >
                        Случайный выбор
                    </Button>
                    <Button type='link' style={{ color: '#262626' }} onClick={selectionByTraining}>
                        Выбор друга по моим тренировкам
                    </Button>
                </ButtonGroup>
            </div>
            <PartnersList />
        </div>
    );
};
