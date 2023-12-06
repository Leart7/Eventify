import { Link } from "react-router-dom";
import LoginSignupInput from "../ui/LoginSignupInput";
import LoginSignupButton from "../ui/LoginSignupButton";
import OtherLoginSignupMethods from "../ui/OtherLoginSignupMethods";
import LoginSignupLayout from "../ui/LoginSignupLayout";

function SignupPage() {
  return (
    <LoginSignupLayout from="signup">
      <form className="mt-3 flex flex-col gap-y-2">
        <LoginSignupInput type="text" name="Email address" />
        <LoginSignupButton
          name="Continue"
          background="bg-orange-600"
          hover="hover:bg-orange-500"
          textColor="text-white"
        />
      </form>
      <div className="relative my-5 font-medium text-gray-400">
        <hr></hr>
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 transform  rounded-full border bg-white px-4 ">
          or
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <button
          className={`transition-fade-in2 mt-3 rounded-md border py-3  font-medium hover:bg-gray-50`}
        >
          <img src="googleLogo.png" className="me-3 inline-block w-6" />{" "}
          Continue as Leart
        </button>
      </div>
      <OtherLoginSignupMethods from="signup" />
      <Link
        to="/login"
        className="mt-5 hidden text-sm font-medium text-blue-700 hover:underline lg:block"
      >
        Log in
      </Link>
      <img
        src="loginImage.jpg"
        className="absolute right-0 top-0 hidden h-screen w-screen overflow-hidden object-cover lg:block lg:w-1/2"
        alt="Login Image"
      />
    </LoginSignupLayout>
  );
}

export default SignupPage;
