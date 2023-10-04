import { API_URL } from "../constants";

export const bookedDates = async (): Promise<any[]> => {
    
  const response = await fetch(API_URL+"bookings");
  const responseJson  = await response.json();
  return responseJson;
};
