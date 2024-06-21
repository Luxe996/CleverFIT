import Clever from '@public/clever.svg?react';
import Fit from '@public/fit.svg?react';
import s from './logo.module.scss';
import { Path } from '../../routes/path';

import { Link } from 'react-router-dom';

type LogoProps = {
    isCollapsed: boolean;
};
export const Logo = ({ isCollapsed }: LogoProps) => (
    <div className={isCollapsed ? s.collapsed : s.logo}>
        <Link to={Path.MAIN}>
            {isCollapsed ? (
                <Fit className={s.fit} />
            ) : (
                <div className={s.full}>
                    <Clever className={s.clever} />
                    <Fit className={s.fit} />
                </div>
            )}
        </Link>
    </div>
);
