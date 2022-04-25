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

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};