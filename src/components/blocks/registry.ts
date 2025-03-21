import { type ComponentType } from "react";

export type BlockDefinition = {
  component: ComponentType<any>;
  schema: any;
  query: {
    fragment: string;
    dependencies?: string[];
  };
};

type BlockRegistry = Record<string, BlockDefinition>;

const blockRegistry: BlockRegistry = {};

export function registerBlock(
  type: string,
  component: ComponentType<any>,
  schema: any,
  query: { fragment: string; dependencies?: string[] }
) {
  if (blockRegistry[type]) {
    console.warn(
      `Block type "${type}" is already registered. It will be overwritten.`
    );
  }

  blockRegistry[type] = {
    component,
    schema,
    query,
  };
}

export function getBlock(type: string): BlockDefinition {
  const block = blockRegistry[type];
  if (!block) {
    throw new Error(`Block type "${type}" not found in registry`);
  }
  return block;
}

export function getAllBlocks(): BlockRegistry {
  return blockRegistry;
}

export function getAllSchemas() {
  return Object.values(blockRegistry).map((block) => block.schema);
}

export function getAllQueryFragments() {
  return Object.values(blockRegistry).map((block) => block.query);
}

// Helper to compose GROQ query from registered blocks
export function composeBlocksQuery(additionalFragments: string[] = []) {
  const fragments = getAllQueryFragments()
    .map(({ fragment, dependencies = [] }) => {
      return [fragment, ...dependencies].join("\n");
    })
    .concat(additionalFragments);

  return /* groq */ `
    pageBuilder[]{
      ...,
      _type,
      ${fragments.join(",\n")}
    }
  `;
}

export default blockRegistry;
