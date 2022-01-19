import { Input, Tag, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useState, useRef } from "react";

interface IEditableTagGroupProps {
  onChange: (tagList: string[]) => void
  tags: string[]
}

export function EditableTagGroup({ onChange, tags }: IEditableTagGroupProps) {
  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [editInputIndex, setEditInputIndex] = useState<number>(-1)
  const [editInputValue, setEditInputValue] = useState<string>("")
  const enterInputRef = useRef<any>(null)
  const editInputRef = useRef<any>(null)

  const handleInputConfirm = () => {
    let tagsTemp = tags
    if (inputValue && !tags.includes(inputValue)) {
      tagsTemp = [...tags, inputValue]
    }
    onChange(tagsTemp)
    setInputVisible(false)
    setInputValue("")
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    onChange(newTags)
    setEditInputIndex(-1)
    setEditInputValue("")
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
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
              () => onChange(tags.filter(item => item !== tag))
            }
          >
            <span
              onDoubleClick={
                (e) => {
                  if (index !== 0) {
                    e.preventDefault();
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    setTimeout(() => {
                      editInputRef.current.focus()
                    }, 0)
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
            ref={enterInputRef}
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
            onClick={
              () => {
                setInputVisible(true)
                setTimeout(() => {
                  enterInputRef.current.focus()
                }, 0)
              }
            }
          >
            <PlusOutlined /> New Tag
          </Tag>
        )}
    </>
  )
}

