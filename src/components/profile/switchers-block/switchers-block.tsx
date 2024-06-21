import s from './switchers-block.module.scss';
import { Switch, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { updateUserInfoTC, UserInfoType } from '@redux/reducers/user-reducer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { switchItem } from './switch-items';

type SwitchersBlockType = {
    userInfo: UserInfoType;
};

export const SwitchersBlock = ({ userInfo }: SwitchersBlockType) => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();

    const onSwitchHandler = (checked: boolean, id: string) => {
        const date = { [id]: checked };
        if (id !== 'darkTheme') {
            dispatch(updateUserInfoTC(date));
        }
    };
    return (
        <div className={s.switchers}>
            {switchItem.map((item) => (
                <div key={item.id} className={s.switcher}>
                    <div className={s.item}>
                        <p>{item.title}</p>
                        <Tooltip title={item.tooltip} placement={'bottomLeft'}>
                            <ExclamationCircleOutlined data-test-id={item.iconTestId} />
                        </Tooltip>
                    </div>
                    <Switch
                        size={xs ? 'small' : 'default'}
                        data-test-id={item.switchTestId}
                        disabled={item.id === 'darkTheme' && !userInfo.tariff}
                        checked={userInfo[item.id]}
                        onChange={(checked) => {
                            onSwitchHandler(checked, item.id);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};
