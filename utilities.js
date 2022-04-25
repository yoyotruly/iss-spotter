/**
 * @param flyOverTimes Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * @returns {undefined} undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
const printFlyOverTimes = function(flyOverTimes) {
  for (const time of flyOverTimes) {
    const { risetime, duration } = time;

    const datetime = new Date(0);
    datetime.setUTCSeconds(risetime);

    console.log(`Next pass at ${datetime} for ${Math.round(duration)} minutes!`);
  }
};

module.exports = { printFlyOverTimes };