import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function LoginSignupLayout({ from, children }) {
  const queryClient = useQueryClient();

  useEffect(
    function () {
      queryClient.removeQueries();
    },
    [queryClient],
  );

  return (
    <>
      <div className="elliptical-background sm:hidden"></div>
      <div className="lg:w-1/2">
        <div className="mx-auto flex w-96 flex-col gap-y-6">
          <Link to="/">
            <img src="eventifyLogo.png" className="w-24" />
          </Link>

          <div className="flex items-center justify-between">
            <h2
              className="text-3xl font-extrabold lg:text-5xl"
              style={{ color: "#1e0a3c" }}
            >
              {from === "login" ? "Log in" : "Create an account"}
            </h2>
            <Link
              to={`${from === "login" ? "/signup" : "/login"}`}
              className="text-sm font-medium text-blue-700 hover:underline lg:hidden"
            >
              {from === "login" ? "Sign up" : "Log in"}
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default LoginSignupLayout;
