"use client";

import React from "react";
import { Code, Copy, Eye, Info } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  blockExists,
  getBlockData,
  updateBlockMetadata,
} from "@/src/components/blocks/registry";

export default function BlockDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = React.use(params);
  const [activeTab, setActiveTab] = React.useState<"code" | "info">("code");
  const [activeCodeTab, setActiveCodeTab] = React.useState<
    "component" | "schema"
  >("component");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    updateBlockMetadata().then(() => {
      setIsLoading(false);
    });
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Loading Block Data...</h1>
          </div>
        </header>
      </div>
    );
  }

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

  // Function to get the appropriate code based on the active tab
  const getCodeContent = () => {
    switch (activeCodeTab) {
      case "component":
        return blockData.code;
      case "schema":
        return typeof blockData.schema === "string"
          ? blockData.schema
          : JSON.stringify(blockData.schema, null, 2);
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="text-gray-400 hover:text-white">
              ← Back to Blocks
            </Link>
            <h1 className="text-2xl font-bold">{type}</h1>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Preview Section */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="border border-[#181818] rounded-lg overflow-hidden ">
            <BlockComponent {...blockData.sampleData} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[600px] border-l border-gray-800 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center px-4 py-2 ${
                activeTab === "code"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code className="mr-2" size={16} />
              Code
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center px-4 py-2 ${
                activeTab === "info"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Info className="mr-2" size={16} />
              Info
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "code" && (
              <div className="p-4">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveCodeTab("component")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeCodeTab === "component"
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Component
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("schema")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeCodeTab === "schema"
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Schema
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(getCodeContent())}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  >
                    <Copy size={16} />
                  </button>
                  <SyntaxHighlighter
                    language="typescript"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                    showLineNumbers={true}
                  >
                    {getCodeContent()}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="p-4">
                <div className="prose prose-invert prose-sm">
                  <p>
                    The {type} is a versatile component designed for creating
                    impactful page sections. It supports the following features:
                  </p>
                  {blockData.schema && (
                    <>
                      <h4 className="text-sm font-medium mt-4 mb-2">
                        Schema Fields
                      </h4>
                      <ul className="space-y-2">
                        {typeof blockData.schema === "object" &&
                          blockData.schema.fields?.map((field: any) => (
                            <li key={field.name} className="text-sm">
                              <strong>{field.title || field.name}</strong>
                              {field.description && (
                                <span className="text-gray-400 ml-2">
                                  - {field.description}
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
