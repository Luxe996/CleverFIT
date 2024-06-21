import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { history, store } from '@redux/configure-store';
import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';
import { HistoryRouter } from 'redux-first-history/rr6';
import { routes } from './routes/routes';
import { CustomAlert } from '@components/profile/custom-alert';
import { PortalLoader } from '@components/portal-loader';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            <CustomAlert />
            <PortalLoader />
        </Provider>
    </React.StrictMode>,
);
