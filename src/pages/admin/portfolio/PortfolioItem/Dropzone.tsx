import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { convertBase64 } from "../../../../utils/convertBase64";
import { twMerge } from "tailwind-merge";

interface BaseDropzoneProps extends Partial<DropzoneProps> {
  placeholder?: string;
  image?: string | null;
  onImageUpload: (image: string) => void;
  dropzoneClassname?: string;
}

export function BaseDropzone(props: BaseDropzoneProps) {
  const handleOnDrop = async (file: File) => {
    const base64 = await convertBase64(file);

    props.onImageUpload(base64);
  };

  return (
    <Dropzone
      onDrop={(files) => {
        handleOnDrop(files[0]);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      classNames={{ inner: "flex justify-center" }}
      className={twMerge("", props.dropzoneClassname)}
      {...props}
    >
      {props.image ? (
        <div className="flex w-[320px] h-[300px] items-center justify-center">
          <img
            className="object-center w-full object-contain h-full"
            src={props.image}
            alt="image"
          />
        </div>
      ) : (
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              {props.placeholder || "Перетащите файлы сюда"}
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
  );
}
