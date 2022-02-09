#!/user/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import {
  saveKeyValue,
  STORAGE_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("NO TOKEN written");
    return;
  }
  try {
    await saveKeyValue(STORAGE_DICTIONARY.token, token);
    printSuccess(`Token ${token} was saved`);
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("NO CITY written");
    return;
  }
  try {
    await saveKeyValue(STORAGE_DICTIONARY.city, city);
    printSuccess(`City "${city}" was saved`);
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(STORAGE_DICTIONARY.city));
    const weather = await getWeather(city);
    const icon = await getIcon(weather.weather[0].icon)
    printWeather(weather, icon)
  } 
  catch (e) {
    if (e?.response?.status === 404) {
      printError("404 - wrong city");
    } else if (e?.response?.status === 401) {
      printError("401 - wrong API key");
    } else if (e?.response?.status === 400) {
      printError("You need to setup a city, command: -s [CITY]");
    } 
    else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    // save city
    return saveCity(args.s);
  }
  if (args.t) {
    // save token
    return saveToken(args.t);
  } else {
    // show weather
    return getForecast("tarragona");
  }
};

initCLI();
