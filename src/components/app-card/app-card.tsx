import { Button, Card, Typography } from 'antd';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type AppCardProps = {
    title: string;
    link: string;
    icon: ReactNode;
    dataTestId?: string;
    path: string;
};

export const AppCard = ({ title, link, icon, dataTestId, path }: AppCardProps) => {
    const navigate = useNavigate();
    const onButtonClick = () => navigate(path);
    return (
        <Card
            headStyle={{ textAlign: 'center', fontSize: '16px' }}
            bodyStyle={{ textAlign: 'center' }}
            size={'small'}
            style={{ maxWidth: '328px' }}
            title={<Typography.Text>{title}</Typography.Text>}
        >
            <Button
                type={'link'}
                icon={icon}
                style={{ color: '--primaryLight6' }}
                data-test-id={dataTestId}
                onClick={onButtonClick}
            >
                {link}
            </Button>
        </Card>
    );
};
