import { Button, Card } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import s from './footer-card.module.scss';

export const FooterCard = () => (
    <Card
        className={s.card}
        bodyStyle={{ padding: '12px 0', textAlign: 'center' }}
        title={
            <div className={'footer-card-title'}>
                <Button size={'large'} type={'link'}>
                    Скачать на телефон
                </Button>
                <p
                    style={{
                        fontSize: '14px',
                        color: 'rgba(140, 140, 140, 1)',
                        textAlign: 'center',
                    }}
                >
                    {' '}
                    Доступно в Pro-тарифе
                </p>
            </div>
        }
    >
        <Button size={'small'} type={'link'} style={{ color: '#000' }} icon={<AndroidFilled />}>
            Android OS
        </Button>
        <Button size={'small'} type={'link'} style={{ color: '#000' }} icon={<AppleFilled />}>
            Apple OS
        </Button>
    </Card>
);
