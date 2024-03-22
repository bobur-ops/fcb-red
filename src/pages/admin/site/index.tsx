/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getSiteInfo = async () => {
  const {
    data: { data },
  } = await axiosInstance("api/site", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

const updateInfo = async (data: any) => {
  const { data: res } = await axiosInstance.put("api/site", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res;
};

interface ListItemProps {
  value: string;
  field: string;
  onChange: (value: string) => void;
}

const ListItem = ({ value, field, onChange }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex justify-between gap-5 items-center bg-white shadow-md py-3 px-5 rounded-full  ">
      <div className="w-[20%]">{field}</div>
      <div className="flex-1 flex justify-center text-center">
        {isEditing ? (
          <input
            className="block w-full"
            defaultValue={value}
            onBlur={() => setIsEditing(false)} // Set isEditing to false when input loses focus
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <div>{value || "-"}</div>
        )}
      </div>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        <BiEdit className="text-[22px]" />
      </div>
    </div>
  );
};

export default function SitePage() {
  const client = useQueryClient();
  const [siteData, setSiteData] = useState<any>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["site-info"],
    queryFn: getSiteInfo,
  });

  useEffect(() => {
    console.log(siteData);
  }, [siteData]);

  const { mutate } = useMutation({
    mutationFn: updateInfo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["site-info"] });
      toast.success("Информация успешно обновлена");
    },
    onError: () => {
      toast.error("Произошла ошибка");
    },
    onMutate: () => {
      toast("Сохранение...");
    },
  });

  useEffect(() => {
    if (data) {
      setSiteData(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <div className="text-base font-medium font-sans space-y-5">
      <ListItem
        onChange={(value) => {
          setSiteData((prev: any) => ({ ...prev, phoneNumber: value }));
        }}
        field="Номер телефона"
        value={siteData?.phoneNumber}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, address: value }))
        }
        field="Адрес"
        value={siteData?.address}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, workTime: value }))
        }
        field="Рабочее время"
        value={siteData?.workTime}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, telegramLink: value }))
        }
        field="Телеграм"
        value={siteData?.telegramLink}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, instagramLink: value }))
        }
        field="Инстаграм"
        value={siteData?.instagramLink}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, mapUrl: value }))
        }
        field="Ссылка на локацию"
        value={siteData?.mapUrl}
      />
      <ListItem
        onChange={(value) =>
          setSiteData((prev: any) => ({ ...prev, email: value }))
        }
        field="Email"
        value={siteData?.email}
      />
      <button
        onClick={() => mutate(siteData)}
        className="text-white outline-none border-none bg-[#28C3F2] rounded-[47px] px-[14px] py-[10px]"
      >
        Сохранить
      </button>
    </div>
  );
}
