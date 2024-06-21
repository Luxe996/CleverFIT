import { DataType } from '@utils/get-chart-data';
import { dayDate, dayFormat, shortDayFormat } from '@constants/date';
import { getSorteredLoadData } from '@utils/get-sortered-load-data';
import { Collapse, List, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getDayName } from '@utils/get-day-name';
import { BadgeComponent } from '@components/achievements/load-history/badge';
import moment from 'moment';
import s from './load-history.module.scss';

const { Title } = Typography;
const { Panel } = Collapse;

type LoadHistoryType = {
    data: DataType[];
    keys: Record<string, string>;
    activeTab: string;
    xs: boolean | undefined;
};

export const LoadHistory = ({ data, keys, activeTab, xs }: LoadHistoryType) => {
    const dataSortByWeek = getSorteredLoadData(data);
    const panelKeys = ['week0', 'week1', 'week2', 'week3', 'week4'];
    const formatDate = (date: string, format: string) =>
        moment(date, shortDayFormat).format(format);

    const sortData = [...data].sort((a, b) => {
        const dayA = moment(a.date, shortDayFormat).isoWeekday();
        const dayB = moment(b.date, shortDayFormat).isoWeekday();

        return dayA - dayB;
    });

    const panelData =
        activeTab === keys.month
            ? dataSortByWeek.map((weekData, index) => ({
                  key: `week${index}`,
                  header: `${'Неделя'} ${weekData.weekStart.format(
                      shortDayFormat,
                  )} - ${weekData.weekEnd.format(shortDayFormat)}`,
                  data: weekData.data,
              }))
            : [];

    return activeTab === keys.month ? (
        <Collapse
            defaultActiveKey={xs ? [] : panelKeys}
            accordion={xs}
            bordered={false}
            expandIconPosition='end'
            ghost={true}
            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
        >
            {panelData.map((panel) => (
                <Panel
                    key={panel.key}
                    header={panel.header}
                    showArrow={xs}
                    collapsible={xs ? 'header' : 'disabled'}
                >
                    {panel.data.map((item, index) => (
                        <div key={item.date}>
                            <BadgeComponent index={index} item={item} />
                            <span>{formatDate(item.date, dayFormat)}</span>
                            <span>{item.load ? `${item.load} кг` : ''}</span>
                        </div>
                    ))}
                </Panel>
            ))}
        </Collapse>
    ) : (
        <div className={s.container}>
            <Title level={5}>Средняя нагрузка по дням недели</Title>

            <List
                dataSource={sortData}
                renderItem={(item, index) => {
                    return (
                        <List.Item>
                            <span>
                                <BadgeComponent index={index} item={item} />
                                {getDayName(formatDate(item.date, dayDate))}
                            </span>
                            <span className={s.load}>{item.load ? `${item.load} кг` : ''}</span>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};
