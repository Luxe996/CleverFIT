import { Button, Layout, Modal, Result } from 'antd';
import s from './main-page.module.scss';
import { AppContent } from '@components/app-content/app-content';
import { AppCard } from '@components/app-card/app-card';
import { HeartFilled } from '@ant-design/icons';
import { FooterCard } from '@components/footer-card/footer-card';
import CalendarCard from '@public/calendar-card.svg?react';
import ProfileCard from '@public/profile-card.svg?react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { ResetStateAC } from '@redux/reducers/calendar-reducer';
import { dataTestId } from '@constants/data-test-id';

const { Footer, Content } = Layout;

export const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isTrainingsError } = useAppSelector(calendarSelector);
    const handleErrorModal = () => {
        dispatch(ResetStateAC());
    };

    const onButtonClick = () => {
        navigate(Path.FEEDBACKS);
    };

    return (
        <Layout>
            <Content>
                <AppContent>
                    <AppCard
                        title={'Расписать тренировки'}
                        link={'Тренировки'}
                        icon={<HeartFilled />}
                        dataTestId={dataTestId.menuButtonTraining}
                        path={Path.TRAININGS}
                    />
                    <AppCard
                        title={'Назначить календарь'}
                        link={'Календарь'}
                        icon={<CalendarCard />}
                        dataTestId={dataTestId.menuButtonCalendar}
                        path={Path.CALENDAR}
                    />
                    <AppCard
                        title={'Заполнить профиль'}
                        link={'Профиль'}
                        icon={<ProfileCard />}
                        dataTestId={dataTestId.menuButtonProfile}
                        path={Path.PROFILE}
                    />
                </AppContent>
            </Content>
            <Footer className={s.footer}>
                <div>
                    <Button
                        type={'link'}
                        size={'large'}
                        onClick={onButtonClick}
                        data-test-id='see-reviews'
                    >
                        Смотреть отзывы
                    </Button>
                </div>
                <div className={s['footer-card']}>
                    <FooterCard />
                </div>
            </Footer>

            <Modal
                open={isTrainingsError}
                onCancel={handleErrorModal}
                footer={null}
                centered
                closable={false}
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
                data-test-id='modal-no-review'
            >
                <Result
                    status='500'
                    title='Что-то пошло не так'
                    subTitle='Произошла ошибка, попробуйте ещё раз.'
                    extra={
                        <Button type='primary' onClick={handleErrorModal}>
                            Назад
                        </Button>
                    }
                />
            </Modal>
        </Layout>
    );
};
