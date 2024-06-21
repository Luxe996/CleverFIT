import { loadingAC } from '@redux/reducers/app-reducer';
import { AppDispatch } from '@redux/configure-store';
import { loginAC, setTokenAC } from '@redux/reducers/auth-reducer';
import { feedbacksApi } from '@constants/api';

const GET_FEEDBACKS = 'GET_FEEDBACKS';
const POST_FEEDBACKS = 'POST_FEEDBACKS';

export type FeedbackType = {
    createdAt: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string;
    rating: number;
    id?: string;
};

type InitialStateType = {
    feedbacks: FeedbackType[] | null;
    isError: boolean | null;
    isSuccess: boolean | null;
};

const initialState: InitialStateType = {
    feedbacks: null,
    isError: null,
    isSuccess: null,
};
export const FeedbacksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case GET_FEEDBACKS: {
            return {
                ...state,
                feedbacks: action.feedbacks,
                isError: action.isError,
            };
        }
        case POST_FEEDBACKS: {
            return {
                ...state,
                isSuccess: action.isSuccess,
                isError: action.isError,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionsType = GetFeedbacksAT | PostFeedbacksAT;

// Get Feedbacks
type GetFeedbacksAT = ReturnType<typeof getFeedbacksAC>;
export const getFeedbacksAC = (feedbacks: FeedbackType[] | null, isError: boolean | null) =>
    ({
        type: GET_FEEDBACKS,
        feedbacks,
        isError,
    } as const);
export const getFeedbacksTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await feedbacksApi
        .getFeedbacks()
        .then((res) => {
            dispatch(getFeedbacksAC(res.data.reverse(), null));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            if (rej.response.status === 403) {
                localStorage.removeItem('token');
                dispatch(setTokenAC(''));
                dispatch(loginAC(false));
            }
            dispatch(getFeedbacksAC(null, true));
            dispatch(loadingAC(false));
        });
};

// Post Feedback
type PostFeedbacksAT = ReturnType<typeof postFeedbacksAC>;
export const postFeedbacksAC = (isSuccess: boolean | null, isError: boolean | null) =>
    ({
        type: POST_FEEDBACKS,
        isSuccess,
        isError,
    } as const);
export const postFeedBackTC =
    (rating: number, message: string) => async (dispatch: AppDispatch) => {
        dispatch(loadingAC(true));
        await feedbacksApi
            .postFeedbacks(rating, message)
            .then(() => {
                dispatch(postFeedbacksAC(true, false));
                dispatch(loadingAC(false));
            })
            .catch(() => {
                dispatch(postFeedbacksAC(false, true));
                dispatch(loadingAC(false));
            });
    };
