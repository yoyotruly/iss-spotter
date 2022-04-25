const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {Function} callback - A callback (to pass back an error or the IP string)
 * @returns {Error} (via callback): An error, if any (nullable)
 * @returns {string} (via callback) The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org";
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    callback(null, body);
  });
};

/**
 * Makes a single API request to retrieve the longitude and latitude of a given IP address.
 * @param {string} ip A valid IP address
 * @param {string} apiKey An API key to access https://freegeoip.app/
 * @param {Function} callback A callback (to passback an error or the lat/long coordinates)
 * @returns {Error} (via callback): An error if any, null if no error
 * @returns {Object} (via callback): The lat/long coordinates
 */
const fetchCoordsByIP = function(ip, apiKey, callback) {
  const url = `https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/long coordinates.
 * @param {Object} coords An object with keys `latitude` and `longitude`
 * @param {Function} callback A callback (to pass back an error or the array of resulting data)
 * @returns {Error} (via callback) An error, if any (nullable)
 * @returns {Object} (via callback) The fly over times as an array of objects (null if error).
 * @example [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
