import { NextResponse } from "next/server";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

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
    console.error(`Error reading ${blockName} component code:`, error);
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
    console.error(`Error reading ${blockName} schema code:`, error);
    return "";
  }
};

// Function to get block metadata
const getBlockMetadata = (blockName: string) => {
  try {
    const componentCode = readComponentCode(blockName);
    const schemaCode = readSchemaCode(blockName);

    // Import the schema module dynamically
    const schemaModule = require(`@/src/components/blocks/${blockName}/schema`);
    const schema =
      schemaModule.default || schemaModule[Object.keys(schemaModule)[0]];

    return {
      name: blockName,
      code: componentCode,
      schema: schemaCode, // This is the actual schema code as a string
      schemaObject: schema, // This is the schema object for runtime use
    };
  } catch (error) {
    console.error(`Error getting metadata for ${blockName}:`, error);
    return null;
  }
};

export async function GET() {
  try {
    const blocksDir = join(process.cwd(), "src", "components", "blocks");
    const blockFolders = readdirSync(blocksDir, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isDirectory() &&
          !["registry.ts", "types.ts"].includes(dirent.name)
      )
      .map((dirent) => dirent.name);

    const blocks = blockFolders
      .map((blockName) => getBlockMetadata(blockName))
      .filter((block) => block !== null);

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error("Error in blocks API:", error);
    return NextResponse.json(
      { error: "Failed to get blocks" },
      { status: 500 }
    );
  }
}
