"use client";

import React from "react";
import { Code, Copy, Eye, Info } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { blockExists, getBlockData } from "@/src/components/blocks/registry";

export default function BlockDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = React.use(params);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code" | "info">(
    "preview"
  );

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Check if block exists
  if (!blockExists(type)) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Block Not Found</h1>
          <p>The block type "{type}" is not available for preview.</p>
          <Link
            href="/explore"
            className="text-blue-500 hover:text-blue-400 mt-4 inline-block"
          >
            ← Back to Blocks
          </Link>
        </div>
      </div>
    );
  }

  // Get block data
  const blockData = getBlockData(type);
  const BlockComponent = blockData.component;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="text-gray-400 hover:text-white">
              ← Back to Blocks
            </Link>
            <h1 className="text-2xl font-bold">{type}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "preview"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Eye className="inline-block mr-2" size={16} />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "code"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code className="inline-block mr-2" size={16} />
              Code
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "info"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Info className="inline-block mr-2" size={16} />
              Info
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        {activeTab === "preview" && (
          <div className="border border-[#181818] rounded-lg overflow-hidden">
            <BlockComponent {...blockData.sampleData} />
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Component Code</h3>
                <button
                  onClick={() => copyToClipboard(blockData.code)}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  background: "#1f2937",
                }}
              >
                {blockData.code}
              </SyntaxHighlighter>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sample Data Structure</h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(blockData.sampleData, null, 2)
                    )
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  background: "#1f2937",
                }}
              >
                {JSON.stringify(blockData.sampleData, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Block Information</h3>
            <div className="prose prose-invert">
              <p>
                The {type} is a versatile component designed for creating
                impactful page sections. It supports the following features:
              </p>
              {blockData.schema && (
                <>
                  <h4>Schema</h4>
                  <SyntaxHighlighter
                    language="typescript"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      background: "#1f2937",
                    }}
                  >
                    {JSON.stringify(blockData.schema, null, 2)}
                  </SyntaxHighlighter>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
