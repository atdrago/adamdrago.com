import { spawn } from "child_process";

const TIMEOUT_DURATION = 30000; // 30 seconds timeout

export async function startNextServer(): Promise<{
  cleanup: () => void;
  url: string | undefined;
}> {
  const serviceChildProcess = spawn("npm", ["start"]);

  return new Promise((resolve, reject) => {
    let isServerReady = false;
    let isEnvReady = false;
    let serverUrl: string | undefined;

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
      const output: string = data.toString();

      console.log(`stdout: ${output}`);

      const serverReadyMatch = output.match(
        /- ready started server on ([^\s,]+), url: (.+)/
      );

      if (serverReadyMatch) {
        console.log(serverReadyMatch);
        isServerReady = true;
        serverUrl = serverReadyMatch[2];

        if (!serverUrl.startsWith("http")) {
          serverUrl = `http://${serverUrl}`;
        }
      }

      if (output.includes("Loaded env from")) {
        isEnvReady = true;
      }

      if (isServerReady && isEnvReady) {
        clearTimeout(timeoutId);
        setTimeout(() => {
          resolve({
            cleanup,
            url: serverUrl,
          });
        }, 10000); // Wait a bit to ensure server is fully ready
      }
    });

    serviceChildProcess.stderr.on("data", (data) => {
      const errorMessage = data.toString();
      // eslint-disable-next-line no-console
      console.error(`stderr: ${errorMessage}`);
      cleanup();
      reject(new Error(`Error encountered: ${errorMessage}`));
    });

    serviceChildProcess.on("error", (error) => {
      // eslint-disable-next-line no-console
      console.error(`error:`, error);
      cleanup();
      reject(error);
    });

    serviceChildProcess.on("close", (code) => {
      // eslint-disable-next-line no-console
      console.log(`child process exited with code ${code}`);
    });
  });
}
