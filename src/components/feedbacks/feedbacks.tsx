import s from './feedbacks.module.scss';
import { CustomCard } from '@components/feedbacks/card/card';
import { useState } from 'react';
import { FeedbackType } from '@redux/reducers/feedbacks-reducer';
import { FeedbackButtons } from '@components/feedbacks/feedback-buttons';

type FeedbacksPropsType = {
    feedbacks: FeedbackType[];
    setModalHandler: () => void;
};

export const Feedbacks = ({ feedbacks, setModalHandler }: FeedbacksPropsType) => {
    const [showAllFeeds, setShowAllFeeds] = useState(false);
    const setAllFeedsHandler = () => setShowAllFeeds((pervState) => !pervState);

    const displayedFeedbacks = showAllFeeds ? feedbacks : feedbacks.slice(0, 4);

    return (
        <div className={s.container}>
            <div className={s.cards}>
                {displayedFeedbacks.map((f) => (
                    <CustomCard
                        key={f.id}
                        imageSrc={f.imageSrc}
                        fullName={f.fullName}
                        message={f.message}
                        rating={f.rating}
                        createdAt={f.createdAt}
                    />
                ))}
            </div>
            <FeedbackButtons
                setModalHandler={setModalHandler}
                setAllFeedsHandler={setAllFeedsHandler}
                showAllFeeds={showAllFeeds}
            />
        </div>
    );
};
