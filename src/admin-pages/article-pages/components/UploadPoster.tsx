import { useState } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../utils/getBase64"

interface IUploadPosterProps {
  onChange: (img: string) => void
  imageUrl?: string
}
export function UploadPoster({ onChange, imageUrl = "" }: IUploadPosterProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const beforeUpload = (file: File) => {
    setLoading(true)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      setLoading(false)
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      setLoading(false)
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (imageUrl: string) => {
        onChange(imageUrl)
        setLoading(false)
      });
    }
    // return isJpgOrPng && isLt2M;
    return false;
  }

  const handleChange = (info: any) => {
    // console.log(info)
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        name="poster"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl
          ? <img src={imageUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : uploadButton}
      </Upload>
    </div>
  )
}
