import React from "react";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type BlockPromptProps = {
  blockName: string;
  componentCode: string;
  schemaCode: string;
};

export function BlockPrompt({
  blockName,
  componentCode,
  schemaCode,
}: BlockPromptProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const generateCursorPrompt = () => {
    return `Create a new Sanity block called ${blockName} with the following structure:

First, ensure you have these dependencies in your project:
\`\`\`json
{
  "dependencies": {
    "@sanity/client": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "sanity": "latest"
  }
}
\`\`\`

Component (src/components/blocks/${blockName}/index.tsx):
\`\`\`typescript
${componentCode}
\`\`\`

Schema (src/components/blocks/${blockName}/schema.ts):
\`\`\`typescript
${schemaCode}
\`\`\`

You'll also need these shared types/components:
- \`RichText\` component for rendering Portable Text
- \`PreviewImage\` component for Sanity image handling
- Common schema fields (\`buttonsField\`, \`richTextField\`) in \`@/src/sanity/schemaTypes/common\`

Please set up this block following these steps:
1. Create a new directory under src/components/blocks/${blockName}
2. Create the component file (index.tsx) with the provided code
3. Create the schema file (schema.ts) with the provided code
4. Update your block registry to include this new block:

\`\`\`typescript
// In your registry file
import { ${blockName} } from "./${blockName}";
import { hero } from "./${blockName}/schema";

// Add to your registry
{
  ${blockName}: {
    component: ${blockName},
    schema: hero,
  }
}
\`\`\`

The block follows the structure used by the generate-block.ts script, which creates blocks with a component file and schema file in a dedicated directory.`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">
          Generate Block with Cursor
        </h3>
        <p className="text-sm text-gray-400">
          Copy this prompt to create this block in another project using Cursor
          AI. The prompt includes all necessary code and instructions.
        </p>
      </div>
      <div className="relative group">
        <button
          onClick={() => copyToClipboard(generateCursorPrompt())}
          className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <div className="flex items-center gap-1 text-green-500">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xs">Copied!</span>
            </div>
          ) : (
            <Copy size={16} />
          )}
        </button>
        <div className="rounded-xl overflow-hidden shadow-xl shadow-black/20">
          <SyntaxHighlighter
            language="markdown"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              background: "#1a1b26",
              fontSize: "13px",
            }}
          >
            {generateCursorPrompt()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
