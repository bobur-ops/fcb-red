import { Button, Loader } from "@mantine/core";
import EditorComponent from "./components/EditorComponent";
import { useGetTexts } from "./queries";
import { useCreateText, useDeleteText, useUpdateText } from "./mutations";
import { useState } from "react";

const TextChangeComponent = ({ data }: { data?: any }) => {
  const [text, setText] = useState<any>(data?.text || []);
  const { mutate } = useCreateText();
  const { mutate: updateMutation } = useUpdateText();
  const { mutate: deleteMutation } = useDeleteText();

  const handleUpload = () => {
    mutate({ text: text, type: "additional" });
    setText([]);
  };

  const handleUpdate = () => {
    if (!data) return;
    updateMutation({ text, id: data.id });
  };

  return (
    <div className="">
      <div className="p-5 border mb-2">
        <EditorComponent
          defaultData={JSON.parse(data?.text || "[]")}
          onChange={(value) => setText(value)}
          editorId={`editor-data-${data?.id}` || "editor-js"}
          placeholder="Пишиите текст..."
        />
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button
          onClick={() => {
            if (data) {
              handleUpdate();
            } else {
              handleUpload();
            }
          }}
        >
          Сохранить
        </Button>
        {!!data && (
          <Button onClick={() => deleteMutation(data?.id)} color="red">
            Удалить
          </Button>
        )}
      </div>
    </div>
  );
};

export default function TextsPage() {
  const [mainText, setMainText] = useState<any>();

  const { data, isLoading, isError } = useGetTexts();
  const { mutate } = useCreateText();

  const handleUploadMainText = () => {
    mutate({ text: mainText, type: "main" });
  };
  const { mutate: updateMutation } = useUpdateText();

  const handleUpdate = () => {
    if (!data) return;
    updateMutation({
      text: mainText,
      id: data?.find((item: any) => item.type === "main")?.id,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <div>Ошибка</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <div className="mb-2 flex justify-between items-center">
          <div className="text-2xl mb-2">Основной текст</div>
          <div className="">
            <Button
              onClick={() => {
                if (data?.find((item: any) => item.type === "main")) {
                  handleUpdate();
                } else {
                  handleUploadMainText();
                }
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
        <div className="p-5 border">
          <EditorComponent
            defaultData={JSON.parse(
              data?.find((item: any) => item.type === "main")?.text || "[]"
            )}
            onChange={(value) => setMainText(value)}
            editorId="mainEditor"
            placeholder="Главный текст"
          />
        </div>
      </div>
      <div className="">
        <div className="space-y-5">
          <div className="mb-5 text-2xl">Дополнительные текста</div>
          {data?.map((item: any) => (
            <>
              {item.type !== "main" && (
                <>
                  <TextChangeComponent data={item} />
                </>
              )}
            </>
          ))}
          <TextChangeComponent />
        </div>
      </div>
    </>
  );
}
