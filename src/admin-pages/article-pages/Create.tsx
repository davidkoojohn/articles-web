import { Form, Input, Button, Space, message } from "antd"
import { useEffect, useState } from "react";
import { EditableTagGroup } from "./components/EditableTagGroup"
import { UploadPoster } from "./components/UploadPoster"

export default function ArticleCreate() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>(["固定不能删", "你大爷"])
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

  useEffect(() => {
    console.log(tags)
  }, [tags])

  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFill = () => {
    console.log(form)
  };

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
          <UploadPoster onChange={(img) => setImageUrl(img)} imageUrl={imageUrl} />
        </Form.Item>
        <Form.Item
          name="tags"
          label="标签"
        >
          <EditableTagGroup
            onChange={(tagList) => setTags(tagList)}
            tags={tags}
          />
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
