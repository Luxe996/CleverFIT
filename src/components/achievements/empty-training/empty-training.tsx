import { Card, Row } from 'antd';
import Empty from '../../../../public/not-training.png';
import s from './empty-training.module.scss';

type EmptyTrainingType = {
    activeTab: string;
    keys: Record<string, string>;
};
export const EmptyTraining = ({ activeTab, keys }: EmptyTrainingType) => {
    const title = ` Ой, такой тренировки ${
        activeTab === keys.month ? 'в этом месяце' : 'на этой неделе'
    } не было`;

    return (
        <Row className={s.container}>
            <Card
                title={
                    <>
                        <img src={Empty} alt='Not training' />
                        {title}
                    </>
                }
                bordered={false}
            />
        </Row>
    );
};
