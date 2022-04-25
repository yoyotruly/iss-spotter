const { nextISSTimesForMyLocation } = require("./iss");
const { printFlyOverTimes } = require("./utilities");

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    return console.log(`It didn't work! ${error}`);
  }
  
  printFlyOverTimes(flyOverTimes);
});