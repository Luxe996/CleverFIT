import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import {
    AppReducer,
    AuthReducer,
    CalendarReducer,
    FeedbacksReducer,
    UserReducer,
} from '@redux/reducers';
import { SettingsReducer } from '@redux/reducers/settings-reducer';
import { TrainigsReducer } from '@redux/reducers/trainigs-reducer.ts';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        app: AppReducer,
        auth: AuthReducer,
        feedbacks: FeedbacksReducer,
        calendar: CalendarReducer,
        user: UserReducer,
        settings: SettingsReducer,
        trainigs: TrainigsReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
