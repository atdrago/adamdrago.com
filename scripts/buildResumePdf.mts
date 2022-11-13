import { spawn, spawnSync } from "child_process";
import { writeFile } from "fs";
import { resolve } from "path";

import { getPdf } from "./getPdf.js";

const url = "http://localhost:3000/work";

const serverChild = spawn("npm", ["start"]);

serverChild.stdout.on("data", (data) => {
  console.log(`stdout:\n${data}`);

  if (`${data}`.startsWith("ready")) {
    console.log("building resume pdf\n");

    getPdf(url).then((pdf) => {
      console.log("writing resume pdf\n");

      writeFile(
        resolve(process.cwd(), "public", "adam-drago-resume.pdf"),
        pdf,
        (err: any) => {
          serverChild.stdout.destroy();
          serverChild.stderr.destroy();
          serverChild.kill();

          if (err) {
            console.error(`writing resume pdf failed ${err}`);
            process.exit(1);
          }
          console.log("writing resume pdf done\n");
          process.exit(0);
        }
      );
    });
  }
});

serverChild.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

serverChild.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

serverChild.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
