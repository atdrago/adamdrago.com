import { writeFile } from "fs/promises";
import { resolve } from "path";

import { getPdf } from "./utils/getPdf.js";
import { startNextServer } from "./utils/startNextServer.js";

const RESUME_URL = "http://0.0.0.0:3000/work";

try {
  const cleanup = await startNextServer();
  const pdf = await getPdf(RESUME_URL, true);

  const outputPath = resolve(process.cwd(), "public", "adam-drago-resume.pdf");

  await writeFile(outputPath, pdf);

  console.log("Resume PDF generated successfully.");

  cleanup();

  process.exit(0);
} catch (error) {
  console.error(`An error occurred: ${error.message}`);
  process.exit(1);
}
