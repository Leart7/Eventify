function LoginSignupButton({
  name,
  background,
  hover,
  textColor,
  additional,
  type,
  onClick,
}) {
  return (
    <button
      onClick={() => {
        if (type !== "submit") {
          onClick();
        }
      }}
      type={type}
      className={`${background} ${hover} ${textColor} ${additional} transition-fade-in2 mt-3 rounded-md  py-3 font-medium`}
    >
      {name}
    </button>
  );
}

export default LoginSignupButton;
