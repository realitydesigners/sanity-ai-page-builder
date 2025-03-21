"use client";

import React from "react";
import { getBlock } from "@/src/components/blocks/registry";
import { generateSampleBlockData } from "@/src/lib/block-utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Code, Copy, Eye, Info } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlockDetailPage() {
  const params = useParams();
  const type = params.type as string;
  const block = getBlock(type);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "info">(
    "preview"
  );

  // Generate sample data for the block
  const sampleData = generateSampleBlockData(block.schema, type);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="text-gray-400 hover:text-white">
              ← Back to Blocks
            </Link>
            <h1 className="text-2xl font-bold capitalize">
              {type.replace(/([A-Z])/g, " $1").trim()}
            </h1>
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
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="prose prose-invert max-w-none">
              {block && React.createElement(block.component, sampleData)}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Component Code</h3>
                <button
                  onClick={() => copyToClipboard("// Component code here")}
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
                {`// Component code will be displayed here`}
              </SyntaxHighlighter>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Schema</h3>
                <button
                  onClick={() => copyToClipboard("// Schema code here")}
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
                {`// Schema code will be displayed here`}
              </SyntaxHighlighter>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sample Data</h3>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(sampleData, null, 2))
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
                {JSON.stringify(sampleData, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Usage Information</h3>
            <div className="prose prose-invert">
              <p>
                This block can be used in your Sanity schema by adding it to
                your page builder configuration. The sample data above shows the
                expected data structure for this block.
              </p>
              <h4>Required Fields</h4>
              <ul>
                {block.schema.fields?.map((field: any) => (
                  <li key={field.name}>
                    <code>{field.name}</code> ({field.type})
                    {field.validation?.required && " - Required"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
