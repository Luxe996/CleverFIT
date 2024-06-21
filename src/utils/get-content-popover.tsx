import { ExerciseType, NewTrainingType, TrainingType } from '@redux/reducers/calendar-reducer';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Empty from '@public/empty-image.svg?react';

export const getContentPopover = (
    newTraining: NewTrainingType,
    selectTraining: string,
    setIsCreateTraining: (createTraining: boolean) => void,
    editTraining: TrainingType,
    s: { [key: string]: string },
) => {
    let content;
    if (newTraining && newTraining.exercises.length > 0 && newTraining.name === selectTraining) {
        content = (
            <ul className={s.exercises}>
                {newTraining.exercises.map((exercise: ExerciseType) => (
                    <li key={exercise.name}>
                        <Button type='text' onClick={() => setIsCreateTraining(true)}>
                            {exercise.name}
                            <EditOutlined style={{ color: '#2B4ACBFF' }} />
                        </Button>
                    </li>
                ))}
            </ul>
        );
    } else if (
        editTraining &&
        editTraining.exercises.length > 0 &&
        editTraining.name === selectTraining
    ) {
        content = (
            <ul className={s.exercises}>
                {editTraining.exercises.map((exercise: ExerciseType, index: number) => (
                    <li key={exercise.name}>
                        <Button
                            type='text'
                            onClick={() => setIsCreateTraining(true)}
                            data-test-id={`modal-update-training-edit-button${index}`}
                        >
                            {exercise.name}
                            <EditOutlined style={{ color: '#2B4ACBFF' }} />
                        </Button>
                    </li>
                ))}
            </ul>
        );
    } else {
        content = (
            <div
                style={{
                    marginTop: '32px',
                    textAlign: 'center',
                }}
            >
                <Empty />
            </div>
        );
    }
    return content;
};
