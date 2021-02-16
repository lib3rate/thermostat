import axios from "axios";

export async function register() {
  let response = {};
  const errorText = 'Could not register thermostat';

  try {
    response = await axios.post(
      'https://api-staging.paritygo.com/sensors/api/thermostat/register/'
    );
    if (response.status === 201) {
      response = response.data;
    } else {
      console.error(errorText);
    }
  } catch (e) {
    console.error(errorText);
    console.error(e);
    response = null;
  }

  return response;
};

export async function fetchTemperature(sensor) {
  let response = {};
  const errorText = 'Could not fetch temperature data';

  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const currentTimestampDay = currentDateTime.getDate();
  let previousTimestampDay = currentTimestampDay;
  const currentTimestampHour = currentDateTime.getHours();
  let previousTimestampHour = currentTimestampHour;
  const currentTimestampMinutes = currentDateTime.getMinutes();
  // Make the request every 17 minutes to make sure that there are at least 3 data points
  let previousTimestampMinutes = currentTimestampMinutes - 17;
  
  if (currentTimestampMinutes < 17) {
    previousTimestampHour -= 1;
    previousTimestampMinutes += 60;
  };

  if (previousTimestampHour < 0) {
    previousTimestampDay -= 1;
    previousTimestampHour += 24;
  }

  const currentTimestamp = `${year}-${month}-${currentTimestampDay}T${currentTimestampHour}:${currentTimestampMinutes}`;
  const previousTimestamp = `${year}-${month}-${previousTimestampDay}T${previousTimestampHour}:${previousTimestampMinutes}`;

  try {
    response = await axios.get(
      `https://api-staging.paritygo.com/sensors/api/sensors/${sensor}/?begin=${previousTimestamp}&end=${currentTimestamp}`
    );
    if (response.status === 200) {
      response = response.data;
    } else {
      console.error(errorText);
    }
  } catch (e) {
    console.error(errorText);
    console.error(e);
    return null;
  }

  if (response.data_points.length < 3) {
    return null;
  }

  let sum = 0;
  for (let datapoint of response.data_points) {
    sum += Number(datapoint.value);
  };
  const average = (sum / response.data_points.length).toFixed(0);

  return Number(average);
};

export async function fetchCurrentStatus(id) {
  let response = {};
  const errorText = 'Could not receive current thermostat mode';

  try {
    response = await axios.get(
      `https://api-staging.paritygo.com/sensors/api/thermostat/${id}/`
    );
    if (response.status === 200) {
      response = response.data;
    } else {
      console.error(errorText);
    }
  } catch (e) {
    console.error(errorText);
    console.error(e);
    response = null;
  }

  return response;
};

export async function changeMode(id, mode) {
  let response = {};
  const errorText = 'Could not change thermostat mode';

  try {
    response = await axios.patch(
      `https://api-staging.paritygo.com/sensors/api/thermostat/${id}/`,
      { "state": mode }
    );
    if (response.status === 200) {
      response = response.data;
    } else {
      console.error(errorText);
    }
  } catch (e) {
    console.error(errorText);
    console.error(e);
    response = null;
  }

  return response;
};