import { useFormik } from "formik";
import { basicSchema } from "../services/Schemas";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faParagraph,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { setAreaLocation } from "../redux/mapAreaSlice";
import { reverseGeocode } from "../hooks/useReverseGeocoding";
import { setUserCity } from "../redux/userCitySlice";
import { Datepicker } from "flowbite-react";
import SearchLocation from "../features/Filtering/SearchLocation";
import CitiesList from "./CitiesList";
import SearchCities from "./SearchCities";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import createEventSlice from "../redux/createEventSlice";
import { saveEventData } from "../redux/createEventSlice";

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

export default function CreateEventForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSearchInput = true;
  const [searchClicked, setSearchClicked] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [queryCities, setQueryCities] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { cities, isLoading, error } = useCities();
  useEffect(
    function () {
      if (locationQuery.length !== 0) {
        setQueryCities(
          cities.results
            ?.map((c) => ({
              name: c.name,
              location: c.location,
            }))
            .filter((c) =>
              c.name.toLowerCase().startsWith(locationQuery.toLowerCase()),
            ),
        );
        setSearchClicked(false);
      }
    },
    [cities.results, locationQuery],
  );

  const { activeLocationFilter } = useSelector(
    (store) => store.activeLocationFilter,
  );
  const CityData = useSelector((store) => store.searchModalCity.city);

  const placeHolderCondition = searchClicked
    ? "Search for a city"
    : CityData[2]
    ? CityData[2]
    : "Search for a city";

  const classNameCondition = searchClicked
    ? "placeholder-gray-400"
    : CityData[2] || searchParams.get("box") !== null
    ? "placeholder-black"
    : "placeholder-gray-400";

  const currencyMapping = {
    USD: 2,
    EUR: 4,
    CAD: 3,
    GBP: 1,
    // Add more currencies as needed
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    const currencyId = currencyMapping[values.Currency];
    const formDataToSave = {
      title: values.EventTitle,
      organizer: values.Organizer,
      startTime: values.EventStart,
      endTime: values.EventEnd,
      formatId: values.Format,
      categoryId: values.Category,
      languageId: values.Language,
      city: CityData[2],
      latitude: CityData[0],
      longitude: CityData[1],
      price: values.Price,
      currencyId: currencyId,
    };
    console.log(formDataToSave);

    dispatch(saveEventData(formDataToSave));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/detail");
    actions.resetForm();
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
      EventTitle: "",
      Organizer: "",
      EventStart: "",
      EventEnd: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      Format: 4,
      Category: "",
      Language: 3,
      EndSales: "",
      Price: 0,
      Capacity: 0,
      Currency: "USD",
      endSalesTime: "",
      endSalesDate: "",
      Address: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  //usd-2   euro-4   cad-3   gbp-1
  const isFormCompleted = Object.values(values).every(Boolean);
  const handleTimeChange = (event) => {
    // Assuming your select returns a string value
    const selectedTime = event.target.value;
    console.log(selectedTime);
    setFieldValue("startTime", selectedTime);
  };
  const handleEndSalesTimeChange = (event) => {
    // Assuming your select returns a string value
    const selectedTime = event.target.value;
    console.log(selectedTime);
    setFieldValue("endSalesTime", selectedTime);
  };
  const handleIncrement = () => {
    // Increase the Capacity field by 1
    setFieldValue("Capacity", parseInt(values.Capacity, 10) + 1);
  };
  const handleDecrement = () => {
    // Decrease the Capacity field by 1, but not below 0
    setFieldValue("Capacity", Math.max(0, parseInt(values.Capacity, 10) - 1));
  };
  const handleEndTimeChange = (event) => {
    // Assuming your select returns a string value
    const selectedTime = event.target.value;
    console.log(selectedTime);
    setFieldValue("endTime", selectedTime);
  };
  const handleDateChange = (date) => {
    setFieldValue("startDate", date.toDateString());
    // Check if both date and time are selected
    if (date && values.startTime !== "") {
      const time =
        values.startTime.split(":")[0] + ":" + values.startTime.split(":")[1];
      const mergedDateTime = new Date(date.toDateString() + " " + time);

      console.log(mergedDateTime);

      // Update the Formik field
      setFieldValue("EventStart", mergedDateTime.toISOString());
    }
    console.log(values.EventStart);
  };
  const handleEndDateChange = (date) => {
    setFieldValue("endDate", date.toDateString());
    // Check if both date and time are selected
    if (date && values.endTime !== "") {
      const time =
        values.endTime.split(":")[0] + ":" + values.endTime.split(":")[1];
      const mergedDateTime = new Date(date.toDateString() + " " + time);

      console.log(mergedDateTime);

      // Update the Formik field
      setFieldValue("EventEnd", mergedDateTime.toISOString());
    }
    console.log(values.EventEnd);
  };
  const handleEndSalesChange = (date) => {
    console.log(date);
    setFieldValue("endSalesDate", date.toDateString());
    // Check if both date and time are selected
    if (date && values.endSalesTime !== "") {
      const time =
        values.endSalesTime.split(":")[0] +
        ":" +
        values.endSalesTime.split(":")[1];
      const mergedDateTime = new Date(date.toDateString() + " " + time);

      console.log(mergedDateTime);

      // Update the Formik field
      setFieldValue("EndSales", mergedDateTime.toISOString());
    }
  };
  const handleTextChange = (e) => {
    const inputValue = e.target.value;

    // Truncate the input value if it exceeds 75 characters
    const truncatedValue = inputValue.slice(0, 75);

    // Call Formik's handleChange to update the Formik state
    handleChange(e);

    // Update Formik state with the truncated value
    setFieldValue("EventTitle", truncatedValue);
  };
  const handleDiscardChanges = () => {
    // Reset the form to its initial state
    resetForm();
  };
  // const handleCurrencySelection = (currency) => {
  //   setFieldValue("Currency", currency);
  // };
  const handleIdChange = (e) => {
    const { id, value } = e.target;

    // Convert value to number if id is one of the specified fields
    const numericFields = ["Language", "Category", "Format", "Currency"];
    const newValue = numericFields.includes(id) ? parseInt(value, 10) : value;

    // Use setFieldValue to update the Formik state
    setFieldValue(id, newValue);
  };

  const currentDate = new Date();
  // console.log(values);
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        autoComplete=""
        className="mx-auto w-[65%]"
      >
        <div className="mb-[180px] w-full">
          <div className="mt-16 flex justify-center gap-3">
            <div className="w-[40px]">
              <FontAwesomeIcon
                className="pt-1  text-3xl text-gray-400"
                icon={faParagraph}
              />
            </div>
            <div className="w-[85%]">
              <div>
                <h1 className="mb-7 text-3xl font-bold text-[#1e0a3c]">
                  Basic Info
                </h1>
                <div>
                  {" "}
                  <p className="mb-6 text-sm font-normal text-[#39364f]">
                    {" "}
                    Name your event and tell event-goers why they should come.
                    Add details that highlight what makes it unique.
                  </p>
                </div>

                <div className="relative ">
                  <label
                    className={`absolute left-0 top-0 pl-[13px] pt-[5px] text-xs ${
                      errors.EventTitle && touched.EventTitle
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                    htmlFor=""
                  >
                    Event Title
                  </label>

                  <input
                    type="text"
                    id="EventTitle"
                    placeholder="Be clear and descriptive"
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    value={values.EventTitle}
                    className={`w-full pt-[14px]  ${
                      errors.EventTitle && touched.EventTitle
                        ? "border-red-600"
                        : ""
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    {errors.EventTitle && touched.EventTitle && (
                      <p className="text-xs text-red-600">
                        {errors.EventTitle}
                      </p>
                    )}
                    <div className="ml-auto text-sm">
                      <span>{`${values.EventTitle.length}/75`}</span>
                    </div>
                  </div>
                </div>
                <div className="relative ">
                  <label
                    className={`absolute left-0 top-0 pl-[13px]  pt-[5px] text-xs text-gray-400`}
                    htmlFor=""
                  >
                    Organizer
                  </label>

                  <input
                    type="text"
                    id="Organizer"
                    placeholder="Tell attendees who is organizing this event"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Organizer}
                    className={`w-full pt-[14px] ${
                      errors.Organizer && touched.Organizer
                        ? "border-red-600"
                        : ""
                    }`}
                  />
                  <div className="flex justify-between">
                    {errors.Organizer && touched.Organizer && (
                      <p className="text-xs text-red-600">{errors.Organizer}</p>
                    )}
                  </div>
                </div>
                <aside className=" mt-6 flex w-full gap-5">
                  <select
                    onChange={handleIdChange}
                    onBlur={handleBlur}
                    id="Format"
                    className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected>Type</option>
                    <option value="8">Appearnce and Singing</option>
                    <option value="9">Attraction</option>
                    <option value="18">Camp,Trip, or Retreat</option>
                    <option value="4">Class, Training, or Workshop</option>
                    <option value="15">Concert or Preformance</option>
                    <option value="5">Conference</option>
                    <option value="10">Convention</option>
                    <option value="12">Dinner or Gala</option>
                    <option value="6">Festival or Fair</option>
                    <option value="13">Game or Competition</option>
                    <option value="14">Meeting or Networking Event</option>
                    <option value="11">Other</option>
                    <option value="7">Party or Social Gathering</option>
                    <option value="16">Race or Endurance Event</option>
                    <option value="17">Rally</option>
                    <option value="19">Screening</option>
                    <option value="20">Seminar ot Talk</option>
                    <option value="22">Tour</option>
                    <option value="21">Tournament</option>
                  </select>

                  <select
                    onChange={handleIdChange}
                    onBlur={handleBlur}
                    id="Category"
                    className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected>Category</option>
                    <option value="10">Auto, Boat & Air</option>
                    <option value="6">Business & Professional</option>
                    <option value="11">Charity & Causes</option>
                    <option value="12">Comunity & Culture</option>
                    <option value="13">Family & Education</option>
                    <option value="14">Fashion & Beauty</option>
                    <option value="15">Film, Media & Entertainment</option>
                    <option value="7">Food & Drink</option>
                    <option value="19">Government & Politics</option>
                    <option value="8">Health & Wellness</option>
                    <option value="16">Hobbies & Special Interest</option>
                    <option value="17">Home & Lifestyle</option>
                    <option value="9">Music</option>
                    <option value="26">Other</option>
                    <option value="18">Preforming & VisualArts</option>
                    <option value="20">Religion & Spirituality</option>
                    <option value="21">School Activities</option>
                    <option value="22">Science & Technology</option>
                    <option value="23">Seasonal & Holiday</option>
                    <option value="24">Sports & Fitness</option>
                    <option value="25">Travel & Outdoor</option>
                  </select>
                </aside>
              </div>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-16 flex justify-center gap-3 ">
            <div className="w-[40px]">
              <FontAwesomeIcon
                className="pt-1  text-3xl text-gray-400"
                icon={faMapLocationDot}
              />
            </div>
            <div className="w-[85%]">
              <div>
                <h1 className="mb-7 text-3xl font-bold text-[#1e0a3c]">
                  Location
                </h1>
                <div>
                  {" "}
                  <p className="mb-6 text-sm font-normal text-[#39364f]">
                    {" "}
                    Help people in the area discover your event and let
                    attendees know where to show up.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className=" out mx-auto w-1/2 rounded-md  border-2 border-gray-300 py-3 font-normal hover:border-blue-800 hover:bg-[#ebeefc] hover:text-blue-800">
                    City
                  </button>
                  {/* <button className="hover:text-blue-800 hover:border-blue-800 hover:bg-[#ebeefc] hover:border-2 w-1/2 border-[1px] border-gray-300 py-3 rounded-md font-normal">Online</button> */}
                </div>
                <h3 className="mb-2 mt-6 text-[14px] font-semibold text-[#39364f]">
                  Choose the city where the Event will take place
                </h3>
                <div className="relative mx-auto">
                  <input
                    className="w-full  border-2 border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="search"
                    id="locationInput"
                    onFocus={() => setSearchClicked(true)}
                    onBlur={() => {
                      setSearchClicked(false);
                      setLocationQuery("");
                    }}
                    onKeyDown={(e) => {
                      e.key === "Escape" && e.target.blur();
                      e.key !== "Escape" && setSearchClicked(false);
                    }}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      e.target.value.length === 0 && setSearchClicked(true);
                    }}
                    placeholder={placeHolderCondition}
                    // className={`${classNameCondition} unselectable w-full border-none ps-7 text-lg font-medium  outline-none`}
                    value={locationQuery}
                  />
                  {searchClicked && (
                    <SearchCities setSearchClicked={setSearchClicked} />
                  )}
                  {locationQuery.length !== 0 && queryCities.length !== 0 && (
                    <CitiesList queryCities={queryCities} from="modal" />
                  )}

                  <button className="absolute inset-y-0 right-0 flex items-center border border-gray-300 bg-gray-100 px-4 text-gray-700  hover:bg-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative mt-8">
                  <label
                    className={`absolute left-0 top-0 pl-[13px] pt-[5px] text-xs font-medium text-gray-500`}
                    htmlFor=""
                  >
                    Address
                  </label>

                  <input
                    type="text"
                    id="Address"
                    placeholder="Be clear and descriptive"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Address}
                    className={`w-full  pt-[14px]  ${
                      errors.Address && touched.Address ? "border-red-600" : ""
                    }`}
                  />
                </div>

                {/* <LocationDropdown /> */}
              </div>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mb-10 mt-16 flex justify-center gap-3">
            <div className="w-[40px]">
              <FontAwesomeIcon
                className="pt-1  text-3xl text-gray-400"
                icon={faCalendarDays}
              />
            </div>
            <div className="w-[85%]">
              <h1 className="mb-7 text-3xl font-bold text-[#1e0a3c]">
                Date and Time
              </h1>
              <div>
                <p className="mb-6 text-sm font-normal text-[#39364f]">
                  Tell event-goers when your event starts and ends so they can
                  make plans to attend.
                </p>
              </div>
              <div className="grid">
                <h3 className="mb-2 mt-6 text-[14px] font-semibold text-[#39364f]">
                  Choose the start of the Event
                </h3>
                <div className="mb-4 flex gap-4">
                  <Datepicker
                    onClick={(e) => {
                      e.target.style.outline = "#0b57d0";
                    }}
                    className="w-1/2"
                    style={{ borderRadius: 0 }}
                    id="startDate"
                    onSelectedDateChanged={handleDateChange}
                    selected={values.startDate}
                    onBlur={handleBlur}
                    value={values.startDate}
                    defaultDate={currentDate}
                    placeholder={currentDate.toDateString()}
                  ></Datepicker>
                  <div>
                    <select
                      id="startTime"
                      onChange={handleTimeChange}
                      onBlur={handleBlur}
                      value={values.startTime}
                      className="block   border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>
                </div>
                <h3 className="mb-2 mt-6 text-[14px] font-semibold text-[#39364f]">
                  Choose when Event ends
                </h3>
                <div className="mb-4 flex gap-4">
                  <Datepicker
                    className="w-1/2"
                    onClick={(e) => {
                      e.target.style.outline = "#0b57d0";
                    }}
                    style={{ borderRadius: 0 }}
                    id="endDate"
                    onSelectedDateChanged={handleEndDateChange}
                    selected={values.endDate}
                    onBlur={handleBlur}
                    value={values.endDate}
                    defaultDate={currentDate}
                    placeholder={currentDate.toDateString()}
                  ></Datepicker>
                  <div>
                    <select
                      id="endTime"
                      onChange={handleEndTimeChange}
                      onBlur={handleBlur}
                      value={values.endTime}
                      className="block w-full  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>
                </div>
                <h3 className="mb-2 mt-6 text-[14px] font-semibold text-[#39364f]">
                  Choose when Event sales ends
                </h3>
                <div className="mb-4 flex gap-4">
                  <Datepicker
                    className="w-1/2"
                    onClick={(e) => {
                      e.target.style.outline = "#0b57d0";
                    }}
                    style={{ borderRadius: 0 }}
                    id="endSalesDate"
                    onSelectedDateChanged={handleEndSalesChange}
                    selected={values.endSalesDate}
                    onBlur={handleBlur}
                    value={values.endSalesDate}
                    defaultDate={currentDate}
                    placeholder={currentDate.toDateString()}
                  ></Datepicker>
                  <div>
                    <select
                      id="endSalesTime"
                      onChange={handleEndSalesTimeChange}
                      onBlur={handleBlur}
                      value={values.endSalesTime}
                      className="block w-full  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 mt-6 text-[14px] font-semibold text-[#39364f]">
                    Choose your Event Language
                  </h3>
                  <select
                    onChange={handleIdChange}
                    onBlur={handleBlur}
                    id="Language"
                    value={values.Language}
                    className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="3">English(US)</option>
                    <option value="8">Dutch (Netherlands/Belgium)</option>
                    <option value="6">French</option>
                    <option value="4">German</option>
                    <option value="7">Italian</option>
                    <option value="9">Portuguese</option>
                    <option value="5">Spanish</option>
                    <option value="10">Swedish</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mb-10 mt-16 flex justify-center gap-3">
            <div className="w-[40px]">
              <FontAwesomeIcon
                className="pt-1  text-3xl text-gray-400"
                icon={faCalendarDays}
              />
            </div>
            <div className="w-[85%]">
              <h1 className="mb-7 text-3xl font-bold text-[#1e0a3c]">
                Price & Capacity
              </h1>
              <div>
                <p className="mb-6 text-sm font-normal text-[#39364f]">
                  Provide attendees with essential details about your event's
                  cost and available capacity, enabling them to plan their
                  participation effectively.
                </p>
              </div>
              <div className=" flex">
                <div>
                  <label
                    htmlFor="Capacity"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose quantity:
                  </label>
                  <div className="relative flex max-w-[8rem] items-center">
                    <button
                      type="button"
                      id="decrement-button"
                      onClick={handleDecrement}
                      className="h-11  border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="Capacity"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      name="Capacity"
                      value={values.Capacity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="999"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      onClick={handleIncrement}
                      className="h-11  border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Please select a 5-digit number from 0 to 9.
                  </p>
                </div>
                <div className="flex items-center ">
                  <div>
                    <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Email
                    </label>
                    <div className="relative w-full">
                      <div className="pointer-events-none absolute inset-y-0 start-0 top-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="number"
                        id="Price"
                        className="z-20 block w-full border border-e-2 border-gray-300 border-e-gray-50 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-e-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                        placeholder="Enter amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      id="dropdown-currency-button"
                      data-dropdown-toggle="dropdown-currency"
                      className="z-10 inline-flex flex-shrink-0 items-center border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      {values.Currency === "USD" && (
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 15"
                          fill="none"
                        >
                          <svg
                            fill="none"
                            aria-hidden="true"
                            className="me-2 h-4 w-4"
                            viewBox="0 0 20 15"
                          >
                            <rect
                              width="19.6"
                              height="14"
                              y=".5"
                              fill="#fff"
                              rx="2"
                            />
                            <mask
                              id="a"
                              style={{ maskType: "luminance" }}
                              width="20"
                              height="15"
                              x="0"
                              y="0"
                              maskUnits="userSpaceOnUse"
                            >
                              <rect
                                width="19.6"
                                height="14"
                                y=".5"
                                fill="#fff"
                                rx="2"
                              />
                            </mask>
                            <g mask="url(#a)">
                              <path
                                fill="#D02F44"
                                fillRule="evenodd"
                                d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                clipRule="evenodd"
                              />
                              <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                              <g filter="url(#filter0_d_343_121520)">
                                <path
                                  fill="url(#paint0_linear_343_121520)"
                                  fillRule="evenodd"
                                  d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                  clipRule="evenodd"
                                />
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_343_121520"
                                x1=".933"
                                x2=".933"
                                y1="1.433"
                                y2="6.1"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset="1" stopColor="#F0F0F0" />
                              </linearGradient>
                              <filter
                                id="filter0_d_343_121520"
                                width="6.533"
                                height="5.667"
                                x=".933"
                                y="1.433"
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse"
                              >
                                <feFlood
                                  floodOpacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  result="hardAlpha"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                />
                                <feOffset dy="1" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_343_121520"
                                />
                                <feBlend
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_343_121520"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </svg>
                      )}
                      {values.Currency === "EUR" && (
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 15"
                          fill="none"
                        >
                          <svg
                            fill="none"
                            aria-hidden="true"
                            className="me-2 h-4 w-4"
                            viewBox="0 0 20 15"
                          >
                            <rect
                              width="19.6"
                              height="14"
                              y=".5"
                              fill="#fff"
                              rx="2"
                            />
                            <mask
                              id="a"
                              style={{ maskType: "luminance" }}
                              width="20"
                              height="15"
                              x="0"
                              y="0"
                              maskUnits="userSpaceOnUse"
                            >
                              <rect
                                width="19.6"
                                height="14"
                                y=".5"
                                fill="#fff"
                                rx="2"
                              />
                            </mask>
                            <g mask="url(#a)">
                              <path fill="#043CAE" d="M0 .5h19.6v14H0z" />
                              <path
                                fill="#FFD429"
                                fillRule="evenodd"
                                d="M9.14 3.493L9.8 3.3l.66.193-.193-.66.193-.66-.66.194-.66-.194.193.66-.193.66zm0 9.334l.66-.194.66.194-.193-.66.193-.66-.66.193-.66-.193.193.66-.193.66zm5.327-4.86l-.66.193L14 7.5l-.193-.66.66.193.66-.193-.194.66.194.66-.66-.193zm-9.994.193l.66-.193.66.193L5.6 7.5l.193-.66-.66.193-.66-.193.194.66-.194.66zm9.369-2.527l-.66.194.193-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm-8.743 4.86l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.194.193.66-.193.66zm7.034-6.568l-.66.193.194-.66-.194-.66.66.194.66-.193-.193.66.193.66-.66-.194zm-5.326 8.276l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.193.193.66-.193.66zM13.84 10.3l-.66.193.194-.66-.194-.66.66.194.66-.194-.193.66.193.66-.66-.193zM5.1 5.827l.66-.194.66.194-.194-.66.194-.66-.66.193-.66-.193.193.66-.193.66zm7.034 6.181l-.66.193.194-.66-.194-.66.66.194.66-.193-.193.66.193.66-.66-.194zm-5.326-7.89l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.193.193.66-.193.66z"
                                clipRule="evenodd"
                              />
                            </g>
                          </svg>
                        </svg>
                      )}
                      {values.Currency === "CAD" && (
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 15"
                          fill="none"
                        >
                          <svg
                            fill="none"
                            aria-hidden="true"
                            className="me-2 h-4 w-4"
                            viewBox="0 0 20 15"
                          >
                            <rect
                              width="19.1"
                              height="13.5"
                              x=".25"
                              y=".75"
                              fill="#fff"
                              stroke="#F5F5F5"
                              strokeWidth=".5"
                              rx="1.75"
                            />
                            <mask
                              id="a"
                              style={{ maskType: "luminance" }}
                              width="20"
                              height="15"
                              x="0"
                              y="0"
                              maskUnits="userSpaceOnUse"
                            >
                              <rect
                                width="19.1"
                                height="13.5"
                                x=".25"
                                y=".75"
                                fill="#fff"
                                stroke="#fff"
                                strokeWidth=".5"
                                rx="1.75"
                              />
                            </mask>
                            <g fill="#FF3131" mask="url(#a)">
                              <path d="M14 .5h5.6v14H14z" />
                              <path
                                fillRule="evenodd"
                                d="M0 14.5h5.6V.5H0v14zM11.45 6.784a.307.307 0 01-.518-.277l.268-1.34-.933.466-.467-1.4-.467 1.4-.933-.466.268 1.34a.307.307 0 01-.518.277.307.307 0 00-.434 0l-.25.25-.933-.467L7 7.5l-.231.231a.333.333 0 000 .471l1.164 1.165h1.4l.234 1.4h.466l.234-1.4h1.4l1.164-1.165a.333.333 0 000-.471l-.231-.23.467-.934-.934.466-.25-.25a.307.307 0 00-.433 0z"
                                clipRule="evenodd"
                              />
                            </g>
                          </svg>
                        </svg>
                      )}
                      {values.Currency === "GBP" && (
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 15"
                          fill="none"
                        >
                          <svg
                            fill="none"
                            aria-hidden="true"
                            className="me-2 h-4 w-4"
                            viewBox="0 0 20 15"
                          >
                            <rect
                              width="19.6"
                              height="14"
                              y=".5"
                              fill="#fff"
                              rx="2"
                            />
                            <mask
                              id="a"
                              style={{ maskType: "luminance" }}
                              width="20"
                              height="15"
                              x="0"
                              y="0"
                              maskUnits="userSpaceOnUse"
                            >
                              <rect
                                width="19.6"
                                height="14"
                                y=".5"
                                fill="#fff"
                                rx="2"
                              />
                            </mask>
                            <g mask="url(#a)">
                              <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                              <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M-.898-.842L7.467 4.8V-.433h4.666V4.8l8.365-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.044-1.548 6.614-4.46H0V5.166h4.672L-1.942.706-.898-.842z"
                                clipRule="evenodd"
                              />
                              <path
                                stroke="#DB1F35"
                                strokeLinecap="round"
                                strokeWidth=".667"
                                d="M13.068 4.933L21.933-.9M14.009 10.088l7.948 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.19 6.093"
                              />
                              <path
                                fill="#E6273E"
                                fillRule="evenodd"
                                d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                clipRule="evenodd"
                              />
                            </g>
                          </svg>
                        </svg>
                      )}

                      {values.Currency && (
                        <>
                          {values.Currency}
                          <svg
                            className="ms-2.5 h-2.5 w-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                    <div
                      id="dropdown-currency"
                      className="z-10 hidden w-36 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-currency-button"
                      >
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => handleCurrencySelection("USD")}
                          >
                            <div className="inline-flex items-center">
                              <svg
                                fill="none"
                                aria-hidden="true"
                                className="me-2 h-4 w-4"
                                viewBox="0 0 20 15"
                              >
                                <rect
                                  width="19.6"
                                  height="14"
                                  y=".5"
                                  fill="#fff"
                                  rx="2"
                                />
                                <mask
                                  id="a"
                                  style={{ maskType: "luminance" }}
                                  width="20"
                                  height="15"
                                  x="0"
                                  y="0"
                                  maskUnits="userSpaceOnUse"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                </mask>
                                <g mask="url(#a)">
                                  <path
                                    fill="#D02F44"
                                    fillRule="evenodd"
                                    d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                    clipRule="evenodd"
                                  />
                                  <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                  <g filter="url(#filter0_d_343_121520)">
                                    <path
                                      fill="url(#paint0_linear_343_121520)"
                                      fillRule="evenodd"
                                      d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                      clipRule="evenodd"
                                    />
                                  </g>
                                </g>
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_343_121520"
                                    x1=".933"
                                    x2=".933"
                                    y1="1.433"
                                    y2="6.1"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#fff" />
                                    <stop offset="1" stopColor="#F0F0F0" />
                                  </linearGradient>
                                  <filter
                                    id="filter0_d_343_121520"
                                    width="6.533"
                                    height="5.667"
                                    x=".933"
                                    y="1.433"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="userSpaceOnUse"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      result="hardAlpha"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                    <feBlend
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_343_121520"
                                    />
                                    <feBlend
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_343_121520"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                              USD
                            </div>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => handleCurrencySelection("EUR")}
                          >
                            <div className="inline-flex items-center">
                              <svg
                                fill="none"
                                aria-hidden="true"
                                className="me-2 h-4 w-4"
                                viewBox="0 0 20 15"
                              >
                                <rect
                                  width="19.6"
                                  height="14"
                                  y=".5"
                                  fill="#fff"
                                  rx="2"
                                />
                                <mask
                                  id="a"
                                  style={{ maskType: "luminance" }}
                                  width="20"
                                  height="15"
                                  x="0"
                                  y="0"
                                  maskUnits="userSpaceOnUse"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                </mask>
                                <g mask="url(#a)">
                                  <path fill="#043CAE" d="M0 .5h19.6v14H0z" />
                                  <path
                                    fill="#FFD429"
                                    fillRule="evenodd"
                                    d="M9.14 3.493L9.8 3.3l.66.193-.193-.66.193-.66-.66.194-.66-.194.193.66-.193.66zm0 9.334l.66-.194.66.194-.193-.66.193-.66-.66.193-.66-.193.193.66-.193.66zm5.327-4.86l-.66.193L14 7.5l-.193-.66.66.193.66-.193-.194.66.194.66-.66-.193zm-9.994.193l.66-.193.66.193L5.6 7.5l.193-.66-.66.193-.66-.193.194.66-.194.66zm9.369-2.527l-.66.194.193-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm-8.743 4.86l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.194.193.66-.193.66zm7.034-6.568l-.66.193.194-.66-.194-.66.66.194.66-.193-.193.66.193.66-.66-.194zm-5.326 8.276l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.193.193.66-.193.66zM13.84 10.3l-.66.193.194-.66-.194-.66.66.194.66-.194-.193.66.193.66-.66-.193zM5.1 5.827l.66-.194.66.194-.194-.66.194-.66-.66.193-.66-.193.193.66-.193.66zm7.034 6.181l-.66.193.194-.66-.194-.66.66.194.66-.193-.193.66.193.66-.66-.194zm-5.326-7.89l.66-.193.66.193-.194-.66.194-.66-.66.194-.66-.193.193.66-.193.66z"
                                    clipRule="evenodd"
                                  />
                                </g>
                              </svg>
                              EUR
                            </div>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => handleCurrencySelection("CAD")}
                          >
                            <div className="inline-flex items-center">
                              <svg
                                fill="none"
                                aria-hidden="true"
                                className="me-2 h-4 w-4"
                                viewBox="0 0 20 15"
                              >
                                <rect
                                  width="19.1"
                                  height="13.5"
                                  x=".25"
                                  y=".75"
                                  fill="#fff"
                                  stroke="#F5F5F5"
                                  strokeWidth=".5"
                                  rx="1.75"
                                />
                                <mask
                                  id="a"
                                  style={{ maskType: "luminance" }}
                                  width="20"
                                  height="15"
                                  x="0"
                                  y="0"
                                  maskUnits="userSpaceOnUse"
                                >
                                  <rect
                                    width="19.1"
                                    height="13.5"
                                    x=".25"
                                    y=".75"
                                    fill="#fff"
                                    stroke="#fff"
                                    strokeWidth=".5"
                                    rx="1.75"
                                  />
                                </mask>
                                <g fill="#FF3131" mask="url(#a)">
                                  <path d="M14 .5h5.6v14H14z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M0 14.5h5.6V.5H0v14zM11.45 6.784a.307.307 0 01-.518-.277l.268-1.34-.933.466-.467-1.4-.467 1.4-.933-.466.268 1.34a.307.307 0 01-.518.277.307.307 0 00-.434 0l-.25.25-.933-.467L7 7.5l-.231.231a.333.333 0 000 .471l1.164 1.165h1.4l.234 1.4h.466l.234-1.4h1.4l1.164-1.165a.333.333 0 000-.471l-.231-.23.467-.934-.934.466-.25-.25a.307.307 0 00-.433 0z"
                                    clipRule="evenodd"
                                  />
                                </g>
                              </svg>
                              CAD
                            </div>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => handleCurrencySelection("GBP")}
                          >
                            <div className="inline-flex items-center">
                              <svg
                                fill="none"
                                aria-hidden="true"
                                className="me-2 h-4 w-4"
                                viewBox="0 0 20 15"
                              >
                                <rect
                                  width="19.6"
                                  height="14"
                                  y=".5"
                                  fill="#fff"
                                  rx="2"
                                />
                                <mask
                                  id="a"
                                  style={{ maskType: "luminance" }}
                                  width="20"
                                  height="15"
                                  x="0"
                                  y="0"
                                  maskUnits="userSpaceOnUse"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                </mask>
                                <g mask="url(#a)">
                                  <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                  <path
                                    fill="#fff"
                                    fillRule="evenodd"
                                    d="M-.898-.842L7.467 4.8V-.433h4.666V4.8l8.365-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.044-1.548 6.614-4.46H0V5.166h4.672L-1.942.706-.898-.842z"
                                    clipRule="evenodd"
                                  />
                                  <path
                                    stroke="#DB1F35"
                                    strokeLinecap="round"
                                    strokeWidth=".667"
                                    d="M13.068 4.933L21.933-.9M14.009 10.088l7.948 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.19 6.093"
                                  />
                                  <path
                                    fill="#E6273E"
                                    fillRule="evenodd"
                                    d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                    clipRule="evenodd"
                                  />
                                </g>
                              </svg>
                              GBP
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isFormCompleted && CityData[2] !== "" && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-end gap-3 border-t-[1px] bg-white px-12 py-6">
            <button
              className="rounded-md border-2  border-gray-400 px-8 py-2"
              type="button"
              onClick={handleDiscardChanges}
            >
              Discard
            </button>{" "}
            {isSubmitting ? (
              <button
                disabled
                type="button"
                className="rounded-md border-2 border-[#d1410c] bg-[#d1410c] px-8 py-2 text-white"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline h-4 w-4  animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button
                onSubmit={handleSubmit}
                disabled={isSubmitting}
                type="submit"
                className="rounded-md border-2 border-[#d1410c] bg-[#d1410c] px-8 py-2 text-white"
              >
                Save & Continue
              </button>
            )}
          </div>
        )}
      </form>
    </>
  );
}
