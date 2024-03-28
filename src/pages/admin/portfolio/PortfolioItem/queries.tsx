import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../config/axios";
import { PortfolioItem } from "../queries";

const getProduct = async (id: string) => {
  const {
    data: { data },
  } = await axiosInstance.get(`api/portfolio/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as PortfolioItem;
};

export const useGetPortfolioItem = (id: string) => {
  return useQuery({
    queryKey: ["portfolio-item", id],
    queryFn: () => getProduct(id),
  });
};

export interface CategoryInterface {
  id: number;
  name: string;
  orderCode: number;
  images: {
    image: string;
  }[];
}

const getProductCategories = async (id: string) => {
  const {
    data: { data },
  } = await axiosInstance.get(`api/portfolio/category/list/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as CategoryInterface[];
};

export const useGetPortfolioCategories = (id: string) => {
  return useQuery({
    queryKey: ["portfolio-categories", id],
    queryFn: () => getProductCategories(id),
  });
};
