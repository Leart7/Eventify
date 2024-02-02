function AccountSettingsInput({
  id,
  labelName,
  defaultValue,
  disabled,
  register,
  errors,
  type,
  incorrectPassword,
  required = true, // Default to true if not provided
}) {
  return (
    <div className="flex flex-col">
      <label className="my-1 hover:cursor-pointer" htmlFor={id}>
        {labelName}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        className={`${
          id === "confirmPassword" &&
          incorrectPassword &&
          "border-red-600 outline-none"
        } ${errors[id]?.message && "border-red-600 outline-none"} ${
          !errors[id]?.message && !incorrectPassword && "outline-blue-600"
        }  w-[65%] max-w-md rounded-md border px-3 py-2`}
        {...register(id, {
          ...(required && { required: "Field is required" }), // Add required validation only if required is true
          validate: {
            notClose: (fieldValue) => {
              if (id === "close") {
                return fieldValue === "CLOSE" || "Please enter 'CLOSE'";
              }
            },
          },
        })}
      />
      <p className="text-sm text-red-600">{errors[id]?.message}</p>
    </div>
  );
}

export default AccountSettingsInput;
