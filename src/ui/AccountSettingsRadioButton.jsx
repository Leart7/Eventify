function AccountSettingsRadioButton({
  id,
  labelName,
  setChosenReason,
  chosenReason,
  setValue,
}) {
  return (
    <div className="my-3 flex items-center gap-x-2">
      <input
        type="radio"
        id={id}
        checked={id === chosenReason}
        name="reason"
        className="h-4 w-4"
        onChange={() => {
          setValue("reason", id);
          setChosenReason(id);
        }}
      />
      <label htmlFor={id} className="hover:cursor-pointer">
        {labelName}
      </label>
    </div>
  );
}

export default AccountSettingsRadioButton;
