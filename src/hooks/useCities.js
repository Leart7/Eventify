import { useState, useEffect } from "react";

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          "https://parseapi.back4app.com/classes/City?limit=1000&keys=name,location",
          {
            headers: {
              "X-Parse-Application-Id":
                "zobelhMoKHFpAbilDTmrMXcjTD6sw2mn3OkgsJCJ",
              "X-Parse-Master-Key": "7G2sxforbN736Zr5Y9OMhqkcBIX9ySBXLNfWkqCw",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error fetching cities: " + response.statusText);
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cities, isLoading, error };
};
