import { Link } from "react-router-dom";
import LoginSignupInput from "../ui/LoginSignupInput";
import LoginSignupButton from "../ui/LoginSignupButton";
import OtherLoginSignupMethods from "../ui/OtherLoginSignupMethods";
import LoginSignupLayout from "../ui/LoginSignupLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignup } from "../reactQuery/useSignup";
import { useLogin } from "../reactQuery/useLogin";
import { useCheckEmail } from "../reactQuery/useCheckEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function SignupPage() {
  const [continued, setContinued] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const { signup } = useSignup();
  const { login } = useLogin();
  const { checkEmail } = useCheckEmail();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const emailAddress = watch("email");

  function onSubmit(data) {
    signup(data, {
      onSuccess: () => {
        login({
          email: data.email,
          password: data.password,
        });
      },
    });
  }

  return (
    <LoginSignupLayout from="signup">
      {emailExists && (
        <div className="flex items-center gap-x-5 rounded-md border-l-4 border-orange-600 p-3 text-sm shadow-sm">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
          <p>
            <span className="font-semibold">
              There is an account associated with the <br /> email.
            </span>
            <Link to="/login" className="ms-1 text-blue-700 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <LoginSignupInput
          id="email"
          type="text"
          name="Email address"
          errors={errors}
          disabled={continued}
          register={register}
          setContinued={setContinued}
          setValue={setValue}
        />
        {continued && (
          <>
            <LoginSignupInput
              id="confirmEmail"
              type="text"
              name="Confirm email"
              errors={errors}
              register={register}
              email={emailAddress}
            />
            <div className="flex items-center gap-x-4">
              <LoginSignupInput
                id="firstName"
                type="text"
                name="First Name"
                errors={errors}
                register={register}
              />
              <LoginSignupInput
                id="lastName"
                type="text"
                name="Last Name"
                errors={errors}
                register={register}
              />
            </div>
            <LoginSignupInput
              id="password"
              type="password"
              name="Password"
              errors={errors}
              register={register}
            />
            <LoginSignupButton
              type="submit"
              name="Create account"
              background="bg-orange-600"
              hover="hover:bg-orange-500"
              textColor="text-white"
            />
          </>
        )}
        {!continued && (
          <LoginSignupButton
            type="button"
            name="Continue"
            background="bg-orange-600"
            hover="hover:bg-orange-500"
            textColor="text-white"
            onClick={() => {
              trigger("email");
              if (isDirty && isValid) {
                checkEmail(emailAddress, {
                  onSuccess: () => {
                    setContinued(true);
                    setEmailExists(false);
                  },
                  onError: () => {
                    setEmailExists(true);
                  },
                });
              }
            }}
          />
        )}
      </form>
      <div className="relative my-5 font-medium text-gray-400">
        <hr></hr>
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 transform  rounded-full border bg-white px-4 ">
          or
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <button
          className={`transition-fade-in2 mt-3 rounded-md border py-3  font-medium hover:bg-gray-50`}
        >
          <img src="googleLogo.png" className="me-3 inline-block w-6" />{" "}
          Continue as Leart
        </button>
      </div>
      <OtherLoginSignupMethods from="signup" />
      <Link
        to="/login"
        className="mt-5 hidden text-sm font-medium text-blue-700 hover:underline lg:block"
      >
        Log in
      </Link>
      <img
        src="loginImage.jpg"
        className="absolute right-0 top-0 hidden h-screen w-screen overflow-hidden object-cover lg:block lg:w-1/2"
        alt="Login Image"
      />
    </LoginSignupLayout>
  );
}

export default SignupPage;
