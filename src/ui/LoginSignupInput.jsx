import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function LoginSignupInput({
  id,
  type,
  name,
  register,
  errors,
  incorrect,
  email,
  disabled,
  setContinued,
  setValue,
  newPassword,
  height,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        disabled={id === "email" && disabled}
        id={id}
        {...register(id, {
          required: `${name} is required`,
          pattern: {
            value:
              id === "email" || id === "confirmEmail"
                ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                : undefined,
            message: "Please enter a valid email address",
          },
          validate: {
            notMatching: (fieldValue) => {
              if (id === "confirmEmail") {
                return (
                  fieldValue === email ||
                  "Email address doesn't match. Please try again"
                );
              }
            },
            notMatchingPasswords: (fieldValue) => {
              if (id === "confirmPassword") {
                return (
                  fieldValue === newPassword ||
                  "The repeat password doesn't match the new password."
                );
              }
            },
          },
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={`${type}`}
        className={`${
          errors[id]?.message || incorrect
            ? "border-red-600"
            : "border-gray-300 hover:border-gray-400"
        } input-style w-full rounded-sm border pt-5 text-sm ${
          height && `h-${height}`
        }`}
      />
      {id === "email" && disabled && (
        <FontAwesomeIcon
          role="button"
          onClick={() => {
            setContinued(false);
            setValue("email", "");
          }}
          icon={faPencil}
          className="absolute right-5 top-4 hover:cursor-pointer hover:text-stone-800 "
        />
      )}
      <label
        className={`${(errors[id]?.message || incorrect) && "text-red-600"} ${
          focused ? "text-blue-600" : "text-gray-500"
        }  absolute left-2 top-1  px-1 text-xs `}
        htmlFor={id}
      >
        {name}
      </label>
      <p className="text-sm text-red-600">{errors[id]?.message}</p>
    </div>
  );
}

export default LoginSignupInput;
