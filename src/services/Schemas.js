import * as yup from "yup";
const passwordRules = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";
// .matches(passwordRules , {message : "Please create a stronger password "})
export const basicSchema = yup.object().shape({
  EventTitle: yup
    .string()
    .required("Required")
    .max(75, "Text must be at most 75 characters"),
  Organizer: yup.string().required("Required"),
  startDate: yup.date().nullable().required("Required"),
  endDate: yup.date().nullable().required("Required"),
  Format: yup.number(),
  Category: yup.number(),
  startTime: yup.string(),
  endTime: yup.string(),
  EventStart: yup.string(),
  EventEnd: yup.string(),
  Language: yup.number(),
  Price: yup.number(),
  Capacity: yup.number(),
  EndSales: yup.string(),
  Currency: yup.string(),
  Address: yup.string(),
  endSalesTime: yup.string(),
  endSalesDate: yup.string(),
});

export const AgendaSchema = yup.object().shape({
  AgendaTitle: yup.string(),
  AgendaStartTime: yup.string(),
  AgendaEndTime: yup.string(),
  Speaker: yup.string(),
  Description: yup.string(),
});


export const EventDetailSchema = yup.object().shape({
  Description :  yup.string().required("Required").max(100, "Text must be at most 100 characters").min(15),
  About : yup.string().required("Required").max(100, "Text must be at most 100 characters").min(15),
  EventTitle: yup.string().required("Required").max(75, "Text must be at most 75 characters"),
  Photo: yup.array(),
  // .mixed()
  // .test('fileSize', 'File size is too large', (value) => {
  //   if (!value) return true; // Allow empty file
  //   return value.size <= 1024 * 1024; // 1 MB
  // })
  // .test('fileType', 'Invalid file type', (value) => {
  //   if (!value) return true; // Allow empty file
  //   return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
  // }),
  Tags: yup
  .array()
  .of(
    yup.string().required("Tag is required").max(20, "Tag must be at most 20 characters")
  ),
  tag :  yup.string().required("Required").max(100, "Text must be at most 100 characters"),


})