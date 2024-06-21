import { Moment } from 'moment/moment';
import { dateFormat } from '@constants/date';

export const formatSelectDate = (date: Moment | null) => {
    return date?.utc().format(`${dateFormat}THH:mm:ss`);
};
