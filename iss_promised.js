const request = require("request-promise-native");
const APIKEY = require("./constants");

/**
 * Requests user's ip address from https://www.ipify.org/
 * @returns {Promise} Promise of request for ip data as a string
 */
const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};


/**
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * @param {JSON} body JSON string containing the IP address
 * @returns {Promise} Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const apiKey = APIKEY;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`);
};

/**
 * Requests data from api.open-notify.org using provided lat/long data
 * @param body JSON body containing geo data response from freegeoip.app
 * @returns {Promise} Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };