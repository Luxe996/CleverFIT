import { Button, Form, Modal, Rate } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { postFeedBackTC } from '@redux/reducers/feedbacks-reducer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useState } from 'react';
import s from './feedback-modal.module.scss';
import { dataTestId } from '@constants/data-test-id';

type FeedbackModalsType = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    onCancel: () => void;
};
export const FeedbackModal = ({ showModal, setShowModal, onCancel }: FeedbackModalsType) => {
    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState({ rating: 0, massage: '' });
    const addFeedBack = () => {
        setFormValues({ rating: 0, massage: '' });
        setShowModal(false);
        dispatch(postFeedBackTC(formValues.rating, formValues.massage));
    };
    return (
        <Modal
            title='Ваш отзыв'
            open={showModal}
            onCancel={onCancel}
            centered
            footer={[
                <Button
                    key='submit'
                    type='primary'
                    onClick={addFeedBack}
                    data-test-id={dataTestId.newReviewSubmitButton}
                >
                    Опубликовать
                </Button>,
            ]}
            maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
        >
            <Form
                onValuesChange={(_, values) => setFormValues(values)}
                initialValues={formValues}
                className={s.form}
            >
                <Form.Item name='rating'>
                    <Rate character={<StarTwoTone />} />
                </Form.Item>
                <Form.Item name='massage'>
                    <TextArea
                        placeholder='Autosize height with minimum and maximum number of lines'
                        autoSize={{ minRows: 2 }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
