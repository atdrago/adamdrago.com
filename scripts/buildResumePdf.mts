import { writeFile } from "fs/promises";
import { resolve } from "path";

import { getPdf } from "./utils/getPdf.mts";
import { startNextServer } from "./utils/startNextServer.mts";

try {
  const { cleanup, url } = await startNextServer();

  if (!url) {
    throw new Error("Failed to start Next.js server or retrieve URL.");
  }

  const pdf = await getPdf(new URL("/work", url).toString(), true);

  const outputPath = resolve(process.cwd(), "public", "adam-drago-resume.pdf");

  await writeFile(outputPath, pdf);

  console.log("Resume PDF generated successfully.");

  cleanup();

  process.exit(0);
} catch (error) {
  console.error(`An error occurred:`, error);
  process.exit(1);
}
