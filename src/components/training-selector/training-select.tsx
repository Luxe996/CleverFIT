import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { Select } from 'antd';
import { useEffect } from 'react';

type TrainingSelectType = {
    selectValue: string;
    onChangeSelect: (value: string) => void;
    trainingNames: string[];
};
export const TrainingSelect = ({
    selectValue,
    onChangeSelect,
    trainingNames,
}: TrainingSelectType) => {
    const { catalogList, editTraining } = useAppSelector(calendarSelector);

    useEffect(() => {
        if (trainingNames.includes(selectValue) && !editTraining) {
            onChangeSelect('Выбор типа тренировки');
        }
    }, [selectValue, trainingNames, onChangeSelect, editTraining]);

    return (
        <Select
            data-test-id='modal-create-exercise-select'
            defaultValue='Выбор типа тренировки'
            value={selectValue}
            onChange={onChangeSelect}
            disabled={editTraining}
        >
            {trainingNames
                ? catalogList
                      .filter((training) => !trainingNames.includes(training.name))
                      .map((training) => (
                          <Select.Option key={training.key} value={training.name}>
                              {training.name}
                          </Select.Option>
                      ))
                : catalogList.map((training) => (
                      <Select.Option key={training.key} value={training.name}>
                          {training.name}
                      </Select.Option>
                  ))}
        </Select>
    );
};
