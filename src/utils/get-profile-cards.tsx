import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { TariffType } from '@redux/reducers/settings-reducer';
import { UserInfoType } from '@redux/reducers/user-reducer';

const freeTariff = {
    name: 'Free',
    periods: [
        {
            text: 'infinity',
            cost: 0,
            days: 0,
        },
    ],
    _id: 'Free',
};

export const getProfileCards = (
    tariffs: TariffType[],
    userInfo: UserInfoType,
    setIsDrawerOpen: (value: boolean) => void,
    s: { [key: string]: string },
) => {
    const listCardsTariffs = [freeTariff, tariffs[0]];

    return listCardsTariffs.map((tariffV) => (
        <Card
            data-test-id={`${tariffV?.name === 'Pro' && 'pro-tariff-card'}`}
            key={tariffV?._id}
            className={s.tarif}
            title={
                <>
                    <span> {tariffV?.name.toUpperCase()} tariff</span>
                    <Button type='link' onClick={() => setIsDrawerOpen(true)}>
                        Подробнее
                    </Button>
                </>
            }
        >
            {tariffV?.name === 'Free' ? (
                <>
                    <img alt='tarif_image' className={s.image} src={'/public/free-tarif.svg'} />
                    <div className={s.status}>
                        <p>активен {<CheckOutlined />}</p>
                    </div>
                </>
            ) : (
                <>
                    <img
                        alt='tarif_image'
                        className={s.image}
                        src={userInfo.tariff ? '/public/proAble.svg' : '/public/proDisable.svg'}
                    />
                    <div className={s.status}>
                        {userInfo.tariff ? (
                            <span>
                                активен <br /> до {moment(userInfo.tariff?.expired).format('DD.MM')}
                            </span>
                        ) : (
                            <Button
                                data-test-id='activate-tariff-btn'
                                type={'primary'}
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                Активировать
                            </Button>
                        )}
                    </div>
                </>
            )}
        </Card>
    ));
};
