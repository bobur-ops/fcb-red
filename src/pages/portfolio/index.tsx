import { Link } from "react-router-dom";

export default function PortfolioPage() {
  return (
    <div className="container px-5 mx-auto lg:pl-[305px]">
      <div className="mb-[82px] text-[64px] md:text-[147px] calvino">
        Portfolio
      </div>
      <img src="/divider.png" className="ml-auto mb-[87px] pl-5 w-full" />
      <div className="grid gap-[90px] md:grid-cols-3">
        <Link
          to={"/portfolio/1"}
          className="flex cursor-pointer items-center justify-center px-10 py-[104px] rounded-[25px] border"
        >
          <img src="/portfolio-1.png" />
        </Link>
        <Link
          to={"/portfolio/2"}
          className="flex cursor-pointer items-center justify-center px-10 py-[104px] rounded-[25px] border"
        >
          <img src="/portfolio-2.png" />
        </Link>
        <Link
          to={"/portfolio/3"}
          className="flex cursor-pointer items-center justify-center px-10 py-[104px] rounded-[25px] border"
        >
          <img src="/portfolio-3.png" />
        </Link>
      </div>
    </div>
  );
}
