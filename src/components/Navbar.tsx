import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  return (
    <>
      <div className="flex px-2 flex-col md:flex-row md:items-center gap-4 md:gap-[126px] container mx-auto py-[61px]">
        <NavLink to={"/"}>
          <div className="w-[135px] h-[26px]">
            <img src="/logo.png" />
          </div>
        </NavLink>
        <div className="flex-1 flex-col md:flex-row flex gap-[14px] md:gap-[50px] md:items-center">
          <NavLink
            className={({ isActive }) =>
              twMerge(
                isActive && " text-white bg-[#70DFFF] rounded-[25px] w-fit",
                "px-[13px] py-[6px]"
              )
            }
            to={"/services"}
          >
            <div className="">Услуги</div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              twMerge(
                isActive && " text-white bg-[#70DFFF] rounded-[25px] w-fit",
                "px-[13px] py-[6px]"
              )
            }
            to={"/portfolio"}
          >
            <div className="">Портфолио</div>
          </NavLink>
          <NavLink to={"#contacts"}>
            <div className="p-[14px]">Контакты</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
