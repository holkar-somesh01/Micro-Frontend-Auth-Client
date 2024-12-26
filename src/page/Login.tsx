import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/authApi";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  role?: string;
  message?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error, isSuccess, data }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await loginUser(data).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const userData = data as LoginResponse; // Casting data to expected structure
      if (userData?.role === "admin") {
        alert("Admin Login successful!");
        navigate("/admin/ ");
      } else {
        navigate("/");
        alert("User Login successful!");
      }
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-teal-600">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition duration-200 ${isLoading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 focus:outline-none"}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {(error as any)?.data?.message || "Invalid email or password."}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-teal-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
