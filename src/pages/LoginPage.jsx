import { Link, useNavigate } from "react-router-dom";
import LoginSignupInput from "../ui/LoginSignupInput";
import LoginSignupButton from "../ui/LoginSignupButton";
import OtherLoginSignupMethods from "../ui/OtherLoginSignupMethods";
import LoginSignupLayout from "../ui/LoginSignupLayout";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLogin } from "../reactQuery/useLogin";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [incorrect, setIncorrect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    login(data, {
      onError: () => {
        setIncorrect(true);
        reset();
      },
    });
  }

  return (
    <LoginSignupLayout from="login">
      {incorrect && (
        <div className="rounded-md border-l-4 border-orange-600 p-3 text-sm shadow-sm">
          Email address or password is not correct.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <LoginSignupInput
          id="email"
          type="text"
          name="Email address"
          register={register}
          errors={errors}
          incorrect={incorrect}
        />
        <LoginSignupInput
          id="password"
          type="password"
          name="Password"
          register={register}
          errors={errors}
          incorrect={incorrect}
        />
        <LoginSignupButton
          name="Log in"
          background="bg-orange-600"
          hover="hover:bg-orange-500"
          textColor="text-white"
          type="submit"
        />
      </form>
      <DevTool control={control} />
      <div className="relative my-5 font-medium text-gray-400">
        <hr></hr>
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 transform  rounded-full border bg-white px-4 ">
          or
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <LoginSignupButton
          type="button"
          name="Email me a login link"
          hover="hover:bg-gray-50"
          additional="border"
        />
        <button
          className={`transition-fade-in2 mt-3 rounded-md border py-3  font-medium hover:bg-gray-50`}
        >
          <img src="googleLogo.png" className="me-3 inline-block w-6" />{" "}
          Continue as Leart
        </button>
      </div>
      <OtherLoginSignupMethods />
      <Link
        to="/signup"
        className="mt-5 hidden text-sm font-medium text-blue-700 hover:underline lg:block"
      >
        Sign up
      </Link>
      <img
        src="loginImage.jpg"
        className="absolute right-0 top-0 hidden h-screen w-screen overflow-hidden object-cover lg:block lg:w-1/2"
        alt="Login Image"
      />
    </LoginSignupLayout>
  );
}

export default LoginPage;
