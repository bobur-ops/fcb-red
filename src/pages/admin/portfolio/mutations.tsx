import { axiosInstance } from "../../../config/axios";

type TCreatePortfolio = {
  name: string;
  orderCode: number;
  portfolioImage: string;
};

const createPortfolio = async (input: TCreatePortfolio) => {
  const { data } = await axiosInstance.post(
    "api/award",
    {
      name: input.name,
      orderCode: input.orderCode,
      portfolioImage: input.portfolioImage,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};
