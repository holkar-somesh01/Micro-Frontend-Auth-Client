import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/authApi";
import { useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  mobile: string;
  profile?: File;
}
const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const RegisterUserData: any = new FormData();
      RegisterUserData.append("name", data.name);
      RegisterUserData.append("email", data.email);
      RegisterUserData.append("password", data.password);
      RegisterUserData.append("mobile", data.mobile);

      if (data.profile) {
        RegisterUserData.append("hero", data.profile)
      }

      await registerUser(RegisterUserData);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setValue("profile", file);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      alert("Registration successful!");
      navigate("/auth/")
    }
  }, [isSuccess])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md border border-teal-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-teal-600">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex gap-5">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
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
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Mobile</label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number format",
                  },
                })}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleFileChange}
            />
            {errors.profile && <p className="text-red-500 text-sm mt-1">{errors.profile.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition duration-200 ${isLoading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 focus:outline-none"}`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isError && <p className="text-red-500 text-sm mt-4 text-center">{(error as any)?.data?.message || "Something went wrong."}</p>}
          {isSuccess && <p className="text-green-500 text-sm mt-4 text-center">Registration completed successfully!</p>}
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/auth/" className="text-teal-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
