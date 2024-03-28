import { useState } from "react";
import { BaseDropzone } from "../PortfolioItem/Dropzone";
import { Button, Input, Textarea } from "@mantine/core";
import { useCreatePortfolioItem } from "./mutations";

export default function NewPortfolioItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portfolioImage, setPortfolioImage] = useState<string | null>(null);
  const [portfolioLogoImage, setPortfolioLogoImage] = useState<string | null>(
    null
  );

  const { mutate } = useCreatePortfolioItem();

  return (
    <>
      <div className="text-2xl font-semibold mb-5">Новое</div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-5">
          <BaseDropzone
            image={portfolioLogoImage}
            onImageUpload={(file) => setPortfolioLogoImage(file)}
            placeholder="Перетащите сюда фотографию логотипа или нажмите"
          />
          <BaseDropzone
            image={portfolioImage}
            onImageUpload={(file) => setPortfolioImage(file)}
            placeholder="Перетащите сюда фотографию портфолио"
          />
        </div>
        <div className="col-span-2 space-y-5">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название"
            />
          </div>
          <div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              resize="vertical"
              className="min-h-[150px]"
              placeholder="Описание"
            />
          </div>
          <Button
            onClick={() => {
              mutate({
                name,
                description,
                portfolioImage: portfolioImage!,
                portfolioLogoImage: portfolioLogoImage!,
                orderCode: 0,
              });
            }}
            disabled={
              !name || !description || !portfolioImage || !portfolioLogoImage
            }
          >
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
}
