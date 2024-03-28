import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";

export interface PortfolioItem {
  id: number;
  portfolioImage: string;
  portfolioLogoImage: string;
  name: string;
  description: string;
  orderCode: number;
}

const getPorfolioList = async () => {
  const {
    data: { data },
  } = await axiosInstance.get("api/portfolio", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as PortfolioItem[];
};

export const useGetPortfolioList = () => {
  return useQuery({
    queryKey: ["portfolio-list"],
    queryFn: getPorfolioList,
  });
};
