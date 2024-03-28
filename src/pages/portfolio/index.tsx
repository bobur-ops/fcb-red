import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

const getPortfolioList = async () => {
  const {
    data: { data },
  } = await axiosInstance.get("api/home/portfolio");

  return data;
};

export default function PortfolioPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-list"],
    queryFn: getPortfolioList,
  });

  return (
    <div className="container px-5 mx-auto lg:pl-[305px]">
      <div className="mb-[82px] text-[64px] md:text-[147px] calvino">
        Portfolio
      </div>
      <img src="/divider.png" className="ml-auto mb-[87px] pl-5 w-full" />
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="grid gap-[90px] md:grid-cols-3">
        {data?.map((item: any) => (
          <Link
            key={item.id}
            to={`/portfolio/${item.id}`}
            className="flex cursor-pointer items-center justify-center px-10 py-[104px] rounded-[25px] border"
          >
            <img src={item.portfolioLogoImage} />
          </Link>
        ))}
      </div>
    </div>
  );
}
