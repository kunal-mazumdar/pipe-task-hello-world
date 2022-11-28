const tasks = require("jfrog-pipelines-tasks");
const path = require("path");
const fs = require("fs");
const os = require("os");

async function main() {

  // TODO: Validate if Go installed

  // Read and validate task input
  let staticCheckVersion = tasks.getInput("version");
  if (staticCheckVersion == "") {
    staticCheckVersion = "latest";
  }

  let workingDirectory = tasks.getInput("working-directory");
  if (workingDirectory == "") {
    workingDirectory = ".";
  }

  // await tasks.execute(`go install "honnef.co/go/tools/cmd/staticcheck@${staticCheckVersion}"`);
  // await tasks.execute(`$(go env GOPATH)/bin/staticcheck ${workingDirectory}`);

  const installScript = path.join(tasks.getWorkingDir(), "install.sh");
  console.log(await tasks.execute(`sh ${installScript} ${staticCheckVersion} ${workingDirectory}`));
}

function cleanup() {
  tasks.info(`No cleanup set yet!`);
}

// Parse command arguments
if (process.argv.length !== 3) {
  tasks.error("USAGE: node index.js COMMAND");
  return process.exit(1);
}
const command = process.argv[2];

// Run task command
switch (command) {
  case "main":
    return main();
  case "cleanup":
    return cleanup();
  default:
    tasks.error("Command not supported: " + command);
}

