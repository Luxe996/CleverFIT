import { Button, Modal, Result } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getFeedbacksTC, postFeedbacksAC } from '@redux/reducers/feedbacks-reducer';
import { dataTestId } from '@constants/data-test-id';

type ResultModalType = {
    isOpen: boolean;
    isSuccess: boolean | null;
    setShowResultModal: (value: boolean) => void;
    setShowFeedbackModal: (value: boolean) => void;
};

export const ResultFeedbackModal = ({
    isOpen,
    isSuccess,
    setShowResultModal,
    setShowFeedbackModal,
}: ResultModalType) => {
    const dispatch = useAppDispatch();

    const updateFeedbacks = () => {
        dispatch(getFeedbacksTC());
        dispatch(postFeedbacksAC(null, null));
        setShowResultModal(false);
    };
    const tryAgain = () => {
        dispatch(postFeedbacksAC(null, null));
        setShowResultModal(false);
        setShowFeedbackModal(true);
    };

    const closeError = () => {
        dispatch(postFeedbacksAC(null, null));
        setShowResultModal(false);
    };

    return (
        <Modal
            open={isOpen}
            footer={null}
            centered
            maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
        >
            {isSuccess ? (
                <Result
                    status='success'
                    title='Отзыв успешно опубликован'
                    extra={
                        <Button type='primary' style={{ width: '100%' }} onClick={updateFeedbacks}>
                            Отлично
                        </Button>
                    }
                />
            ) : (
                <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    extra={[
                        <Button
                            type='primary'
                            key='newReview'
                            onClick={tryAgain}
                            data-test-id={dataTestId.writeReviewNotSavedModal}
                        >
                            Написать отзыв
                        </Button>,
                        <Button type='text' key='close' onClick={closeError}>
                            Закрыть
                        </Button>,
                    ]}
                />
            )}
        </Modal>
    );
};
