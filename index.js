const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    return console.log(`It didn't work! ${error}`);
  }
  for (const { risetime, duration } of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(risetime);
    console.log(`Next pass at ${datetime} for ${Math.round(duration / 60)} minutes`);
  }
});