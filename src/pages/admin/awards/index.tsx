import { Button, Loader, TextInput } from "@mantine/core";
import { useGetAwards } from "./queries";
import { useState } from "react";
import { useCreateAward, useDeleteAward, useUpdateAward } from "./mutations";

const AwardComponent = ({
  data,
  orderCode,
}: {
  data?: any;
  orderCode: number;
}) => {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [name, setName] = useState(data?.name || "");

  const { mutate: createMutation } = useCreateAward();
  const { mutate: deleteMutation } = useDeleteAward();
  const { mutate: updateMutation } = useUpdateAward();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFileName(file?.name || "");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <TextInput
            defaultValue={data?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите..."
          />
        </div>
        <div className="relative">
          <input
            className="absolute w-full h-full left-0 top-0 z-10 opacity-0"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button>{selectedFileName || "Выберите фотографию"}</Button>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {data && (
          <Button
            onClick={() => {
              deleteMutation(data.id);
            }}
            color="red"
          >
            Удалить
          </Button>
        )}
        <Button
          onClick={() => {
            if (data) {
              updateMutation({
                id: data.id,
                name,
                orderCode,
                awardImage: imageBase64 || data.awardImage,
              });
            } else {
              createMutation({ name, orderCode, awardImage: imageBase64 });
              setName("");
            }
          }}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default function AwardsPage() {
  const { data: awards, isLoading } = useGetAwards();

  console.log(awards);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mb-10">
        <div className="text-2xl font-semibold">Награды</div>
      </div>
      <div className="space-y-10">
        {awards?.map((item: any) => (
          <>
            <AwardComponent orderCode={item.orderCode} data={item} />
          </>
        ))}
        <AwardComponent orderCode={awards.length + 1} />
      </div>
    </>
  );
}
