import { type ComponentType } from "react";
import { HeroBlock } from "./HeroBlock";
import { SAMPLE_HERO_DATA } from "./HeroBlock/data";

export type BlockDefinition = {
  component: ComponentType<any>;
  sampleData: any;
  code: string;
  schema?: any;
};

export type BlockRegistry = Record<string, BlockDefinition>;

// Initialize with known blocks
export const blockRegistry: BlockRegistry = {
  HeroBlock: {
    component: HeroBlock,
    sampleData: SAMPLE_HERO_DATA,
    code: "", // Will be populated from the API
    schema: null, // Will be populated from the API
  },
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

// Function to update block metadata from API
export async function updateBlockMetadata() {
  try {
    const response = await fetch("/api/blocks");
    const data = await response.json();

    if (data.blocks) {
      data.blocks.forEach((block: any) => {
        if (blockRegistry[block.name]) {
          blockRegistry[block.name] = {
            ...blockRegistry[block.name],
            code: block.code,
            schema: block.schema,
            sampleData:
              block.sampleData || blockRegistry[block.name].sampleData,
          };
        }
      });
    }
  } catch (error) {
    console.error("Failed to update block metadata:", error);
  }
}

export default blockRegistry;
