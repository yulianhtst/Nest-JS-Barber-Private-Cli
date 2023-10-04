import { API_URL } from "@/constants";

export const deleteDate = async (id) => {
  fetch(API_URL + "dates/" + id, { method: "DELETE" });
};
