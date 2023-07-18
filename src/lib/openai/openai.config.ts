import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const organization = "org-l2ejk6Anyn0rNmKtDvHuzVBe";

const configuration = new Configuration({
  apiKey,
  organization,
});

const openai = new OpenAIApi(configuration);

export default openai;
