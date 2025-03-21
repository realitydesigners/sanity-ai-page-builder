import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

// Function to read component code
const readComponentCode = (blockName: string): string => {
  try {
    const filePath = join(
      process.cwd(),
      "src",
      "components",
      "blocks",
      blockName,
      "index.tsx"
    );
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading ${blockName} code:`, error);
    return "";
  }
};

// Function to read schema code
const readSchemaCode = (blockName: string): string => {
  try {
    const filePath = join(
      process.cwd(),
      "src",
      "components",
      "blocks",
      blockName,
      "schema.ts"
    );
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading ${blockName} schema:`, error);
    return "";
  }
};

// Function to read sample data
const readSampleData = (blockName: string): any => {
  try {
    const filePath = join(
      process.cwd(),
      "src",
      "components",
      "blocks",
      blockName,
      "data.ts"
    );
    const fileContent = readFileSync(filePath, "utf-8");
    // This is a simple way to get the exported data
    const match = fileContent.match(/export const \w+\s*=\s*({[\s\S]*?});/);
    if (match) {
      return JSON.parse(match[1].replace(/'/g, '"'));
    }
    return null;
  } catch (error) {
    console.error(`Error reading ${blockName} sample data:`, error);
    return null;
  }
};

// GET handler for retrieving block metadata
export async function GET() {
  try {
    const blocksDir = join(process.cwd(), "src", "components", "blocks");
    const blockFolders = readdirSync(blocksDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && dirent.name.endsWith("Block"))
      .map((dirent) => dirent.name);

    const blocksData = blockFolders.map((blockName) => {
      const code = readComponentCode(blockName);
      const schemaCode = readSchemaCode(blockName);
      const sampleData = readSampleData(blockName);

      return {
        name: blockName,
        code,
        schema: schemaCode,
        sampleData,
      };
    });

    return NextResponse.json({ blocks: blocksData });
  } catch (error) {
    console.error("Error loading blocks:", error);
    return NextResponse.json(
      { error: "Failed to load blocks" },
      { status: 500 }
    );
  }
}
