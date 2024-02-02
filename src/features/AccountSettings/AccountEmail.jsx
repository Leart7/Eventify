import { useState } from "react";
import { useModalCloser } from "../../hooks/useModalCloser";
import { useUser } from "../../reactQuery/useUser";
import Overlay from "../../ui/Overlay";
import ChangeEmailModal from "./ChangeEmailModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AccountEmail() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [clickedModal, setClickedModal] = useModalCloser();
  const { user } = useUser();

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
          Change Email
        </h1>
        <hr></hr>
        <h2
          className="mt-10 pb-3 text-2xl font-bold"
          style={{ color: "#1e0a3c" }}
        >
          Account Email Address
        </h2>
        <p className="text-xl text-gray-700">{user?.email}</p>
        <button
          onClick={() => setClickedModal(true)}
          className="hover:bg-stone-5 mt-5 rounded-md border-2 border-gray-400 px-7 py-[0.65rem] text-sm font-medium transition-all duration-150 hover:border-gray-500 hover:bg-gray-100"
        >
          Change
        </button>
      </div>
      {clickedModal && (
        <>
          <ChangeEmailModal
            setClickedModal={setClickedModal}
            setError={setError}
            setSuccess={setSuccess}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default AccountEmail;
