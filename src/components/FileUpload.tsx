import React, { useState, ChangeEvent } from 'react';
//负责处理实际的文件上传到服务器
interface FileUploadProps {
    setUploadedImageUrl: (url: string) => void;
    setUploadedDoctorImageUrl: (url: string) => void;
    setBasicResult: (result: string) => void;
    setDetailedResult: (result: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setUploadedImageUrl, setUploadedDoctorImageUrl, setBasicResult, setDetailedResult }) => {
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
            
            .then(response => {
                console.log('HTTP Response:', response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
            })
            .then(data => {
                console.log('Received data:', data);
                if (data.basic_result && data.detailed_result) {
                    setBasicResult(data.basic_result);
                    setDetailedResult(data.detailed_result);
                } else {
                    console.error('Missing diagnosis results:', data);
                }
            })
            .catch(error => {
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
