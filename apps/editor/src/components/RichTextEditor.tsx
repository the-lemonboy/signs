import React, { useMemo, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Element as SlateElement,
  Text as SlateText,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import Toolbar from "./Toolbar";
import Element from "./Element";
import Leaf from "./Leaf";
import "./RichTextEditor.css";

// 定义自定义类型
declare module "slate" {
  interface CustomTypes {
    Editor: typeof createEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type CustomElement = {
  type:
    | "paragraph"
    | "heading-one"
    | "heading-two"
    | "heading-three"
    | "block-quote"
    | "bulleted-list"
    | "numbered-list"
    | "list-item";
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "欢迎使用富文本编辑器！开始输入内容..." }],
  },
];

const RichTextEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );

  return (
    <div className="rich-text-editor">
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar />
        <div className="editor-container">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="开始输入内容..."
            className="editor-content"
            spellCheck
            autoFocus
          />
        </div>
      </Slate>
    </div>
  );
};

export default RichTextEditor;
