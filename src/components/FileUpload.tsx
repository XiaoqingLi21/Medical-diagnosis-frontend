import React, { useState, ChangeEvent } from 'react';
//负责处理实际的文件上传到服务器
interface FileUploadProps {
  setUploadedImageUrl: (url: string) => void;
  setUploadedDoctorImageUrl: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setUploadedImageUrl, setUploadedDoctorImageUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log('File uploaded successfully', data);
                // 根据实际情况更新上传图片的URL
                setUploadedImageUrl('path_to_uploaded_image');
                setUploadedDoctorImageUrl('path_to_new_doctor_image');
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
