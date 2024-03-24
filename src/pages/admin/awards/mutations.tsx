import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import toast from "react-hot-toast";

type TCreateAward = {
  name: string;
  orderCode: number;
  awardImage: string;
};
const createAward = async ({ name, orderCode, awardImage }: TCreateAward) => {
  const { data } = await axiosInstance.post(
    "api/award",
    {
      name,
      orderCode,
      awardImage,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useCreateAward = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAward,
    onMutate: () => {
      toast.loading("Создание награды...", { id: "createAward" });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Награда успешно создана", { id: "createAward" });
    },
    onError: () => {
      toast.error("Ошибка при создании награды", { id: "createAward" });
    },
  });

  return mutation;
};

const deleteAward = async (id: number) => {
  const { data } = await axiosInstance.delete(`api/award/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useDeleteAward = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAward,
    onMutate: () => {
      toast.loading("Удаление награды...", { id: "deleteAward" });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Награда успешно удалена", { id: "deleteAward" });
    },
    onError: () => {
      toast.error("Ошибка при удалении награды", { id: "deleteAward" });
    },
  });

  return mutation;
};

type TUpdateAward = {
  id: number;
  name: string;
  orderCode: number;
  awardImage: string;
};

const updateAward = async ({
  id,
  awardImage,
  name,
  orderCode,
}: TUpdateAward) => {
  const { data } = await axiosInstance.put(
    `api/award/${id}`,
    {
      name,
      orderCode,
      awardImage,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useUpdateAward = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAward,
    onMutate: () => {
      toast.loading("Обновление награды...", { id: "updateAward" });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Награда успешно обновлена", { id: "updateAward" });
    },
    onError: () => {
      toast.error("Ошибка при обновлении награды", { id: "updateAward" });
    },
  });

  return mutation;
};
