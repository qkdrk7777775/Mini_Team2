import { api } from "./axios";
export async function SignupApi(email, password, institution) {
  const response = await api.post("/signup", {
    email,
    password,
    institution,
  });
  return response;
}

export async function LoginApi(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response;
}
