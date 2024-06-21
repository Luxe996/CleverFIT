import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { dataTestId } from '@constants/data-test-id';
import { Button, Modal } from 'antd';
import { catalogTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { getJointPartnersTC, setErrorAC } from '@redux/reducers/trainigs-reducer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector, trainingsSelector, userSelector } from '../../../selectors/selectors';
import { isSuccessAC } from '@redux/reducers/user-reducer';
import s from './error-modal.module.scss';

type ErrorModalType = {
    title: string;
    description: string;
    dataTestContent: string;
    dataTestDescription: string;
    dataTestButton: string;
    isImageError?: boolean;
    setIsImageError?: (value: boolean) => void;
};
export const ErrorModal = ({
    title,
    description,
    dataTestContent,
    dataTestDescription,
    dataTestButton,
    isImageError,
    setIsImageError,
}: ErrorModalType) => {
    const dispatch = useAppDispatch();
    const { isCatalogError, createError } = useAppSelector(calendarSelector);
    const { isError } = useAppSelector(trainingsSelector);
    const { isSaveSuccess } = useAppSelector(userSelector);

    const isOpen =
        isCatalogError || createError || isError || isImageError || isSaveSuccess === false;

    const cancelModal = () => {
        dispatch(ResetStateAC());
        if (isError) {
            dispatch(setErrorAC(false));
        }
        if (isImageError && setIsImageError) {
            setIsImageError(false);
        }
        if (isSaveSuccess === false) {
            dispatch(isSuccessAC(null));
        }
    };

    const getCatalog = () => {
        dispatch(ResetStateAC());
        if (isError) {
            dispatch(getJointPartnersTC());
        } else {
            dispatch(catalogTC());
        }
    };
    return (
        <Modal
            open={isOpen}
            onCancel={cancelModal}
            footer={null}
            centered
            maskStyle={{ background: '#799CD41A', backdropFilter: 'blur(5px)' }}
            closeIcon={
                <CloseOutlined data-test-id={dataTestId.modalErrorUserTrainingButtonClose} />
            }
        >
            <div className={s.error}>
                <CloseCircleOutlined
                    style={{
                        color: '#2F54EBFF',
                        fontSize: '24px',
                    }}
                />
                <div className={s.content}>
                    <p className={s.title} data-test-id={dataTestContent}>
                        {title}
                    </p>
                    <p className={s.description} data-test-id={dataTestDescription}>
                        {description}
                    </p>
                    <Button
                        className={s.btn}
                        data-test-id={dataTestButton}
                        type='primary'
                        onClick={isCatalogError || isError ? getCatalog : cancelModal}
                    >
                        {isCatalogError || isError ? 'Обновить' : 'Закрыть'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
