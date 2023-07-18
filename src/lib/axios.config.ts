import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apikey = process.env.NEWS_API_KEY;
export const newsAPI = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: { apikey },
});
