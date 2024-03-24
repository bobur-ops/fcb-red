// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import Image from "@editorjs/image";
// import List from "@editorjs/list";
// import Embed from "@editorjs/embed";
// import Link from "@editorjs/link";
// import Quote from "@editorjs/quote";

import { useEffect, useRef } from "react";

interface EditorComponentProps {
  placeholder?: string;
  editorId: string;
  defaultData?: string;
  onChange?: (data: any) => void;
  value: any;
}

const EditorComponent = ({
  placeholder,
  editorId,
  defaultData,
  onChange,
}: EditorComponentProps) => {
  const ejInstance = useRef<EditorJS | null>(null);
  let editor: any = { isReady: false };
  console.log(defaultData);

  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: defaultData?.blocks || [],
  };

  const initEditor = () => {
    editor = new EditorJS({
      holder: editorId,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: false,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const content = await editor.saver.save();
        onChange(content);
      },
      tools: {
        // header: Header,
        // image: Image,
        // list: List,
        // embed: Embed,
        // link: Link,
        // quote: Quote,
      },
      placeholder: placeholder || "Type something...",
    });
  };

  useEffect(() => {
    if (!editor.isReady) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        id={editorId}
        style={{ width: "100%", fontFamily: "CodeNext" }}
      ></div>
    </div>
  );
};

export default EditorComponent;
