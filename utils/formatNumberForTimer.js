const formatNumberForTimer = (number) => {
  if (number > 9) {
    return number + " : ";
  } else {
    return "0" + number + " : ";
  }
};

export default formatNumberForTimer;