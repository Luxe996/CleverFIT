import s from './my-trainings.module.scss';
import { Button } from 'antd';
import { useState } from 'react';
import { TrainingsDrawer } from '@components/my-tainings/trainings-drawer';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { TrainingList } from '@components/my-tainings/training-list';

export const MyTrainings = () => {
    const { trainings } = useAppSelector(calendarSelector);
    const [isCreateTraining, setIsCreateTraining] = useState(false);
    return (
        <>
            {trainings && Object.keys(trainings).length ? (
                <TrainingList setIsCreateTraining={setIsCreateTraining} />
            ) : (
                <div className={s.empty}>
                    <p>У вас ещё нет созданных тренировок</p>
                    <Button type='primary' onClick={() => setIsCreateTraining(true)}>
                        Создать тренировку
                    </Button>
                </div>
            )}
            <TrainingsDrawer
                isCreateTraining={isCreateTraining}
                setIsCreateTraining={setIsCreateTraining}
            />
        </>
    );
};
