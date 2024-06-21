import { Col } from 'antd';
import s from './frequent-training.module.scss';

type FrequentTrainingType = {
    selectTraining: string;
    mostFrequentExercise: { name: string; count: number } | undefined;
    mostFrequentTrainingName: string;
};
export const FrequentTraining = ({
    selectTraining,
    mostFrequentExercise,
    mostFrequentTrainingName,
}: FrequentTrainingType) => (
    <Col className={s.container}>
        {selectTraining === 'Все' && (
            <div className={s.content}>
                Самая частая тренировка
                <span className={s.contentName}>{mostFrequentTrainingName}</span>
            </div>
        )}
        <div className={s.content}>
            Самое частое упражнение {selectTraining !== 'Все' && selectTraining.toLocaleLowerCase()}
            <span className={s.contentName}>{mostFrequentExercise?.name}</span>
        </div>
    </Col>
);
