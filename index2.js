const { nextISSTimesForMyLocation } = require("./iss_promised");
const { printFlyOverTimes } = require("./utilities");

nextISSTimesForMyLocation()
  .then((flyOverTimes) => printFlyOverTimes(flyOverTimes));

  