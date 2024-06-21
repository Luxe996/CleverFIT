import { Badge, Menu } from 'antd';
import { HeartFilled, TrophyFilled } from '@ant-design/icons';
import CalendarSider from '@public/calendar-sider.svg?react';
import ProfileSidebar from '@public/profile-sider.svg?react';
import s from './nav-bar.module.scss';
import { Path } from '../../routes/path';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsSelector } from '../../selectors/selectors.ts';
import { dataTestId } from '@constants/data-test-id.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
type NavBarType = {
    setCollapsed: (value) => void;
};
export const NavBar = ({ setCollapsed }: NavBarType) => {
    const navigate = useNavigate();
    const { xs } = useBreakpoint();
    const { invites } = useAppSelector(trainingsSelector);
    const items = [
        {
            key: `${Path.CALENDAR}`,
            icon: <CalendarSider />,
            label: 'Календарь',
            title: '',
        },
        {
            key: `${Path.TRAININGS}`,
            icon: (
                <Badge
                    size='small'
                    count={invites.length}
                    data-test-id={dataTestId.notificationAboutJointTraining}
                >
                    <HeartFilled style={{ color: 'rgba(6, 17, 120, 1)', lineHeight: '0' }} />
                </Badge>
            ),
            label: 'Тренировки',
            title: '',
        },
        {
            key: `${Path.ACHIEVEMENTS}`,
            icon: (
                <TrophyFilled
                    data-test-id='sidebar-achievements'
                    style={{ color: 'rgba(6, 17, 120, 1)' }}
                />
            ),
            label: 'Достижения',
            title: '',
        },
        {
            key: `${Path.PROFILE}`,
            icon: <ProfileSidebar />,
            label: 'Профиль',
            title: '',
        },
    ];
    const onMenuClick = (path: string) => {
        xs && setCollapsed(true);
        navigate(path);
    };
    return <Menu items={items} className={s.menu} onClick={({ key }) => onMenuClick(key)} />;
};
