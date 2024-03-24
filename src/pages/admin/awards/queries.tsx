import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";

const getAwards = async () => {
  const {
    data: { data },
  } = await axiosInstance.get("api/award", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const useGetAwards = () => {
  return useQuery({
    queryKey: ["awards"],
    queryFn: getAwards,
  });
};
