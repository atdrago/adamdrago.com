import { spawn } from "child_process";

const TIMEOUT_DURATION = 30000; // 30 seconds timeout

export async function startNextServer(): Promise<() => void> {
  const serviceChildProcess = spawn("npm", ["start"]);

  return new Promise((resolve, reject) => {
    let isServerReady = false;
    let isEnvReady = false;

    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("Server startup timed out."));
    }, TIMEOUT_DURATION);

    function cleanup() {
      serviceChildProcess.stdout.destroy();
      serviceChildProcess.stderr.destroy();
      serviceChildProcess.kill();
      clearTimeout(timeoutId);
    }

    serviceChildProcess.stdout.on("data", (data) => {
      const output = data.toString();

      if (output.startsWith("- ready started server on")) {
        isServerReady = true;
      }

      if (output.includes("Loaded env from")) {
        isEnvReady = true;
      }

      if (isServerReady && isEnvReady) {
        clearTimeout(timeoutId);
        resolve(cleanup);
      }
    });

    serviceChildProcess.stderr.on("data", (data) => {
      const errorMessage = data.toString();
      console.error(`stderr: ${errorMessage}`);
      cleanup();
      reject(new Error(`Error encountered: ${errorMessage}`));
    });

    serviceChildProcess.on("error", (error) => {
      console.error(`error: ${error.message}`);
      cleanup();
      reject(error);
    });

    serviceChildProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}
