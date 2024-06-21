import { Button } from 'antd';
import s from './feedback-buttons.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../routes/path';
import { dataTestId } from '@constants/data-test-id';

type FeedbackButtonsType = {
    setModalHandler: () => void;
    setAllFeedsHandler?: () => void;
    showAllFeeds?: boolean;
};

export const FeedbackButtons = ({
    setModalHandler,
    setAllFeedsHandler,
    showAllFeeds,
}: FeedbackButtonsType) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className={s.buttons}>
            <Button
                type='primary'
                onClick={setModalHandler}
                data-test-id={dataTestId.writeReviewButton}
            >
                Написать отзыв
            </Button>
            {pathname === Path.SETTINGS ? (
                <Button
                    type='link'
                    onClick={() => navigate(Path.FEEDBACKS)}
                    data-test-id={dataTestId.allReviewsButton}
                >
                    Смотреть все отзывы
                </Button>
            ) : (
                <Button
                    type='link'
                    onClick={setAllFeedsHandler}
                    data-test-id={dataTestId.allReviewsButton}
                >
                    {showAllFeeds ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            )}
        </div>
    );
};
