const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {Function} callback - A callback (to pass back an error or the IP string)
 * @returns {Error} (via Callback): An error, if any (nullable)
 * @returns {string} The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = `https://api.ipify.org`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    callback(null, body);
  });
};

module.exports = { fetchMyIP };