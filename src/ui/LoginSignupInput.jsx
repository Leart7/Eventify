import { useState } from "react";

function LoginSignupInput({ type, name }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={`${type}`}
        className="input-style w-full rounded-sm border border-gray-300  pt-5  text-sm hover:border-gray-400"
      />
      <label
        className={`${
          focused ? "text-blue-600" : "text-gray-500"
        } absolute left-2 top-1  px-1 text-xs `}
        htmlFor="email"
      >
        {name}
      </label>
    </div>
  );
}

export default LoginSignupInput;
