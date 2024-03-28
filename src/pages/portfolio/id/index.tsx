import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

interface SectionComponentProps {
  data: {
    id: number;
    name: string;
    orderCode: number;
    images: {
      image: string;
    }[];
  };
}

const SectionComponent = ({ data }: SectionComponentProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      <div className="text-[24px] tmd:text-[36px] mb-[50px]">{data.name}</div>
      <div className="hidden md:grid grid-cols-3 gap-5">
        {data.images.map((item, index) => (
          <img
            className="w-[320px] h-[265px] rounded-[5px]"
            src={item.image}
            key={index}
          />
        ))}
      </div>
      <div className="md:hidden">
        <img
          className="w-full object-cover object-center h-[265px] rounded-[5px] mx-auto mb-5"
          src={data.images[currentImage].image}
        />
        <div className="flex justify-end gap-5">
          <div
            onClick={() => {
              setCurrentImage((prev) => {
                if (prev === 0) {
                  return data.images.length - 1;
                }

                return prev - 1;
              });
            }}
            className="size-[70px] bg-[#70DFFF20] rounded-full cursor-pointer flex items-center justify-center"
          >
            <svg
              width="23"
              height="18"
              viewBox="0 0 23 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.6133 9C22.6133 9.30469 22.5156 9.55469 22.3203 9.75C22.1328 9.94531 21.8867 10.043 21.582 10.043L6.14844 10.043L2.65625 9.92578L2.89062 9.26953L7.49609 13.4648L10.1211 16.1367C10.2148 16.2305 10.2852 16.3437 10.332 16.4766C10.3789 16.6016 10.4023 16.7344 10.4023 16.875C10.4023 17.1641 10.3047 17.4062 10.1094 17.6016C9.91406 17.7891 9.67187 17.8828 9.38281 17.8828C9.10156 17.8828 8.84766 17.7734 8.62109 17.5547L0.828125 9.78516C0.710937 9.66797 0.624999 9.54297 0.570312 9.41016C0.507812 9.27734 0.476562 9.14062 0.476562 9C0.476562 8.85156 0.507812 8.71094 0.570312 8.57812C0.624999 8.44531 0.710937 8.32422 0.828124 8.21484L8.62109 0.433593C8.84766 0.222656 9.10156 0.117187 9.38281 0.117187C9.67187 0.117187 9.91406 0.214843 10.1094 0.410156C10.3047 0.597656 10.4023 0.835937 10.4023 1.125C10.4023 1.26562 10.3789 1.40234 10.332 1.53516C10.2852 1.66016 10.2148 1.76953 10.1211 1.86328L7.49609 4.53516L2.89062 8.74219L2.65625 8.07422L6.14844 7.95703L21.582 7.95703C21.8867 7.95703 22.1328 8.05469 22.3203 8.25C22.5156 8.44531 22.6133 8.69531 22.6133 9Z"
                fill="#28C3F2"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              setCurrentImage((prev) => {
                if (data.images.length < prev + 2) {
                  return 0;
                }

                return prev + 1;
              });
            }}
            className="size-[70px] bg-[#70DFFF20] rounded-full cursor-pointer flex items-center justify-center"
          >
            <svg
              width="23"
              height="18"
              viewBox="0 0 23 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.386718 9C0.386718 8.69531 0.484374 8.44531 0.679687 8.25C0.867187 8.05469 1.11328 7.95703 1.41797 7.95703L16.8516 7.95703L20.3437 8.07422L20.1094 8.73047L15.5039 4.53516L12.8789 1.86328C12.7852 1.76953 12.7148 1.65625 12.668 1.52344C12.6211 1.39844 12.5977 1.26562 12.5977 1.125C12.5977 0.835937 12.6953 0.593749 12.8906 0.398437C13.0859 0.210937 13.3281 0.117187 13.6172 0.117187C13.8984 0.117187 14.1523 0.226562 14.3789 0.445312L22.1719 8.21484C22.2891 8.33203 22.375 8.45703 22.4297 8.58984C22.4922 8.72266 22.5234 8.85937 22.5234 9C22.5234 9.14844 22.4922 9.28906 22.4297 9.42187C22.375 9.55469 22.2891 9.67578 22.1719 9.78516L14.3789 17.5664C14.1523 17.7773 13.8984 17.8828 13.6172 17.8828C13.3281 17.8828 13.0859 17.7852 12.8906 17.5898C12.6953 17.4023 12.5977 17.1641 12.5977 16.875C12.5977 16.7344 12.6211 16.5977 12.668 16.4648C12.7148 16.3398 12.7852 16.2305 12.8789 16.1367L15.5039 13.4648L20.1094 9.25781L20.3437 9.92578L16.8516 10.043L1.41797 10.043C1.11328 10.043 0.867187 9.94531 0.679687 9.75C0.484374 9.55469 0.386718 9.30469 0.386718 9Z"
                fill="#28C3F2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategory = async (id: string) => {
  const {
    data: { data },
  } = await axiosInstance.get(`api/home/portfolio/category/list/${id}`);

  return data;
};

export default function PortfolioId() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-list", id],
    queryFn: () => getCategory(`${id}`),
  });

  console.log(data);

  // const item = data.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container px-5 mx-auto lg:pl-[305px]">
      <div className="mb-[82px] text-[64px] md:text-[147px] calvino">TItle</div>
      <img src="/divider.png" className="ml-auto mb-[87px] pl-5 w-full" />
      <div className="space-y-[100px]">
        {!data?.length ? (
          <div>Ничего не найдено</div>
        ) : (
          <>
            {data.map((section: any, index: number) => (
              <SectionComponent data={section} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
