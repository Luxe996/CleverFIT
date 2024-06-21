import { useEffect, useState } from 'react';
import { Upload, Modal, UploadProps, Button } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { baseURL, getImageURL } from '@constants/api';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, userSelector } from '../../selectors/selectors';
import { Endpoints } from '@constants/endpoint-names';

type CustomUploadType = {
    setIsButtonDisabled: (value: boolean) => void;
    modalError: (isError: boolean) => void;
    newAvatar: (url: string) => void;
};
export const CustomUpload = ({ setIsButtonDisabled, modalError, newAvatar }: CustomUploadType) => {
    const { userInfo } = useAppSelector(userSelector);
    const { storeToken } = useAppSelector(authSelector);
    const { xs } = useBreakpoint();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);

    const tokenForHeader = localStorage.getItem('token') || storeToken;

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        const newFile = newFileList[0];

        if (!newFile) return;

        const isError = newFile.status === 'error';
        modalError(isError);
        setIsButtonDisabled(isError);

        if (!newFile.response) return;

        if (newFile.response.url) {
            const url = `${getImageURL}${newFile.response.url}`;
            setFileList([{ uid: '1', name: newFile.response.name, url }]);
            newAvatar(url);
            setIsButtonDisabled(false);
        } else {
            setFileList([{ uid: '1', url: '', name: newFile.name, status: 'error' }]);
            setIsButtonDisabled(true);
        }
    };

    const handleRemove = (file: UploadFile) => {
        if (file) {
            setFileList([]);
            newAvatar('');
        }
        setIsButtonDisabled(false);
    };

    const uploadButton = (
        <div>
            {xs ? <Button icon={<UploadOutlined />}>Загрузить</Button> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Загрузить фото профиля
            </div>
        </div>
    );

    const uploadProps = {
        action: `${baseURL}${Endpoints.user.upload}`,
        headers: { Authorization: `Bearer ${tokenForHeader}` },
        onChange: handleChange,
        listType: xs ? 'picture' : 'picture-card',
        fileList: fileList,
        maxCount: 1,
        onPreview: () => setPreviewVisible(true),
        onRemove: handleRemove,
        locale: {
            uploading: 'Загрузка...',
        },
    };

    useEffect(() => {
        if (userInfo.imgSrc) {
            setFileList([{ uid: '1', name: 'Picture', url: `${userInfo.imgSrc}` }]);
        }
    }, [userInfo.imgSrc]);

    return (
        <>
            <Upload {...uploadProps}>{fileList.length === 0 && uploadButton}</Upload>

            <Modal
                open={previewVisible}
                title={fileList[0]?.name || 'Picture'}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt='Превью' style={{ width: '100%' }} src={fileList[0]?.url} />
            </Modal>
        </>
    );
};
