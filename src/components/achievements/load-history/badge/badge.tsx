import { Badge } from 'antd';
import { DataType } from '@utils/get-chart-data';
type BadgeType = {
    index: number;
    item: DataType;
};
const LOAD_COLOR = '#2F54EBFF';
const NO_LOAD_COLOR = '#F0F5FFFF';
export const BadgeComponent = ({ index, item }: BadgeType) => (
    <Badge
        count={index + 1}
        style={{
            backgroundColor: item.load ? LOAD_COLOR : NO_LOAD_COLOR,
            color: item.load ? 'white' : LOAD_COLOR,
            marginRight: '16px',
        }}
    />
);
