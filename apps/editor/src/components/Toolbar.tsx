import React from "react";
import { useSlate } from "slate-react";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "../utils/editorUtils";
import "./Toolbar.css";

const Toolbar: React.FC = () => {
  const editor = useSlate();

  const MarkButton: React.FC<{ format: string; icon: string }> = ({
    format,
    icon,
  }) => (
    <button
      className={`toolbar-button ${isMarkActive(editor, format) ? "active" : ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </button>
  );

  const BlockButton: React.FC<{ format: string; icon: string }> = ({
    format,
    icon,
  }) => (
    <button
      className={`toolbar-button ${isBlockActive(editor, format) ? "active" : ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </button>
  );

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <MarkButton format="bold" icon="B" />
        <MarkButton format="italic" icon="I" />
        <MarkButton format="underline" icon="U" />
        <MarkButton format="code" icon="</>" />
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <BlockButton format="heading-one" icon="H1" />
        <BlockButton format="heading-two" icon="H2" />
        <BlockButton format="heading-three" icon="H3" />
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <BlockButton format="block-quote" icon="❝" />
        <BlockButton format="bulleted-list" icon="•" />
        <BlockButton format="numbered-list" icon="1." />
      </div>
    </div>
  );
};

export default Toolbar;
