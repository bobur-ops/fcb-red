import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface TCreatePortfolio {
  name: string;
  description: string;
  portfolioImage: string;
  portfolioLogoImage: string;
  orderCode: number;
}
const createPortfolioItem = async (input: TCreatePortfolio) => {
  const { data } = await axiosInstance.post("api/portfolio", input, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useCreatePortfolioItem = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPortfolioItem,
    onMutate: () => {
      toast.loading("Создание...", { id: "create-portfolio" });
    },
    onError: () => {
      toast.error("Ошибка при создании", { id: "create-portfolio" });
    },
    onSuccess: () => {
      toast.success("Успешно создано", { id: "create-portfolio" });
      client.invalidateQueries({ queryKey: ["portfolio-list"] });
      navigate("/admin/portfolio");
    },
  });
};
