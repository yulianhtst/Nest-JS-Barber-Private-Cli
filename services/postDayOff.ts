import { API_URL } from "@/constants";

export const postDayOff = async (data: Date) => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(API_URL, options);
  const responseJson = await response.json();
  return responseJson;
};
