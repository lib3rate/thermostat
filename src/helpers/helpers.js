import axios from "axios";

// http://api-staging.paritygo.com/sensors/api/sensors/humidity-1/?begin=<timestamp1>&end=<timestamp2>
// http://api-staging.paritygo.com/sensors/api/sensors/humidity/?begin=2020-02-14T11:00&end=2020-02-14T11:30

// https://api-staging.paritygo.com/sensors/api/thermostat/register/

export default async function initialCall() {
  let response = {};
  const errorText = 'Could not fetch data';

  try {
    response = await axios.get(
      'http://api-staging.paritygo.com/sensors/api/sensors/humidity-1/?begin=2021-02-01T21:00&end=2021-02-01T21:30'
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