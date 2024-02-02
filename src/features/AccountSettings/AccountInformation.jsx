import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountSettingsInput from "../../ui/AccountSettingsInput";
import { useForm } from "react-hook-form";
import { useUser } from "../../reactQuery/useUser";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useUpdateUser } from "../../reactQuery/useUpdateUser";

function AccountInformation() {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const { updateUser } = useUpdateUser();
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setValue("image_Url", URL.createObjectURL(file));
  };

  useEffect(
    function () {
      if (user) {
        setValue("image_Url", user?.image_Url);
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("phoneNumber", user.phoneNumber);
        setValue("organization", user.organization);
        setValue("website", user.website);
        setValue("address", user.address);
        setValue("city", user.city);
        setValue("country", "Kosovo");
        setValue("zip", user.zip);
        setValue("organizationAddress", user.organizationAddress);
        setValue("organizationCity", user.organizationCity);
        setValue("organizationCountry", "Kosovo");
        setValue("organizationZip", user.organizationZip);
      }
    },
    [setValue, user],
  );

  const image = watch("image_Url");

  function onSubmit(data) {
    const userData = {
      image: selectedFile,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber || "",
      organization: data.organization || "",
      website: data.website || "",
      address: data.address || "",
      city: data.city || "",
      zip: data.zip || "",
      organizationAddress: data.organizationAddress || "",
      organizationCity: data.organizationCity || "",
      organizationZip: data.organizationZip || "",
    };

    updateUser(userData, {
      onSuccess: () => {
        setSuccess("Account information updated successfully.");
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    console.log(selectedFile);
  }

  return (
    <>
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
        <p className="text-end ">Eventbrite account since Nov 2, 2023</p>
        <h1 className="pb-3 text-3xl font-bold" style={{ color: "#1e0a3c" }}>
          Account Information
        </h1>
        <hr></hr>
        <h2
          className="mt-10 pb-3 text-2xl font-bold"
          style={{ color: "#1e0a3c" }}
        >
          Profile Photo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-52 w-64 items-center justify-center rounded-md border text-center">
            <label
              htmlFor="profileImageInput"
              className={`${
                image?.length > 0 ? "px-12 py-7" : "p-9"
              } relative cursor-pointer rounded-md border-2 border-dashed hover:border-blue-700`}
            >
              {image?.length > 0 ? (
                <img src={image} alt="Preview" className="h-32 w-32" />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-3xl text-blue-700"
                  />
                  <p className="text-2xl uppercase text-blue-700">
                    Add a profile
                    <br /> image
                  </p>
                  <p className="text-stone-400">Choose a file to upload</p>
                </>
              )}

              <input
                type="file"
                id="profileImageInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <h2
            className="mt-10 pb-3 text-2xl font-bold"
            style={{ color: "#1e0a3c" }}
          >
            Contact Information
          </h2>
          <AccountSettingsInput
            id="firstName"
            labelName="First Name"
            register={register}
            errors={errors}
          />
          <AccountSettingsInput
            id="lastName"
            labelName="Last Name"
            register={register}
            errors={errors}
          />
          <AccountSettingsInput
            id="phoneNumber"
            labelName="Phone Number"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="organization"
            labelName="Comapny / Organization"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="website"
            labelName="Website"
            register={register}
            errors={errors}
            required={false}
          />
          <h2
            className="mt-10 pb-3 text-2xl font-bold"
            style={{ color: "#1e0a3c" }}
          >
            Home Address
          </h2>
          <AccountSettingsInput
            id="address"
            labelName="Address"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="city"
            labelName="City"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="country"
            labelName="Country"
            defaultValue="Kosovo"
            disabled={true}
            register={register}
            errors={errors}
          />
          <AccountSettingsInput
            id="postalCode"
            labelName="Zip / Postal Code"
            register={register}
            errors={errors}
            required={false}
          />
          <h2
            className="mt-10 pb-3 text-2xl font-bold"
            style={{ color: "#1e0a3c" }}
          >
            Organization Address
          </h2>
          <AccountSettingsInput
            id="organizationAddress"
            labelName="Address"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="organizationCity"
            labelName="City"
            register={register}
            errors={errors}
            required={false}
          />
          <AccountSettingsInput
            id="organizationCountry"
            labelName="Country"
            defaultValue="Kosovo"
            disabled={true}
            register={register}
            errors={errors}
          />
          <AccountSettingsInput
            id="organizationPostalCode"
            labelName="Zip / Postal Code"
            register={register}
            errors={errors}
            required={false}
          />
          <button
            type="submit"
            className="my-5 rounded-md bg-orange-600 px-8 py-2 font-medium text-white"
          >
            Save
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}

export default AccountInformation;
