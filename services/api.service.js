import axios from "axios";
import https from "https";
import { getKeyValue, STORAGE_DICTIONARY } from "./storage.service.js";

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return 'âī¸';
		case '02':
			return 'đ¤ī¸';
		case '03':
			return 'âī¸';
		case '04':
			return 'âī¸';
		case '09':
			return 'đ§ī¸';
		case '10':
			return 'đĻī¸';
		case '11':
			return 'đŠī¸';
		case '13':
			return 'âī¸';
		case '50':
			return 'đĢī¸';
	}
};

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(STORAGE_DICTIONARY.token);
  if (!token) {
    throw new Error(
      "API does not exist. You need to setup API key. Command: -t [API_KEY]"
    );
  }
  // axios
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    }
  );

  return data;

  // method of native js
  // const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  // url.searchParams.append("q", city);
  // url.searchParams.append("appid", token);
  // url.searchParams.append("lang", "en");
  // url.searchParams.append("units", "metric");

  // https.get(url, (response) => {
  //   let res = "";
  //   console.log(url.href)
  //   response.on("data", (chunk) => (res += chunk));
  //   response.on("end", () => console.log(res));
  // });
};

export { getWeather, getIcon };
