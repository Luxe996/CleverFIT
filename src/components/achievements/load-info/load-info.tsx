import { DataType } from '@utils/get-chart-data';
import { Card, Space } from 'antd';
import s from './load-info.module.scss';

type LoadInfoType = {
    data: DataType[];
};
enum CardTitle {
    totalLoad = 'Общая нагрузка, кг',
    dailyLoad = 'Нагрузка в день, кг',
    totalReplays = `Количество повторений,раз`,
    totalApproaches = 'Подходы, раз',
}
export const LoadInfo = ({ data }: LoadInfoType) => {
    let totalLoad = 0;
    let totalApproaches = 0;
    let totalReplays = 0;

    data.forEach((item) => {
        totalLoad += item.totalLoad;
        totalApproaches += item.approaches;
        totalReplays += item.replays;
    });
    const divisionResult = totalLoad / data.length;
    const dailyLoad = divisionResult % 1 === 0 ? divisionResult : divisionResult.toFixed(1);

    const cardData = [
        { title: CardTitle.totalLoad, key: 'totalLoad', value: totalLoad },
        { title: CardTitle.dailyLoad, key: 'dailyLoad', value: dailyLoad },
        { title: CardTitle.totalReplays, key: 'totalReplays', value: totalReplays },
        { title: CardTitle.totalApproaches, key: 'totalApproaches', value: totalApproaches },
    ];

    return (
        <Space className={s.container} size={24}>
            {cardData.map((item) => (
                <Card key={item.key} title={item.value.toLocaleString()}>
                    {item.title}
                </Card>
            ))}
        </Space>
    );
};
