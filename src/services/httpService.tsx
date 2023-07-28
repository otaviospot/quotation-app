import axios from "axios";

/*const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://flash-cards-backend-rrgomide.glitch.me';
*/

const BASE_URL = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url: any) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function exclude(url: string) {
  await axiosInstance.delete(url);
}

export async function create(url: string, object: any) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function edit(url: string, object: any) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}
