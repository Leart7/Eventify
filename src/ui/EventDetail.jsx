import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EventDetailSchema } from "../services/Schemas";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import foto1 from "../img/fotoo1.jpg";
import foto2 from "../img/fotoo2.jpg";
import foto3 from "../img/fotoo3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { CreateAgenda } from "./CreateAgenda";
import { useCreateEvent } from "../reactQuery/useCreateEvent";
export default function EventDetail() {
  const quillStyles = {
    height: "250px", // Set the desired height for the Quill editor
    border: "1px solid #ddd",
    paddingBottom: "20px",
    borderRadius: "5px",
  };

  const { createEvent } = useCreateEvent();

  const [value, setValue] = useState("");

  const [isGreenDivVisible, setIsGreenDivVisible] = useState(false);

  const [isVisiable, setIsVisiable] = useState(false);

  const [isImage, setIsImage] = useState(false);

  const [isAgenda, setIsAgenda] = useState(false);

  const [isAddText, setIsAddText] = useState(false);

  // const [selectedImages, setSelectedImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleClick = () => {
    setIsGreenDivVisible(!isGreenDivVisible);
  };

  const PressClick = () => {
    setIsVisiable(!isVisiable);
  };

  const Click = () => {
    setIsImage(!isImage);
  };

  const dispatch = useDispatch();

  const EventData = useSelector(
    (store) => store.createEvent.createEventData.title,
  );
  const EventDatas = useSelector((store) => store.createEvent.createEventData);
  const { title, ...createEventDataWithoutTitle } = EventDatas;

  const agendas = useSelector((store) => store.createAgenda.agendaSlice);
  console.log(agendas);
  const onSubmit = async (values, actions) => {
    // console.log(values);
    // console.log(actions);

    const eventObj = {
      title: values.EventTitle,
      description: values.Description,
      about: values.About,
      ...createEventDataWithoutTitle,
      eventAgends: agendas,
      tags: values.Tags,
      images: selectedImage,
    };

    createEvent(eventObj);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(saveEventDetails(formDataToSave));
    // actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      Photo: [],
      Description: "",
      About: "",
      EventTitle: EventData,
      Tags: [],
      tag: "",
    },
    validationSchema: EventDetailSchema,
    onSubmit,
  });

  const isFormCompleted = Object.values(values).every(Boolean);
  const handleDiscardChanges = () => {
    // Reset the form to its initial state
    resetForm();
  };
  // Define a function to handle adding a tag
  const handleAddTag = (e) => {
    // Check if the pressed key is not 'Enter', exit early if true
    if (e.key !== "Enter") return;

    // Get the value from the input field
    const value = e.target.value;

    // If the trimmed value is empty, exit early
    if (!value.trim()) return;

    // Retrieve existing tags from the form values
    const { Tags } = values;
    console.log(Tags);

    // Get the new tag value from the form values
    const newTag = values.tag; // Replace with your logic to get the new tag
    console.log(newTag);

    // Create a new array by copying the existing tags and adding the new tag
    const updatedTags = [...Tags, newTag];
    console.log(updatedTags);

    // Use Formik's 'setFieldValue' to update the 'Tags' property in the form
    setFieldValue("Tags", updatedTags);

    setFieldValue("tag", "");
  };

  console.log(values);

  // console.log(text); // Kjo do t'i shfaqë tekstin e shkruar nga përdoruesi në konsolë

  const handleAboutChange = (value) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = value;

    const textWithoutParagraphs =
      tempElement.textContent || tempElement.innerText;

    handleChange({
      target: {
        name: "About",
        value: textWithoutParagraphs, // Update the "About" field with text content without paragraphs
      },
    });
  };

  function removeTag(index) {
    const removedTag = tags[index];
    const wordsInRemovedTag = removedTag.trim().split(/\s+/).length;

    setWordCount(wordCount - wordsInRemovedTag);
    setTags(tags.filter((el, i) => i !== index));
  }

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    setSelectedImage((prevState) => [...prevState, file]);
    setImageUrl((prevState) => [...prevState, URL.createObjectURL(file)]);
  };
  // Define a separate function to handle changes in the Photo field
  // const handlePhotoChange = (event) => {
  //   console.log(event.currentTarget.files);
  //   // setFieldValue("Photo", event.currentTarget.files);
  //   handleFileChange(event);
  // };

  return (
    <>
      <form action="" onSubmit={handleSubmit} autoComplete="">
        <div className="flex items-center justify-center">
          <div
            id="default-carousel"
            className={`relative   mx-auto w-[55%] cursor-pointer  ${
              isImage ? "hidden" : ""
            }   `}
            onClick={Click}
            data-carousel="slide"
          >
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg border-[3px]  brightness-75 hover:border-blue-800  md:h-96">
              {/* Item 1 */}
              <div
                className="hidden duration-700 ease-in-out "
                data-carousel-item
              >
                <img
                  src={foto1}
                  className="absolute left-1/2 top-1/2 block h-[45pc] w-full  -translate-x-1/2 -translate-y-1/2 object-cover "
                  alt="..."
                />
              </div>
              {/* Item 2 */}
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src={foto2}
                  className="absolute left-1/2 top-1/2 block h-[45pc] w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                  alt="..."
                />
              </div>
              {/* Item 3 */}
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src={foto3}
                  className="absolute left-1/2 top-1/2 block h-[45pc] w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                  alt="..."
                />
              </div>
            </div>
            {/* Slider indicators */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                className="h-[6px] w-60 "
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                className="h-[6px] w-60 "
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                className="h-[6px] w-60 "
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
            </div>
            <div className="absolute left-1/2 top-1/2 z-30 flex h-[10pc] w-[10pc] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-lg border-[3px] border-gray-300 bg-white font-medium text-blue-600">
              <h1 className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                <FontAwesomeIcon icon={faUpload} />
              </h1>
              <h1>Upload photos</h1>
              <h1>and videos</h1>
            </div>
          </div>
          <div
            className={`h-[33pc] w-[40pc] border-[3px]  border-blue-800 px-6 ${
              isImage ? "" : "hidden"
            }`}
          >
            <h1 className=" pl-3 pt-6 text-2xl  font-bold">
              Add images and Videos
            </h1>
            <h3 className="  pl-3 pt-3 text-xl  text-gray-800">Images</h3>
            <p className="  pl-3 pt-3  text-sm">
              Add photos to show what your event will be about,You can upload up
              to 10 images.
            </p>
            <div className="mt-4 flex h-[20pc] flex-col items-center justify-center rounded-lg bg-gray-100">
              <div className="flex gap-2">
                {selectedImage ? (
                  <>
                    {" "}
                    {imageUrl.map((item, index) => {
                      return (
                        <img
                          key={index}
                          src={item}
                          alt="Selected"
                          className="h-[150px] w-[150px]"
                        />
                      );
                    })}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faImage} />
                )}
              </div>
              <p className="text-lg font-semibold">Drag and drop an image or</p>
              <div className="flex w-[11pc] items-center pt-3">
                <label
                  htmlFor="dropzone-file"
                  className="dark:hover:bg-bray-800 flex h-auto w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2  border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="pt- flex h-4 w-[15pc] flex-col items-center justify-center pb-6 pt-5">
                    {/* {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-h-full"
                      />
                    ) : (
                      <svg
                        className="mb-4 h-1 w-8 dark:text-gray-400"
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
                        />
                      </svg>
                    )} */}
                    <p className="mb-2 flex flex-col items-center text-sm">
                      <h2 className="t font-semibold">
                        {" "}
                        <FontAwesomeIcon icon={faImage} /> Upload image
                      </h2>
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <span className="pt-2 text-[13px] ">
              Recommended image sixe 2160 x 1080px
            </span>
            <span className="pl-5 text-[13px]"> Maximum file size 10MB</span>
            <span className="pl-5 text-[13px]">
              {" "}
              Supportes files:JPEG on PNG
            </span>
          </div>
        </div>

        <div className="border-gray mx-auto mt-28 flex w-[55%] flex-col items-center  justify-center rounded-md border-[3px]    hover:border-blue-800">
          <div
            className={` flex  h-[10pc] w-full flex-col justify-center  pl-6 text-black  ${
              isGreenDivVisible ? "hidden" : ""
            }`}
            onClick={handleClick}
          >
            <h1 className="pb-3 text-4xl font-bold ">{EventData}</h1>
            <p className="">
              Be clear and descriptive with a litle that tells people what your
              event Title.
            </p>
          </div>
          <div
            className={`h-[33pc] w-full  p-8 ${
              isGreenDivVisible ? "" : "hidden"
            }`}
          >
            <h1 className="pb-10 text-2xl font-semibold">Event Overview</h1>
            <h3 className="pb-4 text-lg font-medium text-slate-900">
              Event Title
            </h3>
            <p className="pb-4 ">
              {" "}
              Be clear and descriptive with a litle that tells people what your
              event is about.
            </p>

            <div className="">
              <div className="relative h-14 w-full min-w-[200px] rounded-md border-2">
                <input
                  className={`text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 
                 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border border-t-transparent 
                 bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2
                  focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0
                  ${
                    errors.EventTitle && touched.EventTitle
                      ? "text-red-600 focus:border-red-600"
                      : " text-green-700 focus:border-green-700 "
                  }`}
                  placeholder={EventData}
                  id="EventTitle"
                  name="EventTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.EventTitle}
                />
                <label
                  htmlFor="EventTitle"
                  className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500
               before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex
                h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all 
                before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md 
                before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block
                 after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm 
                 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent
                  peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2
                   peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900
                   peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"
                >
                  Event Title
                </label>
              </div>
              {errors.EventTitle && touched.EventTitle && (
                <p className="text-xs text-red-600">{errors.Description}</p>
              )}

              <h1 className="pb-4 text-lg font-medium text-slate-900">
                Summamry
              </h1>
              <p className="pb-4">
                Grab people's attention with a short description about your
                event. Attendees will see this at the top of your event page.
                (140 characters max).
              </p>
              <div className="relative h-[70px] w-full min-w-[200px] rounded-md border-[3px]">
                <textarea
                  // Added an id to associate the label with the textarea
                  className={`1boder-none text-blue-gray-700 disabled:bg-blue-blue-50 placeholder-shown:border-blue-gray-200 
                 peer h-full w-full rounded-[7px] border border-transparent 
                bg-transparent px-3 py-2.5 font-sans text-sm font-normal transition-all placeholder-shown:border focus:border-2
                 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 ${
                   errors.Description && touched.Description
                     ? "text-red-600"
                     : "text-green-700 "
                 }`}
                  placeholder=" "
                  id="Description"
                  name="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Description}
                />

                <label
                  htmlFor="Description"
                  className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] 
                after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full 
                select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none
                 before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t
                  before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow 
                  after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] 
                  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight
                   peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2
                    peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent
                     peer-disabled:after:border-transparent"
                >
                  Summary
                </label>
              </div>

              <div className="flex justify-between pt-[2px]">
                {errors.Description && touched.Description && (
                  <p className="text-xs text-red-600">{errors.Description}</p>
                )}
                <span>{`${values.Description.length}/100`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-gray mx-auto mb-8 mt-28 flex w-[55%] flex-col items-center  justify-center rounded-md border-[3px] hover:border-blue-800">
          <div
            className={` flex  h-[10pc] w-full flex-col justify-center   pl-6 text-black  ${
              isVisiable ? "hidden" : ""
            }  `}
            onClick={PressClick}
          >
            <h1 className="pb-3 text-4xl font-bold ">About this Event</h1>
            <p className="">
              Use this section to provide more details about your event. You can
              include things to know, venue information, parking, accessbility
              options—anything that will help people know what to expect.
            </p>
          </div>
          <div className={`h-auto w-full  p-8  ${isVisiable ? "" : "hidden"}`}>
            <h1 className="pb-10 text-2xl font-semibold">About this event</h1>
            <h3 className="pb-4 text-lg font-medium text-slate-900">
              Add more details about your event and include what people can
              expect if they attend.
            </h3>

            <ReactQuill
              theme="snow"
              style={quillStyles}
              onChange={handleAboutChange}
            />

            {/* <div className={`pt-12 ${isAddText?" ":"hidden"} `}>
               
                 <ReactQuill theme="snow"style={quillStyles}   />
                
        </div> */}
            <div className=" flex justify-between pt-[3pc]">
              {/* <button
              className={`h-[3pc] w-[9pc] rounded-lg border-[2.4px] border-slate-600 text-base ${
                isAddText ? " bg-slate-300" : ""
              }  hover:border-slate-800 hover:bg-slate-100`}
              onClick={AddText}
            >
              <FontAwesomeIcon icon={faList} />{" "}
              {isAddText ? "Delete Text" : "Add text"}
            </button>
            <button className="h-[3pc]  w-[9pc] rounded-lg border-[2.4px] border-slate-400  text-base  hover:border-slate-800  hover:bg-slate-100">
              <FontAwesomeIcon icon={faImage} /> Add Image
            </button> */}
            </div>
          </div>
        </div>

        <div className="mx-auto mb-8 mt-28 flex w-[55%] flex-col">
          <h1 className="pb-4 text-3xl font-medium">Tags</h1>
          <p className="pb-2 text-lg font-normal">Write some tags here</p>
          <div className="flex w-full flex-wrap items-center rounded-md border-[3.2px] hover:border-blue-800   ">
            {values.Tags.map((tag, index) => (
              <div
                key={index}
                className="min-w-14 m-1 flex items-center justify-center gap-6 rounded-xl bg-slate-200 py-2"
              >
                <span className="ml-1 text-base font-medium">{tag}</span>
                <div className="mr-1 flex h-5 w-5 items-center justify-center rounded-3xl bg-black text-white">
                  <span
                    className="cursor-pointer font-semibold"
                    onClick={() => removeTag(index)}
                  >
                    x
                  </span>
                </div>
              </div>
            ))}
            <input
              className="my-2 ml-1 border-none outline-none"
              value={values.tag}
              onChange={handleChange}
              onBlur={handleBlur}
              id="tag"
              type="text"
              placeholder="Type something..."
              onKeyDown={handleAddTag}
            />
          </div>
          <div className="flex justify-between">
            <p>{values.Tags.length}/10 tags.</p>
          </div>
        </div>
        {isFormCompleted && (
          <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-end gap-3 border-t-[1px] bg-white px-12 py-6">
            <button
              className="rounded-md border-2  border-gray-400 px-8 py-2"
              type="button"
              onClick={handleDiscardChanges}
            >
              Discard
            </button>{" "}
            <button
              disabled={isSubmitting}
              type="submit"
              className="rounded-md border-2 border-[#d1410c] bg-[#d1410c] px-8 py-2 text-white"
            >
              Finish Event
            </button>
          </div>
        )}
      </form>
      <CreateAgenda></CreateAgenda>
    </>
  );
}
//
