import { Form, Input, Button, Space, Upload, message } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { EditableTagGroup } from "./components/EditableTagGroup"

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function ArticleCreate() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])

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
        setImageUrl(imageUrl)
        setLoading(false)
      });
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    console.log(info)
  };

  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFill = () => {
    console.log(form)
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h1>Admin Article Create</h1>
      <Form
        form={form}
        layout="horizontal"
        labelAlign={"right"}
        labelCol={{ span: 3 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true }, { type: 'string', min: 6, max: 30 }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述信息"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入描述信息" />
        </Form.Item>
        <Form.Item
          name="poster"
          label="封面"
          rules={[{ required: true }]}
        >
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
        </Form.Item>
        <Form.Item
          name="tags"
          label="标签"
        >
          <EditableTagGroup onChange={(tagList) => setTags(tagList)}/>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onFill}>
              Fill
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
