import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex px-2 flex-col md:flex-row md:items-center gap-4 md:gap-[126px] container mx-auto py-[61px]">
        <Link to={"/"}>
          <div className="w-[135px] h-[26px]">
            <img src="./logo.png" />
          </div>
        </Link>
        <div className="flex-1 flex-col md:flex-row flex gap-[14px] md:gap-[50px] md:items-center">
          <Link to={"/services"}>
            <div className="p-[14px]">Услуги</div>
          </Link>
          <Link to={"/portfolio"}>
            <div className="p-[14px]">Портфолио</div>
          </Link>
          <Link to={"/#"}>
            <div className="p-[14px]">Контакты</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
