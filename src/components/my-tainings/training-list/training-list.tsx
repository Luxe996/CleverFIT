import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import { Badge, Button, Table } from 'antd';
import { getBadgeColor } from '@utils/get-badge-color';
import { ColumnsType } from 'antd/lib/table';
import { setEditTrainingAC, TrainingType } from '@redux/reducers/calendar-reducer';
import { EditOutlined } from '@ant-design/icons';
import { getItemByPeriod } from '@utils/get-period-data';
import { EditTrainingPopover } from '@components/my-tainings/edit-training-popover';
import { dataTestId } from '@constants/data-test-id';
import s from './training-list.module.scss';

type TrainingListType = {
    setIsCreateTraining: (value: boolean) => void;
};

export const TrainingList = ({ setIsCreateTraining }: TrainingListType) => {
    const { trainings, catalogList } = useAppSelector(calendarSelector);
    const dispatch = useAppDispatch();

    const onEditClick = (training: TrainingType) => {
        dispatch(setEditTrainingAC(training));
        setIsCreateTraining(true);
    };

    const tableData: ColumnsType<TrainingType> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_text, training) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        <Badge
                            color={getBadgeColor(training.name)}
                            style={{ marginRight: '8px' }}
                        />
                        {training.name}
                    </span>
                    <EditTrainingPopover training={training} onEditClick={onEditClick} />
                </div>
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (_text, training) => <div>{getItemByPeriod(training.parameters?.period)}</div>,
            sorter: (a, b) => {
                const period1 = a.parameters?.period ?? 0;
                const period2 = b.parameters?.period ?? 0;

                return period1 - period2;
            },
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            width: 20,
            render: (_text, training, index) => (
                <Button
                    type='link'
                    disabled={training.isImplementation}
                    onClick={() => onEditClick(training)}
                    data-test-id={`${dataTestId.updateMyTrainingTableIcon}${index}`}
                >
                    <EditOutlined
                        style={{
                            fontSize: '24px',
                            color: training.isImplementation ? '#bfbfbf' : '',
                        }}
                    />
                </Button>
            ),
        },
    ];
    return (
        <div className={s.container}>
            <Table
                data-test-id={dataTestId.myTrainingsTable}
                columns={tableData}
                dataSource={trainings}
                size='small'
                pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
            />
            {catalogList && (
                <div className={s.addButton}>
                    <Button
                        type='primary'
                        onClick={() => setIsCreateTraining(true)}
                        data-test-id={dataTestId.createNewTrainingButton}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
        </div>
    );
};
