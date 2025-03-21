import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { BLOCK_COMPONENTS } from "@/src/components/blocks";

// Function to get proper PascalCase directory name
const getDirectoryName = (key: string): string => {
  // Remove 'Block' if it exists and convert first letter to uppercase
  return (
    key
      .replace(/block$/i, "")
      .charAt(0)
      .toUpperCase() +
    key.replace(/block$/i, "").slice(1) +
    "Block"
  );
};

// Function to read component code
const readComponentCode = (blockName: string): string => {
  try {
    const dirName = getDirectoryName(blockName);
    return readFileSync(
      join(process.cwd(), "src", "components", "blocks", dirName, "index.tsx"),
      "utf-8"
    );
  } catch (error) {
    console.error(`Error reading ${blockName} component code:`, error);
    return "";
  }
};

// Function to read schema code
const readSchemaCode = (blockName: string): string => {
  try {
    const dirName = getDirectoryName(blockName);
    const filePath = join(
      process.cwd(),
      "src",
      "components",
      "blocks",
      dirName,
      "schema.ts"
    );
    console.log(`Reading schema from: ${filePath}`);
    const content = readFileSync(filePath, "utf-8");
    if (!content) {
      console.error(`Empty schema content for ${blockName}`);
    }
    return content;
  } catch (error) {
    console.error(`Error reading ${blockName} schema code:`, error);
    return "";
  }
};

// Function to get block metadata
const getBlockMetadata = (blockName: string) => {
  try {
    console.log(`Getting metadata for block: ${blockName}`);
    const componentCode = readComponentCode(blockName);
    const schemaCode = readSchemaCode(blockName);
    const dirName = getDirectoryName(blockName);
    const schema = require(`@/src/components/blocks/${dirName}/schema`);

    if (!schemaCode) {
      console.error(`No schema code found for ${blockName}`);
    }

    return {
      name: blockName,
      code: componentCode,
      schema: schemaCode,
      schemaObject: schema,
    };
  } catch (error) {
    console.error(`Error getting metadata for ${blockName}:`, error);
    return null;
  }
};

export async function GET() {
  try {
    // Get block names from BLOCK_COMPONENTS using the actual component names
    const blockNames = Object.entries(BLOCK_COMPONENTS).map(
      ([key, component]) => {
        return component.name; // This will be PascalCase (e.g., "HeroBlock")
      }
    );

    const blocks = blockNames
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
