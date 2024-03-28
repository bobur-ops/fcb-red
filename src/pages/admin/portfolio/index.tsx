import { Button, Loader } from "@mantine/core";
import { useGetPortfolioList } from "./queries";
import { Link } from "react-router-dom";

export default function AdminPortfolioPage() {
  const { data, isLoading } = useGetPortfolioList();

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold mb-5">Портфолио</div>
          <Link to={"/admin/portfolio/create"}>
            <Button>Создать</Button>
          </Link>
        </div>
        {!data ? (
          <>Ничего не найдено</>
        ) : (
          <div className="grid gap-[90px] md:grid-cols-3">
            {data.map((item) => (
              <Link
                to={`/admin/portfolio/${item.id}`}
                key={item.id}
                className="flex cursor-pointer items-center justify-center px-10 py-[104px] rounded-[25px] border"
              >
                <img crossOrigin="anonymous" src={item.portfolioLogoImage} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
