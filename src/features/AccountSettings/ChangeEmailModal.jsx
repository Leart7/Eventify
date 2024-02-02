import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginSignupInput from "../../ui/LoginSignupInput";
import { useForm } from "react-hook-form";
import { useUpdateUserEmail } from "../../reactQuery/useUpdateUserEmail";

function ChangeEmailModal({ setClickedModal, setError, setSuccess }) {
  const { updateUserEmail } = useUpdateUserEmail();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    updateUserEmail(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          setSuccess("Your email address was changed.");
          setError("");
        },
        onError: (err) => {
          setError(err.message);
          setSuccess("");
        },
        onSettled: () => {
          setClickedModal(false);
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-96 lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg ">
      <div
        role="button"
        onClick={() => setClickedModal(false)}
        className="me-2 ms-auto mt-2 flex h-[39px] w-[39px] items-center justify-center rounded-full  text-center hover:cursor-pointer hover:bg-stone-100"
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mx-auto mt-64 flex w-80 flex-col gap-y-2 text-center lg:mt-0">
          <h2
            className="mt-10 pb-3 text-2xl font-bold"
            style={{ color: "#1e0a3c" }}
          >
            Change your email address
          </h2>
          <LoginSignupInput
            id="email"
            type="text"
            name="Email address"
            register={register}
            errors={errors}
          />
          <LoginSignupInput
            id="password"
            type="password"
            name="Password"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="flex- w-[35%] rounded-md bg-orange-600 px-8 py-2 font-medium text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeEmailModal;
