import { Radio } from 'antd';
import { TariffType } from '@redux/reducers/settings-reducer';
import s from './periods.module.scss';

type PeriodsType = {
    tariff: TariffType;
    selectTariff: number;
    setSelectTariff: (value: number) => void;
};
export const Periods = ({ tariff, selectTariff, setSelectTariff }: PeriodsType) => {
    const onChange = (days: number) => {
        setSelectTariff(days);
    };

    return (
        <ul>
            {tariff?.periods?.map((period) => (
                <li key={period.cost} className={s.prices}>
                    <span>{period.text}</span>
                    <div className={s.icons}>
                        <span>{String(period.cost).replace('.', ',')} $</span>
                        <Radio
                            data-test-id={`tariff-${period.cost}`}
                            onChange={() => onChange(period.days)}
                            checked={selectTariff === period.days}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};
