import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import toast from "react-hot-toast";

type TUploadText = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  type: "main" | "additional";
};

export const uploadText = async ({ text, type }: TUploadText) => {
  const { data } = await axiosInstance.post(
    "api/text",
    { text: JSON.stringify(text), type },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useCreateText = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadText,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["texts"] });
      toast.success("Успешно", { id: "uploadText" });
    },
    onMutate: () => {
      toast.loading("Загрузка...", { id: "uploadText" });
    },
    onError: () => {
      toast.error("Ошибка", { id: "uploadText" });
    },
  });

  return mutation;
};

const updateText = async ({ text, id }: { text: any; id: number }) => {
  const { data } = await axiosInstance.put(
    `api/text/${id}`,
    {
      text: JSON.stringify(text),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useUpdateText = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateText,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["texts"] });
      toast.success("Успешно", { id: "updateText" });
    },
    onMutate: () => {
      toast.loading("Загрузка...", { id: "updateText" });
    },
    onError: () => {
      toast.error("Ошибка", { id: "updateText" });
    },
  });

  return mutation;
};

const deleteText = async (id: number) => {
  const { data } = await axiosInstance.delete(`api/text/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useDeleteText = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteText,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["texts"] });
      toast.success("Успешно", { id: "deleteText" });
    },
    onMutate: () => {
      toast.loading("Загрузка...", { id: "deleteText" });
    },
    onError: () => {
      toast.error("Ошибка", { id: "deleteText" });
    },
  });

  return mutation;
};
