import { Avatar, Button, Col, Modal, Row } from 'antd';
import { CheckCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { dataTestId } from '@constants/data-test-id.ts';
import { PartnerType } from '@redux/reducers/trainigs-reducer.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import s from './modal-info.module.scss';

type ModalInfoType = {
    partner: PartnerType;
    isOpen: boolean;
    onClose: () => void;
    deleteTraining: (id: string) => void;
};

export const ModalInfo = ({ partner, isOpen, onClose, deleteTraining }: ModalInfoType) => {
    const { xs } = useBreakpoint();
    const onDeleteClick = () => {
        deleteTraining(partner.inviteId);
        onClose();
    };
    return (
        <Modal
            data-test-id={dataTestId.modalInfo}
            style={{ padding: 0 }}
            open={isOpen}
            centered={true}
            onCancel={onClose}
            footer={null}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
        >
            <>
                <Row className={s.partnerInfo}>
                    <Col span={xs ? 20 : 12}>
                        <Avatar size={42} src={partner.imageSrc} icon={<UserOutlined />} />
                        <span style={{ marginLeft: '8px' }}>{partner.name}</span>
                    </Col>
                    <Col sm={{ span: 10 }} xs={{ span: 20 }} className={s.trainingInfo}>
                        <Col span={15} className={s.trainingTitle}>
                            <div>Тип тренировки:</div>
                            <div>Средняя нагрузка:</div>
                        </Col>
                        <Col span={12} className={s.trainingValue}>
                            <div>{partner.trainingType}</div>
                            <div>{partner.avgWeightInWeek} кг/нед</div>
                        </Col>
                    </Col>
                </Row>
                <Row className={s.statusBlock}>
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} className={s.status}>
                        тренировка одобрена
                        <CheckCircleTwoTone twoToneColor='#52c41a' />
                    </Col>
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} style={{ width: '100%' }}>
                        <Button
                            block
                            style={{ border: '1px solid #D9D9D9' }}
                            onClick={onDeleteClick}
                        >
                            Отменить тренировку
                        </Button>
                    </Col>
                </Row>
            </>
        </Modal>
    );
};
