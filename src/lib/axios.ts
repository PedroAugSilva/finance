import axios from "axios";
import { parseCookies } from "nookies";

const { "finance.token": token } = parseCookies();

export const api = axios.create({
  baseURL: "https://finance-6bf7.vercel.app/api",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
