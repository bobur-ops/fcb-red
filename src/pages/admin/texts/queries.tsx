import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";

const getTexts = async () => {
  const token = localStorage.getItem("token");
  const {
    data: { data },
  } = await axiosInstance.get("api/text", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetTexts = () => {
  return useQuery({ queryKey: ["texts"], queryFn: getTexts });
};
