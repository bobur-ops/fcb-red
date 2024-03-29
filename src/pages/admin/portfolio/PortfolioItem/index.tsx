import { useParams } from "react-router-dom";
import {
  CategoryInterface,
  useGetPortfolioCategories,
  useGetPortfolioItem,
} from "./queries";
import { Button, Input, Loader, Textarea } from "@mantine/core";
import { BaseDropzone } from "./Dropzone";
import { useEffect, useState } from "react";
import {
  useCreateCategory,
  useDeleteCategory,
  useDeletePortfolioItem,
  useUpdateCategory,
  useUpdatePortfolio,
} from "./mutations";
import { BiTrash } from "react-icons/bi";

interface CategoryComponentProps {
  portfolioId: string;
  data?: CategoryInterface;
}

const CategoryComponent = ({ portfolioId, data }: CategoryComponentProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setImages(data.images.map((image) => image.image));
      setName(data.name);
    }
  }, [data]);

  const { mutate } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleSubmit = () => {
    if (!data) {
      mutate({
        portfolioId,
        name,
        orderCode: 0,
        files: images.map((image) => ({ image })),
      });

      setName("");
      setImages([]);

      return;
    }

    updateCategory({
      id: data.id,
      name,
      orderCode: data.orderCode,
      images: images.map((image) => ({ image })),
    });
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <Input
            placeholder="Название категории..."
            className="min-w-[300px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button disabled={!name || !images.length} onClick={handleSubmit}>
            Сохранить
          </Button>
          {!!data && (
            <Button color="red" onClick={() => deleteCategory(`${data.id}`)}>
              Удалить
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-5 grid-cols-4 mt-2">
        {images.map((image, index) => (
          <div className="relative h-full">
            <div className="absolute top-5 right-5 z-10">
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  setImages((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <BiTrash />
              </Button>
            </div>
            <BaseDropzone
              dropzoneClassname="h-[320px]"
              key={index}
              image={image}
              onImageUpload={(image) => {
                setImages((prev) => {
                  const newImages = [...prev];
                  newImages[index] = image;

                  return newImages;
                });
              }}
            />
          </div>
        ))}
        <BaseDropzone
          image={null}
          onImageUpload={(value) => {
            setImages((prev) => [...prev, value]);
          }}
          dropzoneClassname="h-[320px]"
        />
      </div>
    </div>
  );
};

export default function PortfolioItemPage() {
  const { id } = useParams();

  const { data, isLoading } = useGetPortfolioItem(`${id}`);
  const { data: categories, isLoading: categoriesLoading } =
    useGetPortfolioCategories(`${id}`);

  const { mutate: deletePorfolioItem } = useDeletePortfolioItem();
  const { mutate: updatePortfolio } = useUpdatePortfolio();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portfolioImage, setPortfolioImage] = useState<string | null>(null);
  const [portfolioLogoImage, setPortfolioLogoImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setPortfolioImage(data.portfolioImage);
      setPortfolioLogoImage(data.portfolioLogoImage);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center">Ничего не найдено</div>;
  }

  return (
    <>
      <div className="text-2xl font-semibold mb-5">{data.name}</div>
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
              if (!portfolioImage || !portfolioLogoImage) return;

              updatePortfolio({
                id: data.id,
                name,
                description,
                portfolioImage,
                portfolioLogoImage,
                orderCode: 0,
              });
            }}
            disabled={
              !name || !description || !portfolioImage || !portfolioLogoImage
            }
          >
            Сохранить
          </Button>
          <Button
            className="ml-5"
            color="red"
            onClick={() => deletePorfolioItem(`${data.id}`)}
          >
            Удалить
          </Button>
        </div>
      </div>
      <div className="font-semibold text-2xl mt-5">Категории</div>
      <div className="mt-5 space-y-5">
        {categoriesLoading && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        {categories?.map((c) => (
          <CategoryComponent data={c} key={c.id} portfolioId={id as string} />
        ))}
        <CategoryComponent portfolioId={id as string} />
      </div>
    </>
  );
}
