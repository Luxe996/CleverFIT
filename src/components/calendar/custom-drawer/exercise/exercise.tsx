import { ExerciseInputType, ExerciseType } from '@redux/reducers/calendar-reducer';
import React from 'react';
import { Input, InputNumber } from 'antd';
import s from './exercise.module.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../../selectors';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';

type ExerciseProps = {
    exercise: ExerciseType;
    index: number;
    selectTraining: string;
    handleInputChange: (
        index: number,
        name: keyof ExerciseInputType,
        value: string | number | boolean,
    ) => void;
};

export const Exercise = ({ exercise, index, selectTraining, handleInputChange }: ExerciseProps) => {
    const { editTraining } = useAppSelector(calendarSelector);

    const isChecked = exercise.isImplementation;
    const handleNumberChange = (name: keyof ExerciseInputType, value: number | null) => {
        let result;

        if (value === null) {
            result = name === 'weight' ? 0 : 1;
        } else {
            result = value;
        }
        handleInputChange(index, name, result);
    };

    const dataTestIdInputNumber = (name: string) => {
        let title;

        if (name === 'replays') {
            title = 'approach';
        } else if (name === 'approaches') {
            title = 'quantity';
        } else {
            title = 'weight';
        }

        return `modal-drawer-right-input-${title}${index}`;
    };

    const setValue = (name: keyof ExerciseInputType) => {
        let value;

        if (exercise[name] === null) {
            value = name === 'weight' ? 0 : 1;
        } else {
            value = exercise[name] as number;
        }

        return value;
    };

    const handleIsImplementationChange = (e: CheckboxChangeEvent) => {
        handleInputChange(index, 'isImplementation', e.target.checked);
    };

    const addon = editTraining && editTraining.name === selectTraining && (
        <Checkbox
            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
            checked={isChecked}
            onChange={handleIsImplementationChange}
        />
    );
    const inputTitles = ['Подходы', 'Вес, кг', 'Количество'];
    const inputNames = ['replays', 'weight', 'approaches'] as Array<keyof ExerciseInputType>;

    return (
        <section className={s.container}>
            <Input
                autoFocus={true}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
                name='name'
                placeholder='Упражнение'
                value={exercise.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                addonAfter={addon}
            />

            <div className={s.inputTitle}>
                {inputTitles.map((text) => (
                    <React.Fragment key={text}>
                        <div className={s.text}>{text}</div>
                    </React.Fragment>
                ))}
            </div>

            <div className={s.input}>
                {inputNames.map((name: keyof ExerciseInputType) => (
                    <React.Fragment key={name}>
                        <InputNumber
                            data-test-id={dataTestIdInputNumber(name)}
                            name={name}
                            addonBefore={name === 'replays' && '+'}
                            value={setValue(name)}
                            onChange={(value) => {
                                handleNumberChange(name, value);
                            }}
                        />
                        {name === 'weight' && <div className={s.plus}>x</div>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};
