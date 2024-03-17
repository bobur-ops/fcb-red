import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "../config/axios";
import { useMutation } from "@tanstack/react-query";

interface ReqFields {
  name: string;
  phoneNumber: string;
}

const postConsultation = async (fields: ReqFields) => {
  const { data } = await axiosInstance.post("api/home/consultation", fields);

  console.log(data);

  return data;
};

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationKey: ["consultation"],
    mutationFn: postConsultation,
    onSettled: () => {
      setFullName("");
      setPhoneNumber("");
    },
  });

  const renderForm = () => {
    if (isError) {
      return <div>Ошибка</div>;
    }

    if (isSuccess) {
      return (
        <div>
          <div className="mb-5 text-[36px]">Спасибо</div>
          <div className="h-[100px] mb-[18px] text-[22px]">
            Ваше сообщение отправлено. Мы перезвоним в рабочее время.
          </div>
          <button
            className={twMerge(
              " transition-all duration-200 outline-none border-none bg-[#000000] text-white rounded-[47px] px-[14px] py-[10px] text-[22px] flex items-center gap-2"
            )}
            onClick={reset}
          >
            Закрыть
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="mb-[23px] text-[24px] md:text-[36px] font-semibold">
          Перезвоните мне
        </div>
        <div className="mb-2.5">
          <input
            className="w-full outline-none border-none py-2 px-3 rounded-[47px] text-[20px] md:text-[22px] focus:ring-2 focus:ring-[#28C3F2]"
            placeholder="ФИО"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-2.5">
          <input
            className="w-full outline-none py-2 px-3 rounded-[47px] text-[20px] md:text-[22px] focus:ring-2 focus:ring-[#28C3F2] font-sans"
            placeholder="Телефон"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          className={twMerge(
            "text-white transition-all duration-200 outline-none border-none bg-[#DADADA] rounded-[47px] px-[14px] py-[10px] text-[22px] flex items-center gap-2",
            fullName && phoneNumber && "bg-[#000000] text-white"
          )}
          onClick={() => {
            mutate({ name: fullName, phoneNumber });
          }}
        >
          {isPending ? (
            "Отправка..."
          ) : (
            <>
              Отправить <FaArrowRightLong />
            </>
          )}
        </button>
      </>
    );
  };

  return (
    <div className="container px-5 mx-auto grid gap-[101px] md:grid-cols-2 mt-[60px] md:mt-[200px]">
      <div className="">
        <div className="py-[50px] px-[45px] rounded-[25px] bg-[#F2F2F2]">
          {renderForm()}
        </div>
      </div>
      <div className="" id="contacts">
        <div className="flex flex-wrap gap-[11px] mb-[54px]">
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
          <div className="max-w-[280px] text-[#4B4B4B]">
            Бизнес-центр «Инконель» проспект Мустакиллик, 75 Ташкент, 100000,
            Узбекистан
          </div>
        </div>
        <div className="flex flex-wrap mb-5">
          <div className="w-[130px]">Звоните</div>
          <div>
            <div className="flex items-center">
              <span>
                <FiPlus />
              </span>
              998 90-354-74-71 <br />
            </div>
            <div className="flex items-center">
              <span>
                <FiPlus />
              </span>
              998 78-120-74-71
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-[130px]">Пишите</div>
          <div className="text-[#28C3F2]">fcbred@fcbartgroup.com</div>
        </div>
      </div>
    </div>
  );
};

export default Form;
