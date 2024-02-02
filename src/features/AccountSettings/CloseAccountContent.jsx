import { useForm } from "react-hook-form";
import { useClosedAccountReasons } from "../../reactQuery/useClosedAccountReasons";
import AccountSettingsInput from "../../ui/AccountSettingsInput";
import AccountSettingsRadioButton from "../../ui/AccountSettingsRadioButton";
import { useEffect, useState } from "react";
import { useCreateClosedAccountReason } from "../../reactQuery/useCreateClosedAccountReason";
import { useCloseAccount } from "../../reactQuery/useCloseAccount";

function CloseAccountContent() {
  const { closedAccountReasons } = useClosedAccountReasons();
  const { isLoading, createClosedAccountReason } =
    useCreateClosedAccountReason();
  const { closeAccount } = useCloseAccount();
  const [chosenReason, setChosenReason] = useState(null);

  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const {
    handleSubmit,
    setValue,
    register,
    setError,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: null,
      description: "",
      close: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    if (chosenReason === null) {
      setError("reason", {
        type: "manual",
        message: "Please tell us why you are leaving.",
      });
      return;
    }

    closeAccount(
      {
        password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          createClosedAccountReason({
            closedAccountReasonId: chosenReason,
            description: data.description,
          });
        },
        onError: () => {
          setIncorrectPassword(true);
        },
      },
    );
  }

  useEffect(() => {
    trigger("reason");
  }, [chosenReason, trigger]);

  useEffect(() => {
    if (chosenReason !== null) {
      clearErrors("reason");
    }
  }, [chosenReason, clearErrors]);

  return (
    <div className="mx-5 mt-10 lg:ms-96 lg:mt-[6.5rem] 2xl:me-52">
      <h1 className="pb-3 text-3xl font-bold" style={{ color: "#1e0a3c" }}>
        Close Account
      </h1>
      {incorrectPassword && (
        <p className="font-medium text-red-600">
          Our records could not find the password you provided!
        </p>
      )}
      <hr></hr>
      <p className="my-2">
        Thank you for using Eventify Events. If there is anything we can do to
        keep you with us, please let us know.
      </p>
      <p>Please take a moment to let us know why you are leaving:</p>
      <form onSubmit={handleSubmit(onSubmit)} className={`ms-5 mt-7`}>
        {closedAccountReasons?.map((reason) => (
          <AccountSettingsRadioButton
            chosenReason={chosenReason}
            setValue={setValue}
            setChosenReason={setChosenReason}
            key={reason.id}
            id={reason.id}
            labelName={reason.name}
          />
        ))}

        <textarea
          {...register("description", {
            required: {
              value: chosenReason === 8,
              message: "Please tell us why you are leaving.",
            },
          })}
          className="w-full"
        />
        <p className="text-red-600">{errors.description?.message}</p>
        <p className="mt-3 text-lg">
          Please enter "CLOSE" and your password to confirm that you wish to
          close your account
        </p>
        <AccountSettingsInput
          labelName='Type "CLOSE":'
          id="close"
          register={register}
          errors={errors}
        />
        <AccountSettingsInput
          incorrectPassword={incorrectPassword}
          type="password"
          labelName="Enter your password:"
          id="confirmPassword"
          register={register}
          errors={errors}
        />
        {errors.reason?.message && (
          <p className="my-2 font-medium text-red-600">
            {errors.reason?.message}
          </p>
        )}
        <button
          type="submit"
          className="my-5 rounded-md bg-orange-600 px-8 py-2 font-medium text-white"
        >
          Close Account
        </button>
      </form>
    </div>
  );
}

export default CloseAccountContent;
