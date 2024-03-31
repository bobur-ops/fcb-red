import { useEffect, useRef } from "react";
import { CiTextAlignCenter } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { LiaAwardSolid } from "react-icons/lia";
import { MdWork } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

export default function AdminLayout() {
  const navigate = useNavigate();
  const sidebarOpen = useBoolean(false);
  const sidebarRef = useRef(null);
  useOnClickOutside(sidebarRef, () => sidebarOpen.setFalse());

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-50">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => sidebarOpen.toggle()}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={twMerge(
          "fixed border-r top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",
          sidebarOpen.value && "translate-x-0"
        )}
        ref={sidebarRef}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/admin"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaListUl />
                <span className="ms-3">Заказы</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/site"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaListUl />
                <span className="ms-3">Сайт</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/texts"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <CiTextAlignCenter />
                <span className="ms-3">Тексты</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/awards"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <LiaAwardSolid />
                <span className="ms-3">Награды</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/portfolio"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <MdWork />
                <span className="ms-3">Портфолио</span>
              </Link>
            </li>
            <li>
              <div
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <PiSignOutBold />
                <span className="ms-3">Выйти</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="bg-gray-50 border-b sm:ml-64 shadow-sm mb-5">
        <div className="flex p-4">
          <div className="text-xl font-medium font-mono">Admin Panel</div>
        </div>
      </div>
      <div className="p-4 sm:ml-64 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
