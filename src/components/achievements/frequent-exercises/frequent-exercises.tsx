import { DataType } from '@utils/get-chart-data';
import { filterFrequentExercise } from '@utils/filter-frequent-exercise';
import { Badge, List, Typography } from 'antd';
import moment from 'moment';
import { dayDate, shortDayFormat } from '@constants/date';
import { getDayName } from '@utils/get-day-name';
const { Title } = Typography;
import s from './frequent-exercises.module.scss';
type FrequentExercisesType = {
    data: DataType[];
    keys: Record<string, string>;
    activeTab: string;
};
export const FrequentExercises = ({ data, keys, activeTab }: FrequentExercisesType) => {
    const dataSortForExercise = filterFrequentExercise(data);
    const title = ` Самые частые упражнения
     по дням недели
    ${activeTab === keys.month ? 'за месяц' : ''}`;

    return (
        <div className={s.history}>
            <Title level={5}>{title}</Title>

            <List
                dataSource={dataSortForExercise}
                renderItem={(item, index) => {
                    const dayOfWeek = getDayName(moment(item.date, shortDayFormat).format(dayDate));
                    return (
                        <List.Item>
                            <span>
                                <Badge
                                    count={index + 1}
                                    style={{
                                        backgroundColor: '#FF4D4FFF',
                                        color: 'white',
                                        marginRight: '16px',
                                    }}
                                />
                                {dayOfWeek}
                            </span>
                            <span className={s.load}>{item.mostFrequentExercise}</span>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};
