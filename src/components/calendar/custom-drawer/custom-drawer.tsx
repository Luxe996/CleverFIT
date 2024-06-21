import { getBadgeColor } from '@utils/get-badge-color';
import moment, { Moment } from 'moment';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Badge, Button, Drawer } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Exercise } from '@components/calendar/custom-drawer/exercise';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../../selectors';
import { useDrawer } from '@hooks/use-drawer';
import s from './custom-draver.module.scss';
import { dayFormat } from '@constants/date';
import { dataTestId } from '@constants/data-test-id';

type CustomDrawerProps = {
    date: Moment;
    selectTraining: string;
    isCreateTraining: boolean;
    setIsCreateTraining: (createTraining: boolean) => void;
};
export const CustomDrawer = ({
    date,
    selectTraining,
    isCreateTraining,
    setIsCreateTraining,
}: CustomDrawerProps) => {
    const { editTraining } = useAppSelector(calendarSelector);
    const { xs } = useBreakpoint();
    const badgeColor = getBadgeColor(selectTraining);

    const {
        exerciseBlocks,
        handleInputChange,
        handleAddExerciseBlock,
        showDeleteButton,
        handleDeleteExerciseBlock,
        handleDrawerClose,
    } = useDrawer(selectTraining, setIsCreateTraining, true, date);

    const isDeleteDisabled = !exerciseBlocks.some((exercise) => exercise.isImplementation);
    const isPastDate = date.isSameOrBefore(moment(), 'day');

    const setTitle = () => {
        if (!editTraining || editTraining.name !== selectTraining) {
            return (
                <>
                    <PlusOutlined style={{ marginRight: '8px' }} />
                    <span>Добавление упражнений</span>
                </>
            );
        }
        if (editTraining.isImplementation === true) {
            return <span>Просмотр упражнений</span>;
        }
        return (
            <>
                <EditOutlined style={{ marginRight: '8px' }} />
                <span>Редактирование</span>
            </>
        );
    };

    return (
        <Drawer
            data-test-id={dataTestId.modalDrawerRight}
            className={s.container}
            closeIcon={<CloseOutlined data-test-id={dataTestId.modalDrawerRightButtonClose} />}
            title={setTitle()}
            placement={xs ? 'bottom' : 'right'}
            height={xs ? '80%' : '100%'}
            open={isCreateTraining}
            onClose={handleDrawerClose}
        >
            <div>
                <div className={s.content}>
                    <div>
                        <Badge color={badgeColor} style={{ marginRight: '8px' }} />
                        {selectTraining}
                    </div>
                    {date.format(dayFormat)}
                </div>
                {exerciseBlocks.map((exercise, index) => (
                    <Exercise
                        key={index}
                        exercise={exercise}
                        index={index}
                        selectTraining={selectTraining}
                        handleInputChange={handleInputChange}
                    />
                ))}
                <div className={s.buttons}>
                    <Button type='link' onClick={handleAddExerciseBlock}>
                        <PlusOutlined style={{ color: '#2B4ACBFF' }} /> <span>Добавить ещё</span>
                    </Button>
                    {showDeleteButton && (
                        <Button
                            type='text'
                            onClick={handleDeleteExerciseBlock}
                            disabled={isDeleteDisabled}
                        >
                            <MinusOutlined
                                style={{
                                    color: isDeleteDisabled ? '#BFBFBFFF' : '#262626FF',
                                }}
                            />
                            <span>Удалить</span>
                        </Button>
                    )}
                </div>
            </div>

            {isPastDate && (
                <div className={s.placeholder}>
                    После сохранения внесенных изменений отредактировать проведенную тренировку
                    будет невозможно
                </div>
            )}
        </Drawer>
    );
};
