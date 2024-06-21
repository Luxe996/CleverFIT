import { Button, Layout, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import s from './not-found-page.module.scss';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Layout className={s.container}>
            <Result
                status='404'
                title='Такой страницы нет'
                subTitle='Извините, страница не найдена, возможно она была удалена или перемещена.'
                extra={
                    <Button type='primary' onClick={() => navigate(Path.MAIN)}>
                        На главную
                    </Button>
                }
            />
        </Layout>
    );
};
