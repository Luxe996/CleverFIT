import { Button, Card, Typography } from 'antd';
import s from './emptyF.module.scss';

const { Title, Text } = Typography;
type EmptyFeedbackPT = {
    setModalHandler: () => void;
};
export const EmptyFeedback = ({ setModalHandler }: EmptyFeedbackPT) => (
    <div className={s.container}>
        <Card className={s.card}>
            <div className={s.content}>
                <Title className={s.title}>Оставьте свой отзыв первым</Title>
                <Text type='secondary'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </Text>
            </div>
        </Card>
        <Button
            type='primary'
            data-test-id='write-review'
            htmlType='submit'
            onClick={setModalHandler}
        >
            Написать отзыв
        </Button>
    </div>
);
