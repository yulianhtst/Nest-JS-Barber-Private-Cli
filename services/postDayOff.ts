import { API_URL } from "@/constants";

export const postDayOff = async (date: object) => {
  const options = {
    method: "POST",
    headers: {
            "Content-Type": "application/json"
    },
    body: JSON.stringify(date),
  };

  const response = await fetch(API_URL + "dates", options);
  const responseJson = await response.json();
  return responseJson;
};
