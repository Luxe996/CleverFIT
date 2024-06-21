import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Path } from '../../routes/path';
import { getPathName } from '@utils/path-names';
import s from './custom-breadcrumb.module.scss';

type CustomBreadcrumbType = {
    isMain: boolean;
    isProfile: boolean;
    isSettings: boolean;
};
export const CustomBreadcrumb = ({ isMain, isProfile, isSettings }: CustomBreadcrumbType) => {
    const { pathname } = useLocation();

    const pathNames = pathname.split('/').filter((path) => path);
    return isProfile || isSettings ? null : (
        <Breadcrumb className={s.breadcrums}>
            <Breadcrumb.Item>
                <Link to={Path.MAIN}>{getPathName(Path.MAIN)}</Link>
            </Breadcrumb.Item>
            {!isMain &&
                pathNames.map((name, i) => {
                    const to = `/${pathNames.slice(0, i + 1).join('/')}`;
                    const label = getPathName(`/${name}`);
                    return (
                        <Breadcrumb.Item key={to}>
                            <Link to={to}>{label}</Link>
                        </Breadcrumb.Item>
                    );
                })}
        </Breadcrumb>
    );
};
