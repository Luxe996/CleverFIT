import s from './settings-page.module.scss';
import { Layout, Modal, Result, Typography } from 'antd';

import { useEffect, useState } from 'react';
import { getTariffsTC, payTariffsAC } from '@redux/reducers/settings-reducer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { feedbackSelector, settingSelector, userSelector } from '../../selectors/selectors';
import { loginAC, setTokenAC } from '@redux/reducers/auth-reducer';
import { setUserInfoAC, UserInfoType } from '@redux/reducers/user-reducer';
import { FeedbackButtons } from '@components/feedbacks/feedback-buttons';
import { FeedbackModal } from '@components/modals/feedback-modal';
import { ResultFeedbackModal } from '@components/modals/result-modals';
import { getProfileCards } from '@utils/get-profile-cards';
import { SwitchersBlock } from '@components/profile/switchers-block';
import { TariffDrawer } from '@components/settings/fatiff-drawer';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { dataTestId } from '@constants/data-test-id';

const { Title } = Typography;

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { userInfo } = useAppSelector(userSelector);
    const { tariffs, isPay } = useAppSelector(settingSelector);
    const { isError, isSuccess } = useAppSelector(feedbackSelector);

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const setFeedbackModalHandler = () => setShowFeedbackModal((pervState) => !pervState);

    const cardBody = getProfileCards(tariffs, userInfo, setIsDrawerOpen, s);

    const subTitle = (
        <>
            Мы отправили инструкцию для оплаты вам на e-mail {''}
            <span>{userInfo.email}</span>. После подтверждения оплаты войдите в приложение заново{' '}
        </>
    );

    useEffect(() => {
        if (isError || isSuccess) {
            setShowResultModal(true);
        }
    }, [isError, isSuccess]);

    useEffect(() => {
        dispatch(getTariffsTC());
    }, [dispatch]);

    return (
        <Layout className={s.container}>
            <Title className={s.title}> Мой тариф</Title>
            <div className={s.tarifs}>{cardBody}</div>
            <SwitchersBlock userInfo={userInfo} />
            <FeedbackButtons setModalHandler={setFeedbackModalHandler} />
            <TariffDrawer
                tariffs={tariffs}
                userInfo={userInfo}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
            <FeedbackModal
                showModal={showFeedbackModal}
                onCancel={setFeedbackModalHandler}
                setShowModal={setShowFeedbackModal}
            />

            <ResultFeedbackModal
                isOpen={showResultModal}
                isSuccess={isSuccess}
                setShowResultModal={setShowResultModal}
                setShowFeedbackModal={setShowFeedbackModal}
            />

            <Modal
                centered={true}
                open={isPay}
                footer={null}
                closable={!xs}
                onCancel={() => {
                    localStorage.removeItem('token');
                    dispatch(setTokenAC(''));
                    dispatch(loginAC(null, null));
                    dispatch(setUserInfoAC({} as UserInfoType));
                    dispatch(payTariffsAC(false));
                }}
                data-test-id={dataTestId.tariffModalSuccess}
            >
                <Result
                    status='success'
                    title='Чек для оплаты у вас на почте'
                    subTitle={subTitle}
                    extra='Не пришло письмо? Проверьте папку Спам.'
                />
            </Modal>
        </Layout>
    );
};
