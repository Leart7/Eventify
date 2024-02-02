import { axiosRequest } from "./baseApiRequest";

export async function getEvents(params) {
  try {
    const response = await axiosRequest("get", `Event`, null, params);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEvent(eventId) {
  try {
    const response = await axiosRequest("get", `Event/${eventId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUpcomingEventsFromUser(userId) {
  try {
    const response = await axiosRequest(
      "get",
      `Event/events/upcoming/${userId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPastEventsFromUser(userId) {
  try {
    const response = await axiosRequest("get", `Event/events/past/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTotalEvents(userId) {
  try {
    const response = await axiosRequest("get", `Event/events/total/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function suggestEvents(userId, eventId) {
  try {
    const response = await axiosRequest(
      "get",
      `Event/events/suggest/${userId}/${eventId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEventsByFollowings(params) {
  try {
    const response = await axiosRequest(
      "get",
      `Event/events/followings`,
      null,
      params,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function createEvent(eventObj) {
  try {
    const formData = new FormData();

    Object.keys(eventObj).forEach((key) => {
      if (key === "startTime" || key === "endTime") {
        formData.append(key, new Date(eventObj[key]).toISOString());
      } else if (key === "tags") {
        eventObj.tags.forEach((tagName, index) => {
          formData.append(`tags[${index}]`, tagName);
        });
      } else if (key === "eventAgends") {
        eventObj.eventAgends.forEach((agend, index) => {
          formData.append(`eventAgends[${index}].title`, agend.title);
          formData.append(
            `eventAgends[${index}].startTime`,
            new Date(agend.startTime).toISOString(),
          );
          formData.append(
            `eventAgends[${index}].endTime`,
            new Date(agend.endTime).toISOString(),
          );
          formData.append(
            `eventAgends[${index}].description`,
            agend.description || "",
          );
          formData.append(`eventAgends[${index}].speaker`, agend.speaker || "");
        });
      } else if (key !== "images" && key !== "tags") {
        formData.append(key, eventObj[key]);
      }
    });

    if (eventObj.images && eventObj.images.length > 0) {
      eventObj.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    const response = await axiosRequest("post", `Event`, formData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
