import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { AgendaSchema } from "../services/Schemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { saveAgendaSlice } from "../redux/agendaSlice";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour < 10 ? `0${hour}` : hour;
      const formattedMinute = minute === 0 ? "00" : minute;
      const timeString = `${formattedHour}:${formattedMinute} ${
        hour < 12 ? "am" : "pm"
      }`;

      options.push(
        <option
          className=""
          key={`${hour}-${minute}`}
          value={`${formattedHour}:${formattedMinute}:00`}
        >
          {timeString}
        </option>,
      );
    }
  }
  return options;
};

export function CreateAgenda() {
  const dispatch = useDispatch();
  const [agendaArray, setAgendaArray] = useState([]);

  const onSubmit = (values, { resetForm }) => {
    // Create a new agenda object using the form values
    const newAgenda = {
      title: values.AgendaTitle,
      startTime: values.AgendaStartTime,
      endTime: values.AgendaEndTime,
      speaker: values.Speaker,
      description: values.Description,
    };

    setAgendaArray((prevAgendas) => [...prevAgendas, newAgenda]);

    resetForm();
  };

  const finishAgenda = () => {
    dispatch(saveAgendaSlice(agendaArray));
  };

  // console.log("Agenda Array:", agendaArray);
  const [isAgenda, setIsAgenda] = useState(false);

  const AgendaClick = () => {
    setIsAgenda(!isAgenda);
  };
  const {
    values,
    errors,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      AgendaTitle: "",
      AgendaStartTime: "",
      AgendaEndTime: "",
      Speaker: "",
      Description: "",
    },
    validationSchema: AgendaSchema,
    onSubmit,
  });
  //#fff7f6   #f5f6f9   #f5f9f7   #fff7fa
  // console.log(values);
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="mx-auto mb-8 mt-28 flex w-[55%] flex-col items-center  justify-center rounded-md border-[3.2px] border-dashed  hover:border-blue-800 ">
        <div
          className={`flex   w-full flex-col   p-8 text-black ${
            isAgenda ? "hidden" : ""
          }`}
        >
          <h1 className="pb-4  text-2xl font-semibold ">
            Add more sections to your event page
          </h1>
          <p className="">
            Make your event stand out even more. These sections help attendees
            find information and answer their questions -which means more ticket
            sales and less time answering messages.
          </p>

          <div className="flex justify-between pt-10 ">
            <div className="flex items-center ">
              <p className=" flex h-10 w-10 items-center justify-center rounded-md bg-slate-100">
                <FontAwesomeIcon icon={faCalendar} />{" "}
              </p>
              <p className="pl-4  text-lg font-medium">Agenda</p>
            </div>
            <button
              className="h-[3pc]  w-[7pc] rounded-lg border-[2.4px] border-slate-400  text-base font-medium  hover:border-slate-800  hover:bg-slate-100"
              onClick={(e) => {
                e.preventDefault();
                AgendaClick();
              }}
            >
              {" "}
              Add{" "}
            </button>
          </div>
          <p className="border-b-2 border-gray-200 pt-5"> </p>
        </div>
        <div className={`  w-full p-8 ${isAgenda ? " " : "hidden"} `}>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Agenda</h1>
            <button
              onClick={finishAgenda}
              className="text-sm font-medium text-red-700"
            >
              Finish Agenda
            </button>
          </div>
          <p className="pt-3 text-sm">
            Add an itinerary, schedule, or lineup to your event. You can include
            a time, a description of what will happen, and who will host or
            perform during the event. (Ex. Speaker, performer, artist, guide,
            etc.) If your event has multiple dates, you can add a second agenda.
          </p>
          <p className="pt-4 font-medium ">Agenda</p>
          <div className="w-full pt-4">
            <div className="mb-8 grid gap-6 ">
              {agendaArray.map((agenda, index) => (
                <div
                  className=" grid gap-3 rounded-xl p-5"
                  key={index}
                  style={{
                    backgroundColor:
                      index % 4 === 0
                        ? "#fff7f6"
                        : index % 4 === 1
                        ? "#f5f6f9"
                        : index % 4 === 2
                        ? "#f5f9f7"
                        : "#fff7fa",
                  }}
                >
                  <div className="text-sm">
                    {agenda.startTime} - {agenda.endTime}
                  </div>
                  <div className="text-lg font-semibold">{agenda.title}</div>
                  <div className="flex w-min items-center justify-center rounded-3xl bg-white p-4 text-sm font-semibold">
                    {agenda.speaker}
                  </div>
                  <hr />
                  <div className="text-sm ">{agenda.description}</div>
                </div>
              ))}
            </div>

            <hr className="mb-4 " />

            <div className="relative h-12 w-full min-w-[200px]">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                id="AgendaTitle"
                className="text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 peer h-full w-full rounded-[7px]  border border-slate-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-1 transition-all placeholder-shown:border hover:outline-2 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0  disabled:border-0"
                placeholder=" "
              />
              <label className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-semibold leading-tight text-black transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2  peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
                Title <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="flex w-[60%] gap-6 pt-6">
              {/* <div className="text-blue-gray-500 absolute  right-4 top-2/4 grid h-5 w-5 -translate-y-2/4  place-items-center">
                  <a className="text-black-400 ">
                    {" "}
                    <FontAwesomeIcon icon={faClock} />
                  </a>
                </div> */}

              <select
                id="AgendaStartTime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.startTime}
                className="block w-full  rounded-md border border-gray-900 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {generateTimeOptions()}
              </select>
              <select
                id="AgendaEndTime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.endTime}
                className="block w-full  rounded-md border border-gray-900 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {generateTimeOptions()}
              </select>
            </div>
            <div className="relative mt-6 h-[70px] w-full min-w-[200px] rounded-md border-2">
              <textarea
                id="Description" // Added an id to associate the label with the textarea
                className="text-blue-gray-700  disabled:bg-blue-gray-50 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full resize-none rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0"
                placeholder=" "
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="Description"
                className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-medium  leading-tight text-gray-900 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"
              >
                Event Description <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="relative mt-6 h-12 w-[28%] min-w-[200px]">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.speaker}
                id="Speaker"
                className="text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 peer h-full w-full rounded-[7px]  border border-slate-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-1 transition-all placeholder-shown:border hover:outline-2 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0  disabled:border-0"
                placeholder=" "
              />
              <label className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-semibold leading-tight text-black transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2  peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
                Host/Artist name <span className="text-red-500">*</span>
              </label>
            </div>
          </div>{" "}
          <div className=" mt-8 text-center ">
            <button
              type="submit"
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSubmit();
              }}
              className="w-full rounded-md bg-[#eeedf2] py-5 text-sm font-semibold text-[#3659e3] hover:bg-[#d4d3db]"
            >
              + Add Slot
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
