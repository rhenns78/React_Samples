const trace = {
  verbose: (name, data) => {
    console.log({
      level: "0",
      type: "verbose",
      name,
      data,
    });
  },
  information: (name, data) => {
    console.log({
      level: "1",
      type: "information",
      name,
      data,
    });
  },
  warning: (name, data) => {
    console.log({
      level: "2",
      type: "warning",
      name,
      data,
    });
  },
  error: (name, data) => {
    console.log({
      level: "3",
      type: "error",
      name,
      data,
    });
  },
  critical: (name, data) => {
    console.log({
      level: "4",
      type: "critical",
      name,
      data,
    });
  },
  exception: (err) => {
    console.log({
      level: "5",
      type: "unhandled-exception",
      name: "unhandled-exception",
      data: err,
    });
  },
};

export default trace;
