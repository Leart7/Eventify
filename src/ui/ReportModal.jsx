import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReportEventReasons } from "../reactQuery/useReportEventReasons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountSettingsRadioButton from "./AccountSettingsRadioButton";
import LoginSignupInput from "./LoginSignupInput";
import { useReportEvent } from "../reactQuery/useReportEvent";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function ReportModal({ setClickedModal }) {
  const { reportReasons } = useReportEventReasons();
  const { reportEvent } = useReportEvent();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [chosenReason, setChosenReason] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: {
      reason: null,
      description: "",
      email: "",
    },
  });

  function onSubmit(data) {
    if (chosenReason === null) {
      setError("reason", {
        type: "manual",
        message: "Please tell us why you are reporting this event.",
      });
      return;
    }

    reportEvent(
      {
        reportEventReasonId: chosenReason,
        description: data.description,
        email: data.email,
        eventId: +eventId,
      },
      {
        onSuccess: () => {
          setClickedModal(false);

          navigate("/");
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
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white  shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-[90%] lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg ">
      <div className="flex items-center border-b pb-3">
        <p className="mx-auto mt-2 text-xl font-semibold">Report This Event</p>
        <div
          role="button"
          onClick={() => setClickedModal(false)}
          className="absolute inset-0 left-[92%] top-2 flex h-[39px] w-[39px] items-center justify-center rounded-full  text-center hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>

      <div className="mx-auto mt-5 flex w-3/4 flex-col gap-y-5 text-sm">
        <p>
          Please help Eventify investigate this event by providing information
          about why you're reporting it.
        </p>
        <p className="-mb-4 text-lg">Reason For Report</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.reason?.message && (
            <p className="my-2 font-medium text-red-600">
              {errors.reason?.message}
            </p>
          )}
          {reportReasons?.map((reason) => (
            <AccountSettingsRadioButton
              key={reason.id}
              chosenReason={chosenReason}
              id={reason.id}
              labelName={reason.name}
              setChosenReason={setChosenReason}
              setValue={setValue}
            />
          ))}
          <div className="mt-10 flex flex-col gap-y-3">
            <LoginSignupInput
              id="email"
              type="text"
              name="Your Email"
              register={register}
              errors={errors}
            />
            <LoginSignupInput
              id="description"
              type="text"
              name="Description"
              register={register}
              height={28}
              errors={errors}
            />
          </div>
          <div className="mt-10 flex items-center gap-x-4">
            <button
              type="submit"
              className=" h-11 rounded-md bg-orange-600 px-8 py-2 font-medium text-white"
            >
              Submit Report
            </button>

            <button
              onClick={() => setClickedModal(false)}
              type="button"
              className=" h-11 w-[104px] cursor-pointer  rounded-[4px] text-center text-sm font-semibold text-[#3659e3] transition-all hover:bg-[#f8f7fa]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;
