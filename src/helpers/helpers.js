import axios from "axios";

// http://api-staging.paritygo.com/sensors/api/sensors/humidity-1/?begin=<timestamp1>&end=<timestamp2>
// http://api-staging.paritygo.com/sensors/api/sensors/humidity/?begin=2020-02-14T11:00&end=2020-02-14T11:30

// https://api-staging.paritygo.com/sensors/api/thermostat/register/

export async function fetchTemperature(sensor) {
  let response = {};
  const errorText = 'Could not fetch temperature data';

  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const day = currentDateTime.getDate();
  const currentTimestampHour = currentDateTime.getHours();
  let previousTimestampHour = currentTimestampHour;
  const currentTimestampMinutes = currentDateTime.getMinutes();
  let previousTimestampMinutes = currentTimestampMinutes - 15;
  
  if (currentTimestampMinutes < 15) {
    previousTimestampHour -= 1;
    previousTimestampMinutes += 60;
  };

  const currentTimestamp = `${year}-${month}-${day}T${currentTimestampHour}:${currentTimestampMinutes}`;
  const previousTimestamp = `${year}-${month}-${day}T${previousTimestampHour}:${previousTimestampMinutes}`;

  try {
    response = await axios.get(
      `http://api-staging.paritygo.com/sensors/api/sensors/${sensor}/?begin=${previousTimestamp}&end=${currentTimestamp}`
    );
    if (response.status === 200) {
      response = response.data;
    } else {
      console.error(errorText);
    }
  } catch (e) {
    console.error(errorText);
    console.error(e);
    response = {};
  }
  return response;
};