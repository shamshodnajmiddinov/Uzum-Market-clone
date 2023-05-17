import axios from "axios";
import { getData } from './modules/HTTP.reuest'

export async function getData(resource) {
  console.log(import.meta.env.VITE_BASE_URL);
  const res = await axios.get(import.meta.env.VITE_BASE_URL);
  const data = await res.data;

  return data;
}

