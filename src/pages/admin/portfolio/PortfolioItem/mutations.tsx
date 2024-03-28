import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";
import { CategoryInterface } from "./queries";
import { PortfolioItem } from "../queries";
import { useNavigate } from "react-router-dom";

const updatePortfolio = async (input: PortfolioItem) => {
  const { data } = await axiosInstance.put(
    `api/portfolio/${input.id}`,
    {
      name: input.name,
      description: input.description,
      orderCode: input.orderCode,
      portfolioImage: input.portfolioImage,
      portfolioLogoImage: input.portfolioLogoImage,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useUpdatePortfolio = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updatePortfolio,
    onMutate: () => {
      toast.loading("Обновление портфолио...", { id: "update-portfolio" });
    },
    onSuccess: () => {
      toast.success("Портфолио успешно обновлено", { id: "update-portfolio" });
      client.invalidateQueries({
        queryKey: ["portfolio-list", "portfolio-item"],
      });
      navigate("/admin/portfolio");
    },
    onError: () => {
      toast.error("Ошибка при обновлении портфолио", {
        id: "update-portfolio",
      });
    },
  });
};

interface TCreateCategory {
  portfolioId: string;
  name: string;
  orderCode: number;
  files: { image: string }[];
}
const createCategory = async (input: TCreateCategory) => {
  const { data } = await axiosInstance.post(
    `api/portfolio/category/${input.portfolioId}`,
    {
      name: input.name,
      orderCode: input.orderCode,
      files: input.files,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useCreateCategory = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onMutate: () => {
      toast.loading("Создание категории...", { id: "create-category" });
    },
    onSuccess: () => {
      toast.success("Категория успешно создана", { id: "create-category" });
      client.invalidateQueries({ queryKey: ["portfolio-categories"] });
    },
    onError: () => {
      toast.error("Ошибка при создании категории", { id: "create-category" });
    },
  });
};

const updateCategory = async (input: CategoryInterface) => {
  const { data } = await axiosInstance.put(
    `api/portfolio/category/${input.id}`,
    {
      name: input.name,
      orderCode: input.orderCode,
      files: input.images,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const useUpdateCategory = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onMutate: () => {
      toast.loading("Обновление категории...", { id: "create-category" });
    },
    onSuccess: () => {
      toast.success("Категория успешно обновлена", { id: "create-category" });
      client.invalidateQueries({ queryKey: ["portfolio-categories"] });
    },
    onError: () => {
      toast.error("Ошибка при обновлении категории", { id: "create-category" });
    },
  });
};

const deletePortfolioItem = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/portfolio/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useDeletePortfolioItem = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deletePortfolioItem,
    onMutate: () => {
      toast.loading("Удаление портфолио...", { id: "delete-portfolio" });
    },
    onSuccess: () => {
      toast.success("Портфолио успешно удалено", { id: "delete-portfolio" });
      client.invalidateQueries({
        queryKey: ["portfolio-list", "portfolio-item"],
      });
      navigate("/admin/portfolio");
    },
    onError: () => {
      toast.error("Ошибка при удалении портфолио", { id: "delete-portfolio" });
    },
  });
};

const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/portfolio/category/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useDeleteCategory = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onMutate: () => {
      toast.loading("Удаление категории...", { id: "delete-category" });
    },
    onSuccess: () => {
      toast.success("Категория успешно удалена", { id: "delete-category" });
      client.invalidateQueries({ queryKey: ["portfolio-categories"] });
    },
    onError: () => {
      toast.error("Ошибка при удалении категории", { id: "delete-category" });
    },
  });
};
