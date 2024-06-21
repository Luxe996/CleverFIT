import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import s from './feedbacks-page.module.scss';
import { Button, Modal, Result } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { EmptyFeedback } from '@components/feedbacks/empty-feedback/empty-feedback';
import { getFeedbacksTC } from '@redux/reducers/feedbacks-reducer';
import { Feedbacks } from '@components/feedbacks/feedbacks';
import { feedbackSelector } from '../../selectors';
import { FeedbackModal } from '@components/modals/feedback-modal';
import { ResultFeedbackModal } from '@components/modals/result-modals';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { feedbacks, isError, isSuccess } = useAppSelector(feedbackSelector);

    const [showModal, setShowModal] = useState(false);

    const [resultModal, setResultModal] = useState(false);

    const setModalHandler = () => setShowModal((pervState) => !pervState);

    const handleErrorModal = () => {
        navigate(Path.MAIN);
    };

    useEffect(() => {
        dispatch(getFeedbacksTC());
    }, [dispatch]);

    useEffect(() => {
        if ((feedbacks && isError) || isSuccess) {
            setResultModal(true);
        }
    }, [feedbacks, isError, isSuccess]);

    return (
        <div className={s.wrapper}>
            {feedbacks &&
                (feedbacks.length === 0 ? (
                    <EmptyFeedback setModalHandler={setModalHandler} />
                ) : (
                    <Feedbacks feedbacks={feedbacks} setModalHandler={setModalHandler} />
                ))}

            {!feedbacks && (
                <Modal
                    open={Boolean(isError)}
                    onCancel={handleErrorModal}
                    footer={null}
                    centered
                    closable={false}
                    maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
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
            )}

            <FeedbackModal
                showModal={showModal}
                onCancel={setModalHandler}
                setShowModal={setShowModal}
            />
            <ResultFeedbackModal
                isOpen={resultModal}
                isSuccess={isSuccess}
                setShowResultModal={setResultModal}
                setShowFeedbackModal={setShowModal}
            />
        </div>
    );
};
