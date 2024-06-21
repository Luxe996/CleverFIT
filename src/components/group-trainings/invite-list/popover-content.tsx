import { dataTestId } from '@constants/data-test-id.ts';
import s from '@components/group-trainings/invite-list/invite-list.module.scss';
import { Badge, Divider, List } from 'antd';
import { getBadgeColor } from '@utils/get-badge-color.ts';
import { CloseOutlined } from '@ant-design/icons';
import { getItemByPeriod } from '@utils/get-period-data.ts';
import moment from 'moment';
import { dayFormat } from '@constants/date.ts';
import { InviteType } from '@redux/reducers/trainigs-reducer.ts';

type PopoverContentType = {
    item: InviteType;
    setOpenPopover: (value: boolean) => void;
};

export const PopoverContent = ({ item, setOpenPopover }: PopoverContentType) => (
    <div data-test-id={dataTestId.jointTrainingReviewCard}>
        <div className={s.popTitle}>
            <div>
                <Badge color={getBadgeColor(item.training.name)} style={{ marginRight: '8px' }} />
                {item.training.name}
            </div>
            <CloseOutlined onClick={() => setOpenPopover(false)} />
        </div>
        <Divider />
        <div className={s.popContent}>
            <div className={item.training.parameters?.period ? s.popPeriod : s.popDate}>
                <span className={s.period}>
                    {getItemByPeriod(item.training.parameters?.period)}
                </span>
                {moment(item.training.date).format(dayFormat)}
            </div>
            <List
                dataSource={item.training.exercises}
                renderItem={(exercise) => (
                    <List.Item className={s.exercise}>
                        <span className={s.exName}>{exercise.name}</span>
                        <span className={s.exDetails}>
                            {exercise.approaches} x (
                            {exercise.weight ? `${exercise.weight}кг` : exercise.approaches})
                        </span>
                    </List.Item>
                )}
            />
        </div>
    </div>
);
