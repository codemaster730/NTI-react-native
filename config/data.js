const data = [
  {
    order: 1,
    destination: "Central Station",
    arrivalTime: 0, //minutes
    frequency: 20, //minutes
    startTime: 0, //00:00
    endTime: 24 * 60 - 1, //23:59
  },
  {
    order: 2,
    destination: "Circular",
    arrivalTime: 0, //minutes
    frequency: 60, //minutes
    startTime: 0, //00:00
    endTime: 24 * 60 - 1, //23:59
  },
  {
    order: 3,
    destination: "North Square",
    arrivalTime: 0, //minutes
    frequency: 12, //minutes
    startTime: 7 * 60, //07:00
    endTime: 22 * 60, //22:00
  },
  {
    order: 4,
    destination: "West Market",
    arrivalTime: 0, //minutes
    frequency: 6, //minutes
    startTime: 5 * 60 + 30, //05:30
    endTime: 1 * 60 + 30, //01:30
  },
];

export default data;
