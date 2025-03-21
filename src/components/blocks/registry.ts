import { type ComponentType } from "react";
import { HeroBlock } from "./HeroBlock";
import { hero } from "./HeroBlock/schema";

export type BlockDefinition = {
  component: ComponentType<any>;
  schema: any;
  code: string;
};

export type BlockRegistry = Record<string, BlockDefinition>;

// Helper function to get initial values from schema
const getInitialValues = (schema: any) => {
  const initialValues: any = { _type: schema.name, ...schema.initialValue };

  // Merge field-level initial values
  schema.fields?.forEach((field: any) => {
    if (field.initialValue && !(field.name in initialValues)) {
      initialValues[field.name] = field.initialValue;
    }
  });

  return initialValues;
};

// Initialize with known blocks
export const blockRegistry: BlockRegistry = {
  HeroBlock: {
    component: HeroBlock,
    schema: hero,
    code: "", // Will be populated from the API
  },
};

// Helper function to get block names
export const getBlockNames = (): string[] => Object.keys(blockRegistry);

// Helper function to get block data
export const getBlockData = (blockName: string) => {
  const block = blockRegistry[blockName];
  if (!block) return null;

  return {
    ...block,
    sampleData: getInitialValues(block.schema),
  };
};

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
          };
        }
      });
    }
  } catch (error) {
    console.error("Failed to update block metadata:", error);
  }
}

export default blockRegistry;
