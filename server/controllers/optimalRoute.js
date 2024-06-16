const { spawn } = require("child_process");

const optimalPython = (req, res) => {
  let dataToSend;
  const input = "Seattle";

  const pythonProcess = spawn("py", [
    "../scripts/optimal_route_generator.py",
    input,
  ]);

  pythonProcess.stdout.on("data", (data) => {
    dataToSend = data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    rejects(data.toString());
  });

  pythonProcess.on("exit", (code) => {
    console.log("Code", code);
    JSON.parse(dataToSend);
  });
};

module.exports = { optimalPython };
