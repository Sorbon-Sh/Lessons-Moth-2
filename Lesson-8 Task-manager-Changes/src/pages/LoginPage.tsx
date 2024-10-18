import { useState } from "react";
import Box from "../components/ui/Box";

import { useForm } from "react-hook-form";
import { LoginData } from "../lib/types/LoginTypes";
import axios from "axios";
import url from "../lib/url";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const submitHandler = async (data: LoginData) => {
    try {
      setLoading(true);

      const response = await axios
        .post(`${url}/login`, data)
        .then((res) => res.data)
        .finally(() => setLoading(false));

      if (rememberMe) {
        localStorage.setItem("token", response.accessToken);
      } else {
        sessionStorage.setItem("token", response.accessToken);
      }

      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full grid place-items-center">
      <Box>
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1 className="text-3xl font-bold">Login</h1>
          <div className="flex flex-col mt-4 gap-2">
            <input
              {...register("email", {
                required: "Введите это поле",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Некорректный Email";
                  }

                  return true;
                },
              })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              {...register("password", {
                required: "Введите это поле",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <label className="flex gap-2 items-center">
              <input
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                type="checkbox"
              />
              <p>Remember me</p>
            </label>
            <button disabled={loading}>Login</button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;
