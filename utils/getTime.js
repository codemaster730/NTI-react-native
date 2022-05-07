import constants from "../config/constants";

const getTime = (hour, minutes) => {
  return hour * constants.MINUTES_PER_HOUR + minutes;
};

export default getTime;
