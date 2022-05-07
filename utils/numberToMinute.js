const numberToMinute = (number) => {
  if (number === 1) {
    return number + "  min";
  } else {
    return number + "  mins";
  }
};

export default numberToMinute;
