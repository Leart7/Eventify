import { useForm } from "react-hook-form";
import LoginSignupInput from "../../ui/LoginSignupInput";
import { useUpdateUserPassword } from "../../reactQuery/useUpdateUserPassword";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { updatePassword } = useUpdateUserPassword();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  function onSubmit(data) {
    updatePassword(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setSuccess("Your password was changed.");
        },
        onError: (err) => {
          setError(err.message);
        },
      },
    );
  }
  const newPassword = watch("newPassword");

  return (
    <>
      {error && (
        <div className="ms-auto flex h-12 w-full items-center justify-between bg-red-600 px-10 text-sm font-medium text-white  ">
          <p className="text-white lg:ms-[30%] xl:ms-[23%] 2xl:ms-[17%]">
            {error}
          </p>
          <div
            role="button"
            onClick={() => setError("")}
            className="h-[39px] w-[39px] items-center justify-center rounded-full pt-3 text-center hover:cursor-pointer hover:bg-red-500 lg:flex lg:pt-1"
          >
            <FontAwesomeIcon icon={faXmark} className="pb-1" />
          </div>
        </div>
      )}
      {success && (
        <div className="ms-auto flex h-12 w-full items-center justify-between bg-emerald-600 px-10 text-sm font-medium text-white  ">
          <p className="text-white lg:ms-[30%] xl:ms-[23%] 2xl:ms-[17%]">
            {success}
          </p>
          <div
            role="button"
            onClick={() => setSuccess("")}
            className="h-[39px] w-[39px] items-center justify-center rounded-full pt-3 text-center hover:cursor-pointer hover:bg-emerald-500 lg:flex lg:pt-1"
          >
            <FontAwesomeIcon icon={faXmark} className="pb-1" />
          </div>
        </div>
      )}
      <div className="mx-5 mt-10 lg:ms-96 lg:mt-[6.5rem] 2xl:me-52">
        <h1 className="pb-3 text-3xl font-bold" style={{ color: "#1e0a3c" }}>
          Your password
        </h1>
        <hr></hr>
        <p className="mt-5 text-sm">Set a new password.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 flex w-[65%] max-w-md flex-col gap-y-5"
        >
          <LoginSignupInput
            id="oldPassword"
            type="password"
            name="Current Password"
            register={register}
            errors={errors}
          />
          <LoginSignupInput
            id="newPassword"
            type="password"
            name="New Password"
            register={register}
            errors={errors}
          />
          <LoginSignupInput
            id="confirmPassword"
            type="password"
            name="Repeat Password"
            register={register}
            errors={errors}
            newPassword={newPassword}
          />
          <button
            type="submit"
            className="mt-5 w-[35%] rounded-md bg-orange-600 px-8 py-2 font-medium text-white"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePasswordForm;
