import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(`ERROR: ${error}`));
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen(`SUCCESS: ${msg}`));
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan("HELP")}
        Without parameters => show weather
        -s [CITY] => setup a city
        -t [API_KEY] => setup token
        -h => show help
        `)
  );
};

const printWeather = (response, icon) => {
  console.log(
    dedent(`${chalk.inverse(response.name)}
    ${icon} ${response.weather[0].description}
        Temperature: ${response.main.temp}deg (feels Like: ${response.main.feels_like}deg)
        Humidity: ${response.main.humidity}%
        Wind speed: ${response.wind.speed}
        `)
  );
};

export { printError, printSuccess, printHelp, printWeather };
