export async function reverseGeocode(latitude, longitude) {
  // const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=0`;
  const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Extract the address information or other data from the response as needed
    const address = `${data.city}`;

    return address;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
}
