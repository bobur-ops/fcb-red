import { Button, Loader, Textarea } from "@mantine/core";
import { useGetAwards } from "./queries";
import { useState } from "react";
import { useCreateAward, useDeleteAward, useUpdateAward } from "./mutations";
import { BaseDropzone } from "../portfolio/PortfolioItem/Dropzone";

const AwardComponent = ({
  data,
  orderCode,
}: {
  data?: any;
  orderCode: number;
}) => {
  const [name, setName] = useState(data?.name || "");
  const [image, setImage] = useState<string | null>(data?.imageUrl || null);

  const { mutate: createMutation } = useCreateAward();
  const { mutate: deleteMutation } = useDeleteAward();
  const { mutate: updateMutation } = useUpdateAward();

  return (
    <div className="space-y-5">
      <div className="">
        <BaseDropzone
          image={image}
          onImageUpload={(value) => setImage(value)}
          dropzoneClassname="h-[250px] flex items-center justify-center"
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <Textarea
            resize="vertical"
            defaultValue={data?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите..."
          />
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
                awardImage: image as string,
              });
            } else {
              createMutation({ name, orderCode, awardImage: image as string });
              setName("");
              setImage(null);
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
      <div className="grid grid-cols-3 gap-5">
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
