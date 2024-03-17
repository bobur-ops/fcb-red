import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axios";
import { IoCheckmarkCircle } from "react-icons/io5";

import { IoMdTrash } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

interface IConsultation {
  consultation_id: number;
  created_at: string;
  status: boolean;
  phone_number: string;
  name: string;
}

const getConsultations = async () => {
  const { data } = await axiosInstance("api/consultation", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data?.data as IConsultation[];
};

const checkConsultation = async (id: number) => {
  const { data } = await axiosInstance.put(`api/consultation/${id}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

const deleteConsultation = async (id: number) => {
  const { data } = await axiosInstance.delete(`api/consultation/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["consultations"],
    queryFn: getConsultations,
  });

  const { mutate: checkMutation } = useMutation({
    mutationFn: checkConsultation,
    mutationKey: ["check-consultation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
      toast.success("Консультация подтверждена");
    },
    onMutate: () => {
      toast("Загрузка");
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteConsultation,
    mutationKey: ["delete-consultation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
      toast.success("Консультация удалена");
    },
    onMutate: () => {
      toast("Загрузка");
    },
  });

  return (
    <div className="font-sans text-base">
      <div className="space-y-5">
        <div className="grid grid-cols-4 bg-white shadow-md py-3 px-5 rounded-full font-bold uppercase">
          <div className="text-center">Имя клиента</div>
          <div className="text-center">Телефон</div>
          <div className="text-center">Дата</div>
          <div className="text-center">Действия</div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}

        {data?.map((c) => (
          <div
            key={c.consultation_id}
            className="grid grid-cols-4 bg-white shadow-md py-3 px-5 rounded-full text-gray-900"
          >
            <div className="text-center">{c.name}</div>
            <div className="text-center">{c.phone_number}</div>
            <div className="text-center">{c.created_at}</div>
            <div className="flex justify-center items-center gap-3">
              <div
                className="cursor-pointer"
                onClick={() => checkMutation(c.consultation_id)}
              >
                <IoCheckmarkCircle
                  className={twMerge(
                    "text-[22px] text-gray-400",
                    c.status && "text-green-500"
                  )}
                />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => deleteMutation(c.consultation_id)}
              >
                <IoMdTrash className="text-[22px] text-red-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
