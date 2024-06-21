import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsSelector } from '../../../selectors/selectors.ts';
import { List, Space, Typography } from 'antd';
import s from './partners-list.module.scss';
import { PartnersCard } from '@components/group-trainings/partners-card';
import { useState } from 'react';
import { ModalInfo } from '@components/group-trainings/modal-info';
import { deleteTrainingTC, PartnerType } from '@redux/reducers/trainigs-reducer.ts';

export const PartnersList = () => {
    const dispatch = useAppDispatch();
    const { partners } = useAppSelector(trainingsSelector);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState({} as PartnerType);

    const onOpenModal = () => {
        setOpenModal(true);
    };
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const deleteTraining = (id: string) => {
        dispatch(deleteTrainingTC(id));
    };
    return (
        <>
            <div className={s.partners}>
                <Typography.Title level={4}>Мои партнёры по тренировкам</Typography.Title>
                {partners.length ? (
                    <Space onClick={onOpenModal}>
                        <List
                            dataSource={partners}
                            renderItem={(partner, index) => (
                                <PartnersCard
                                    isMyPartner={true}
                                    partner={partner}
                                    index={index}
                                    setSelectPartner={setSelectedPartner}
                                />
                            )}
                        />
                    </Space>
                ) : (
                    <Typography.Text>
                        У вас пока нет партнёров для совместных тренировок
                    </Typography.Text>
                )}
            </div>
            <ModalInfo
                isOpen={openModal}
                onClose={onCloseModal}
                partner={selectedPartner}
                deleteTraining={deleteTraining}
            />
        </>
    );
};
