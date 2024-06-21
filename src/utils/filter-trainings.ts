import moment from 'moment/moment';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import { Moment } from 'moment';
import { dateFormat } from '@constants/date';

export const filterTrainings = (trainings: TrainingType[], date: Moment) => {
    return trainings.filter((training) => {
        const trainingDate = moment(training.date).format(dateFormat);
        return trainingDate === date.format(dateFormat);
    });
};
