import { Avatar, Button, Popover, Typography } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsSelector } from '../../../selectors/selectors.ts';
import { useState } from 'react';
import moment from 'moment/moment';
import { dayFormat } from '@constants/date.ts';
import { sendResponseTC } from '@redux/reducers/trainigs-reducer.ts';
import { TRAININGS } from '@utils/popular-training.ts';
import s from './invite-list.module.scss';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { PopoverContent } from '@components/group-trainings/invite-list/popover-content.tsx';

export const InviteList = () => {
    const dispatch = useAppDispatch();
    const { lg } = useBreakpoint();
    const { invites } = useAppSelector(trainingsSelector);

    const [collapsed, setCollapsed] = useState(true);
    const [openPopover, setOpenPopover] = useState(false);
    const [selectedInviteId, setSelectedInviteId] = useState('');

    if (!invites.length) {
        return null;
    }

    const renderList = collapsed ? [invites[0]] : invites;

    const openPopoverHandler = (id: string) => {
        setSelectedInviteId(id);
        setOpenPopover(true);
    };

    const popoverVisibleChange = (visible: boolean) => {
        setOpenPopover(visible);
    };

    const collapseHandler = () => {
        setCollapsed(!collapsed);
    };

    const onAcceptInvite = (id: string) => {
        if (openPopover) {
            setOpenPopover(false);
        }
        dispatch(sendResponseTC(id, 'accepted'));
    };

    const onRejectInvite = (id: string) => {
        if (openPopover) {
            setOpenPopover(false);
        }
        dispatch(sendResponseTC(id, 'rejected'));
    };

    return (
        <div className={s.inviteList}>
            <Typography.Text type='secondary'>Новое сообщение({invites.length})</Typography.Text>
            {renderList.map((item) => (
                <div key={item._id} className={s.inviteCard}>
                    <div className={s.userInfo}>
                        <Avatar size={42} src={item.from.imageSrc} icon={<UserOutlined />} />
                        <div className={s.userName}>
                            <Typography.Text>{item.from.firstName}</Typography.Text>
                            <Typography.Text>{item.from.lastName}</Typography.Text>
                        </div>
                    </div>
                    <div className={s.message}>
                        <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
                            {moment(item.createdAt).format(dayFormat)}
                        </Typography.Text>
                        <Typography.Title level={5} style={{ color: '#061178', marginTop: '8px' }}>
                            Привет, я ищу партнёра для совместных [
                            {TRAININGS[item.training.name as keyof typeof TRAININGS]}]. Ты хочешь
                            присоединиться ко мне на следующих тренировках?
                        </Typography.Title>
                        <Popover
                            overlayClassName={s.popWrapper}
                            open={openPopover && selectedInviteId === item._id}
                            placement={lg ? 'bottomLeft' : 'topLeft'}
                            showArrow={false}
                            trigger='click'
                            key={item._id}
                            onOpenChange={popoverVisibleChange}
                            content={<PopoverContent item={item} setOpenPopover={setOpenPopover} />}
                        >
                            <Typography.Text
                                className={s.detailsLink}
                                onClick={() => openPopoverHandler(item._id)}
                            >
                                Посмотреть детали тренировки
                            </Typography.Text>
                        </Popover>
                    </div>
                    <div className={s.controls}>
                        <Button type='primary' onClick={() => onAcceptInvite(item._id)}>
                            Тренироваться вместе
                        </Button>
                        <Button onClick={() => onRejectInvite(item._id)}>Отклонить запрос</Button>
                    </div>
                </div>
            ))}

            {!!invites.length && (
                <Button
                    className={s.collapseButton}
                    type='text'
                    ghost={true}
                    icon={collapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={collapseHandler}
                >
                    {collapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
