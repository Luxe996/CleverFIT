import { ExerciseType, TrainingType } from '@redux/reducers/calendar-reducer';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Divider, Popover } from 'antd';
import { useState } from 'react';
import s from './edit-training-popover.module.scss';
import { getBadgeColor } from '@utils/get-badge-color';

type EditTrainingPopoverType = {
    training: TrainingType;
    onEditClick: (training: TrainingType) => void;
};
export const EditTrainingPopover = ({ training, onEditClick }: EditTrainingPopoverType) => {
    const [visible, setVisible] = useState(false);
    const handleVisibleChange = (open: boolean) => {
        setVisible(open);
    };
    const content = (
        <>
            <div>
                <h4>
                    <ArrowLeftOutlined
                        onClick={() => setVisible(false)}
                        style={{ marginRight: '8px' }}
                    />{' '}
                    {training.name}
                </h4>
                <Divider
                    style={{
                        background: getBadgeColor(training.name),
                        margin: '16px 0',
                        height: '2px',
                    }}
                />
                <ul>
                    {training.exercises.map((exercise: ExerciseType) => (
                        <li key={exercise._id}>{exercise.name}</li>
                    ))}
                </ul>
            </div>

            <Button
                type='default'
                onClick={() => {
                    onEditClick(training);
                }}
                disabled={training.isImplementation}
            >
                Добавить упражнения
            </Button>
        </>
    );
    return (
        <Popover
            content={content}
            placement='bottomRight'
            showArrow={false}
            open={visible}
            onOpenChange={handleVisibleChange}
            overlayClassName={s.popover}
            trigger='click'
        >
            <DownOutlined />
        </Popover>
    );
};
