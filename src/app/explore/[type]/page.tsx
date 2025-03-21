"use client";

import React from "react";
import { Code, Copy, Eye, Info, Wand2 } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  blockExists,
  getBlockData,
  updateBlockMetadata,
} from "@/src/components/blocks/registry";
import { BlockPrompt } from "../components/BlockPrompt";

export default function BlockDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = React.use(params);
  const [activeTab, setActiveTab] = React.useState<"code" | "info" | "prompt">(
    "code"
  );
  const [activeCodeTab, setActiveCodeTab] = React.useState<
    "component" | "schema"
  >("component");
  const [isLoading, setIsLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    updateBlockMetadata().then(() => {
      setIsLoading(false);
    });
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Loading Block Data...</h1>
        </div>
      </div>
    );
  }

  // Check if block exists
  if (!blockExists(type)) {
    return (
      <div className="p-8">
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
        return blockData.code || "// Loading component code...";
      case "schema":
        return blockData.schemaCode || "// Loading schema code...";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Preview Section */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-white">{type}</h1>
        </div>
        <div className="border border-[#181818] rounded-xl overflow-hidden ">
          <BlockComponent {...blockData.sampleData} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[600px] border-l border-[#181818] overflow-hidden flex flex-col bg-black/50 backdrop-blur-sm">
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center px-6 py-3 transition-colors ${
              activeTab === "code"
                ? "text-white border-b-2 border-blue-500 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Code className="mr-2" size={16} />
            Code
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center px-6 py-3 transition-colors ${
              activeTab === "info"
                ? "text-white border-b-2 border-blue-500 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Info className="mr-2" size={16} />
            Info
          </button>
          <button
            onClick={() => setActiveTab("prompt")}
            className={`flex items-center px-6 py-3 transition-colors ${
              activeTab === "prompt"
                ? "text-white border-b-2 border-blue-500 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Wand2 className="mr-2" size={16} />
            Prompt
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "code" && (
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveCodeTab("component")}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                    activeCodeTab === "component"
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Component
                </button>
                <button
                  onClick={() => setActiveCodeTab("schema")}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                    activeCodeTab === "schema"
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Schema
                </button>
              </div>

              <div className="relative group">
                <button
                  onClick={() => copyToClipboard(getCodeContent())}
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
                <SyntaxHighlighter
                  language="typescript"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",

                    fontSize: "10px",
                  }}
                  showLineNumbers={true}
                  wrapLongLines={false}
                  wrapLines={false}
                >
                  {getCodeContent()}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div className="p-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  The <span className="text-blue-400 font-medium">{type}</span>{" "}
                  is a versatile component designed for creating impactful page
                  sections. It supports the following features:
                </p>
                {blockData.schema && (
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-white mb-4">
                      Schema Fields
                    </h4>
                    <div className="space-y-4">
                      {typeof blockData.schema === "object" &&
                        blockData.schema.fields?.map((field: any) => (
                          <div
                            key={field.name}
                            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <strong className="text-blue-400">
                                {field.title || field.name}
                              </strong>
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                                {field.type}
                              </span>
                            </div>
                            {field.description && (
                              <p className="mt-2 text-sm text-gray-400">
                                {field.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "prompt" && (
            <BlockPrompt
              blockName={type}
              componentCode={blockData.code}
              schemaCode={blockData.schemaCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
