import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Typography } from 'antd';
import moment from 'moment/moment';
import { Periods } from '@components/settings/periods/periods';
import s from './tariff-drawer.module.scss';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { PayTariffsTC, TariffType } from '@redux/reducers/settings-reducer';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { UserInfoType } from '@redux/reducers/user-reducer';
import { dataTestId } from '@constants/data-test-id';
import { benefits } from './benefits';

type TariffDrawerType = {
    tariffs: TariffType[];
    userInfo: UserInfoType;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (value: boolean) => void;
};

const { Title } = Typography;

export const TariffDrawer = ({
    tariffs,
    isDrawerOpen,
    setIsDrawerOpen,
    userInfo,
}: TariffDrawerType) => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const [selectTariff, setSelectTariff] = useState(0);
    const onPayClick = () => {
        dispatch(PayTariffsTC(tariffs[0]._id, selectTariff));
        setSelectTariff(0);
        setIsDrawerOpen(false);
    };

    return (
        <Drawer
            data-test-id={dataTestId.tariffSider}
            className={s.drawer}
            title='Сравнить тарифы'
            closeIcon={<CloseOutlined />}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            placement={xs ? 'bottom' : 'right'}
            height={xs ? '80%' : '100%'}
            destroyOnClose={true}
            footer={
                !userInfo.tariff && (
                    <Button
                        type='primary'
                        onClick={onPayClick}
                        disabled={selectTariff === 0}
                        data-test-id={dataTestId.tariffSubmitButton}
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
        >
            {userInfo.tariff && (
                <div className={s.activePeriod}>
                    Ваш PRO tariff активен до {moment(userInfo.tariff.expired).format('DD.MM')}
                </div>
            )}
            <div className={s.benefits}>
                <div className={s.columnNames}>
                    <div className={s.columnName}>FREE</div>
                    <div
                        className={`${s.columnName} ${!userInfo.tariff ? '' : s.columnName_active}`}
                    >
                        PRO
                        {userInfo.tariff && (
                            <CheckCircleOutlined
                                style={{ color: '#52C41AFF', marginLeft: '4px' }}
                            />
                        )}
                    </div>
                </div>

                <ul>
                    {benefits.map((item, i) => (
                        <li key={i}>
                            <span>{item}</span>
                            <div className={s.icons}>
                                {i === 0 || i === 2 ? (
                                    <CheckCircleFilled />
                                ) : (
                                    <CloseCircleOutlined style={{ color: '#BFBFBFFF' }} />
                                )}
                                <CheckCircleFilled />
                            </div>
                        </li>
                    ))}
                </ul>

                {!userInfo.tariff && (
                    <div className={s.coast} data-test-id={dataTestId.tariffCost}>
                        <Title className={s.title}> Стоимость тарифа</Title>
                        <Periods
                            tariff={tariffs[0]}
                            selectTariff={selectTariff}
                            setSelectTariff={setSelectTariff}
                        />
                    </div>
                )}
            </div>
        </Drawer>
    );
};
