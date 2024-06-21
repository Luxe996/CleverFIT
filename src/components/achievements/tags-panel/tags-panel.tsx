import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import { Space, Tag } from 'antd';
import { CatalogType } from '@redux/reducers/calendar-reducer';
import s from './tags-panel.module.scss';

type TagsPanelType = {
    selectTraining: string;
    setSelectTraining: (value: string) => void;
};
export const TagsPanel = ({ selectTraining, setSelectTraining }: TagsPanelType) => {
    const { catalogList } = useAppSelector(calendarSelector);
    const onTabClick = (value: string) => {
        setSelectTraining(value);
    };
    return (
        <Space size={24} className={s.container}>
            <span>Тип тренировки:</span>
            <div className={s.tags}>
                {['Все', ...catalogList.map((item: CatalogType) => item.name)].map((value) => (
                    <Tag
                        key={value}
                        className={selectTraining === value ? s.active : ''}
                        onClick={() => onTabClick(value)}
                    >
                        {value}
                    </Tag>
                ))}
            </div>
        </Space>
    );
};
