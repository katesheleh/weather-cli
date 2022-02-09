const getArgs = (args) => {
  const res = {};
  // ...rest is an array without 2 first elements
  const [executer, file, ...rest] = args;
  rest.forEach((value, index, array) => {
    if (value.charAt(0) == "-") {
        // if parameter is last, ex. -h
      if (index == array.length - 1) {
        res[value.substring(1)] = true;
        // if we have a word after a parameter, ex -h tarragona
      } else if (array[index + 1].charAt(0) !== "-") {
        res[value.substring(1)] = array[index + 1];
        // if we have 2 parameters but without value, ex. -s, -h
      } else {
        res[value.substring(1)] = true;
      }
    }
  });
  return res;
};

export { getArgs };
