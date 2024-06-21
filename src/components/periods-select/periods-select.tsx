import { Select } from 'antd';
import { getPeriodByItem, getPeriodItems } from '@utils/get-period-data';
import { dataTestId } from '@constants/data-test-id';

type PeriodsSelectType = {
    period: string;
    setPeriod: (value: number | null) => void;
};

export const PeriodsSelect = ({ period, setPeriod }: PeriodsSelectType) => {
    const items = getPeriodItems().map((element) => ({ label: element, value: element }));
    const onChange = (value: string) => {
        setPeriod(getPeriodByItem(value));
    };

    return (
        <Select
            data-test-id={dataTestId.modalDrawerRightSelectPeriod}
            defaultValue={period}
            options={items}
            style={{ width: '156px' }}
            onChange={onChange}
        />
    );
};
