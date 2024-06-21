import { TagsPanel } from '@components/achievements/tags-panel';
import { getChartData } from '@utils/get-chart-data';
import { Column, Pie } from '@ant-design/plots';
import { columnConfig } from '@utils/column-config';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { LoadHistory } from '@components/achievements/load-history';
import s from './achievements.module.scss';
import { LoadInfo } from '@components/achievements/load-info';
import { FrequentTraining } from '@components/achievements/frequent-training';
import { pieConfig } from '@utils/pie-config';
import { FrequentExercises } from '@components/achievements/frequent-exercises';
import { EmptyTraining } from '@components/achievements/empty-training';

type AchievementsType = {
    activeTab: string;
    keys: Record<string, string>;
    selectTraining: string;
    setSelectTraining: (value: string) => void;
};
export const Achievements = ({
    activeTab,
    keys,
    selectTraining,
    setSelectTraining,
}: AchievementsType) => {
    const { xs } = useBreakpoint();
    const { trainings } = useAppSelector(calendarSelector);
    const {
        data,
        mostFrequentExercise,
        mostFrequentTraining,
        filteredArray,
        selectedPeriodTrainings,
    } = getChartData({
        trainings,
        activeTab,
        keys,
        selectTraining,
    });
    return (
        <div className={s.container}>
            <TagsPanel selectTraining={selectTraining} setSelectTraining={setSelectTraining} />
            {selectedPeriodTrainings?.length === 0 ? (
                <EmptyTraining keys={keys} activeTab={activeTab} />
            ) : (
                <>
                    <div className={`${s.charts} ${activeTab === keys.month ? s.chartsMonth : ''}`}>
                        <div className={s.chart}>
                            <Column {...columnConfig(data, xs, activeTab, keys)} />
                        </div>
                        <LoadHistory keys={keys} activeTab={activeTab} data={data} xs={xs} />
                    </div>
                    <LoadInfo data={data} />
                    <FrequentTraining
                        selectTraining={selectTraining}
                        mostFrequentExercise={mostFrequentExercise}
                        mostFrequentTrainingName={mostFrequentTraining.name}
                    />
                    <div className={s.charts}>
                        <div className={s.pie}>
                            <Pie key={activeTab} {...pieConfig(filteredArray, xs)} />
                        </div>
                        <FrequentExercises data={data} keys={keys} activeTab={activeTab} />
                    </div>
                </>
            )}
        </div>
    );
};
