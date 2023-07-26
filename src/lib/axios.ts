import axios from "axios";
import { parseCookies } from "nookies";

const { "finance.token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.API_URL + "/api" || "http://localhost:3000/api",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
