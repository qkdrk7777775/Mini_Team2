import { api } from "./axios";
export async function predictEmployee(data) {
  console.log("predictEmployee 호출:", data);
  const response = await api.post("/analysis", data);
  console.log("response", response);
  return response.data;
}
