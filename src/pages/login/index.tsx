import { useState } from "react";
import { axiosInstance } from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useBoolean(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return;
    loading.setTrue();
    try {
      const { data } = await axiosInstance.post("auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/admin");
      loading.setFalse();
    } catch (error) {
      console.log(error);
      loading.setFalse();
    }
  };

  return (
    <section className="bg-gray-50 font-sans">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Войти
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Имя пользователя
                </label>
                <input
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Введите имя пользователя"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleLogin}
              >
                {loading.value ? "Загрузка..." : "Войти"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
