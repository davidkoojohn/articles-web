import { Input, Tag, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import {useEffect, useState} from "react";

interface IEditableTagGroupProps {
  onChange: (tagList: string[]) => void
}

export function EditableTagGroup({ onChange }: IEditableTagGroupProps) {
  const [tags, setTags] = useState<string[]>(['Unremovable', 'Tag 2', 'Tag 3'])
  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [editInputIndex, setEditInputIndex] = useState<number>(-1)
  const [editInputValue, setEditInputValue] = useState<string>("")
  const [input] = useState()
  const [editInput] = useState()

  useEffect(() => {
    onChange(tags)
  }, [tags])

  const handleInputConfirm = () => {
    let tagsTemp = tags
    if (inputValue && !tags.includes(inputValue)) {
      tagsTemp = [...tags, inputValue]
    }
    setTags(tagsTemp)
    setInputVisible(false)
    setInputValue("")
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;

    setTags(newTags)
    setEditInputIndex(-1)
    setEditInputValue("")
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInput}
              key={tag}
              size="small"
              style={{ width: "78px", marginRight: "8px", verticalAlign: "top" }}
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            style={{ userSelect: "none" }}
            key={tag}
            closable={index !== 0}
            onClose={
              () => setTags(tags.filter(item => item !== tag))
            }
          >
            <span
              onDoubleClick={
                (e) => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault();
                  }
                }
              }
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag
          ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          )
          : tagElem;
      })}

      {inputVisible
        ? (
          <Input
            ref={input}
            type="text"
            size="small"
            style={{ width: "78px", marginRight: "8px", verticalAlign: "top" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )
        : (
          <Tag
            style={{ backgroundColor: "#fff", borderStyle: "dashed" }}
            onClick={() => setInputVisible(true)}
          >
            <PlusOutlined /> New Tag
          </Tag>
        )}
    </>
  )
}

