import { type ComponentType } from "react";
import { HeroBlock } from "./HeroBlock";
import { SAMPLE_HERO_DATA } from "./HeroBlock/data";
import { readFileSync } from "fs";
import { join } from "path";

export type BlockDefinition = {
  component: ComponentType<any>;
  sampleData: any;
  code: string;
  schema?: any;
};

export type BlockRegistry = Record<string, BlockDefinition>;

// Function to read component code
const readComponentCode = (blockName: string): string => {
  try {
    return readFileSync(
      join(
        process.cwd(),
        "src",
        "components",
        "blocks",
        blockName,
        "index.tsx"
      ),
      "utf-8"
    );
  } catch (error) {
    console.error(`Error reading ${blockName} code:`, error);
    return "";
  }
};

// Registry of all available blocks
export const blockRegistry: BlockRegistry = {
  HeroBlock: {
    component: HeroBlock,
    sampleData: SAMPLE_HERO_DATA,
    code: `import { RichText } from "../../richtext";
import { PreviewImage } from "../../preview-image";
import Link from "next/link";

// ... rest of the code will be loaded dynamically ...`,
  },
  // Add more blocks here as they are created
  // Example:
  // ImageCardBlock: {
  //   component: ImageCardBlock,
  //   sampleData: SAMPLE_IMAGE_CARD_DATA,
  //   code: readComponentCode('ImageCardBlock'),
  // },
};

// Helper function to get block names
export const getBlockNames = (): string[] => Object.keys(blockRegistry);

// Helper function to get block data
export const getBlockData = (blockName: string) => blockRegistry[blockName];

// Helper function to check if a block exists
export const blockExists = (blockName: string): boolean =>
  blockName in blockRegistry;

// Function to register a new block
export function registerBlock(name: string, definition: BlockDefinition): void {
  if (blockRegistry[name]) {
    console.warn(
      `Block "${name}" is already registered. It will be overwritten.`
    );
  }
  blockRegistry[name] = definition;
}

export default blockRegistry;
