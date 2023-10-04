import { API_URL } from "@/constants";

export const deleteDate = async (id) => {
  const res = await fetch(API_URL + "dates/" + id, { method: "DELETE" });
  const resJson = await res.json();
  return resJson;
};
