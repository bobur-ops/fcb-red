import { useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="grid gap-[101px] md:grid-cols-2 mt-[60px] md:mt-[200px]">
      <div className="">
        <div className="py-[50px] px-[45px] rounded-[25px] bg-[#F2F2F2]">
          <div className="mb-[23px] text-[36px] font-semibold">
            Перезвоните мне
          </div>
          <div className="mb-2.5">
            <input
              className="w-full outline-none border-none py-2 px-3 rounded-[47px] text-[22px]"
              placeholder="ФИО"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-2.5">
            <input
              className="w-full outline-none border-none py-2 px-3 rounded-[47px] text-[22px]"
              placeholder="Телефон"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            className={twMerge(
              "text-white outline-none border-none bg-[#28C3F2] rounded-[47px] px-[14px] py-[10px] text-[22px]",
              (!fullName || !phoneNumber) && "bg-[#DADADA]"
            )}
          >
            Отправить →
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex gap-[11px] mb-[54px]">
          <div className="w-[130px]">
            Адрес <br />{" "}
            <Link
              to={"https://maps.app.goo.gl/ZXLApn1V1jDWHPPj7"}
              target="_blank"
              className="text-[#28C3F2] underline"
            >
              {" "}
              на карте
            </Link>
          </div>
          <div className="max-w-[250px]">
            Бизнес-центр «Инконель» проспект Мустакиллик, 75 Ташкент, 100000,
            Узбекистан
          </div>
        </div>
        <div className="flex mb-5">
          <div className="w-[130px]">Звоните</div>
          <div className="">
            +998 90-354-74-71 <br /> +998 78-120-74-71
          </div>
        </div>
        <div className="flex">
          <div className="w-[130px]">Пишите</div>
          <div className="text-[#28C3F2]">fcbred@fcbartgroup.com</div>
        </div>
      </div>
    </div>
  );
};

export default Form;
