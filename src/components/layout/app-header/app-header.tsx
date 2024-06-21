import { Button, Layout, Typography } from 'antd';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../routes/path';
import { CustomBreadcrumb } from '@components/custom-breadcrumb/custom-breadcrumb';
import { history } from '@redux/configure-store';
import s from './app-header.module.scss';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader = () => {
    const { xs } = useBreakpoint();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isMain = pathname.includes(Path.MAIN);
    const isProfile = pathname.includes(Path.PROFILE);
    const isSettings = pathname.includes(Path.SETTINGS);
    return (
        <Header className={s.container}>
            <CustomBreadcrumb isMain={isMain} isProfile={isProfile} isSettings={isSettings} />
            <div className={s.header}>
                {isMain && (
                    <Title className={s.title}>
                        Приветствуем тебя в CleverFit — приложении,
                        <br />
                        которое поможет тебе добиться своей мечты!
                    </Title>
                )}
                {isProfile && <Title className={s.pageTitle}>Профиль</Title>}
                {isSettings && (
                    <Button type='text' className={s.pageTitle}>
                        <ArrowLeftOutlined
                            style={{ fontSize: '14px', margin: '0' }}
                            onClick={history.back}
                            data-test-id='settings-back'
                        />
                        Настройки
                    </Button>
                )}
                {isSettings ? null : xs ? (
                    <Button
                        className={s.settings}
                        shape='circle'
                        icon={<SettingOutlined />}
                        onClick={() => navigate(Path.SETTINGS)}
                    />
                ) : (
                    <Button
                        className={s.settings}
                        icon={<SettingOutlined />}
                        type={'text'}
                        size={'small'}
                        onClick={() => navigate(Path.SETTINGS)}
                        data-test-id='header-settings'
                    >
                        Настройки
                    </Button>
                )}
            </div>
        </Header>
    );
};
