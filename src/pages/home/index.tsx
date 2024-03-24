/* eslint-disable no-irregular-whitespace */
import { axiosInstance } from "../../config/axios";
import { useQueries } from "@tanstack/react-query";
import EditorComponent from "../admin/texts/components/EditorComponent";
import { Loader } from "@mantine/core";

const getTexts = async () => {
  const {
    data: { data },
  } = await axiosInstance.get("api/home/texts");

  return data;
};

const getAwards = async () => {
  const {
    data: { data },
  } = await axiosInstance("api/home/awards");

  return data;
};

export default function HomePage() {
  const [texts, awards] = useQueries({
    queries: [
      { queryKey: ["home-texts"], queryFn: getTexts },
      { queryKey: ["home-awards"], queryFn: getAwards },
    ],
  });

  if (texts.isLoading || awards.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[url('/header.png')] bg-center bg-cover pt-[80px] pb-[200px] relative">
        <div className="container mx-auto">
          <div className="text-white ml-[43px] text-[45px] md:text-[96px] leading-[50px] md:leading-[100px] max-w-[723px] calvino">
            The First <br /> International <br /> Trade <br /> Marketing <br />{" "}
            Agency
          </div>
        </div>
        <div className="absolute z-10 :h-[457px] bg-gradient-to-b from-transparent to-white w-full bottom-0 left-0"></div>
      </div>

      <div className="container px-5 mx-auto -mt-[200px]">
        <div className="flex flex-col flex-wrap items-center md:items-start md:flex-row relative z-20 justify-center gap-12 mt-[82px]">
          {awards?.data?.map((award: any) => (
            <div key={award.id} className="text-center">
              <img
                src={award.imageUrl}
                className="mx-auto mb-[23px] h-[100px]"
                crossOrigin="anonymous"
              />
              <div className="text-center max-w-[265px]">{award.name}</div>
            </div>
          ))}
          <div className="">
            <img src="/awards-1.png" className="mx-auto mb-[23px]" />
            <div className="text-center max-w-[265px]">
              Most Awarded Year Ever – Effie, Reggie, Pro, Ogilvy Arf And Cannes
              Lion Awards
            </div>
          </div>
          <div className="">
            <img src="/awards-2.png" className="mx-auto mb-[23px]" />
            <div className="text-center max-w-[265px]">
              #1 Ranked Shopper Marketing Agency
            </div>
          </div>
          <div className="">
            <img src="/awards-3.png" className="mx-auto mb-[23px]" />
            <div className="text-center max-w-[265px]">
              #1 ranked marketing services agency on promo 100 since 5 years, #1
              ranked in retail
            </div>
          </div>
        </div>
        <img src="/divider.png" className="ml-auto mt-[87px] pl-5" />
        <div className="max-w-[950px] mx-auto mt-[94px] text-[20px] leading-[30px] md:leading-[52px] md:text-[36px] mb-[47px] md:mb-[100px]">
          {/* Наша компания занимается полным комплексом услуг Торгового
          Маркетинга. Мы увеличиваем продажи, воздействуя на все процессы
          связанные с бизнес-операциями в области “ПРОДАЖ ИЗ ТОРГОВЫХ ТОЧЕК”. */}
          <EditorComponent
            defaultData={JSON.parse(
              texts.data?.find((item: any) => item.type === "main").text || "[]"
            )}
            editorId="home-main"
            readonly
          />
        </div>
        <div className="grid grid-cols-3">
          <div className="space-y-[100px] hidden md:block">
            <div className="mx-auto w-[320px]">
              <img src="/cola.png" className=" h-[320px]" />
              <div className="mt-[30px] text-[#28C3F2] text-[48px] mb-[22px] underline">
                Coca-Cola
              </div>
              <div className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="mx-auto w-[320px]">
              <img src="/sherin.png" className=" h-[320px]" />
              <div className="mt-[30px] text-[#28C3F2] text-[48px] mb-[22px] underline">
                Sherin
              </div>
              <div className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2">
            <div className="space-y-[30px] md:space-y-[20px] md:max-w-[539px] leading-[22px] md:leading-[32px] text-[15px] md:text-[22px] text-[#4B4B4B]">
              {texts.data?.map((item: any) => {
                if (item.type === "main") return null;

                return (
                  <p key={item.id}>
                    <EditorComponent
                      defaultData={JSON.parse(item.text || "[]")}
                      editorId={`additional-${item.id}`}
                      readonly
                    />
                  </p>
                );
              })}
              <button className="text-white outline-none border-none bg-[#28C3F2] rounded-[47px] px-[14px] py-[10px]">
                Получить презентацию (pdf)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
