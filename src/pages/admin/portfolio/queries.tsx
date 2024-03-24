import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";

const getPortfolio = async () => {
  const {
    data: { data },
  } = await axiosInstance.get("api/portfolio", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });
};
