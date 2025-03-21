"use client";

import React from "react";
import { Code, Copy, Eye, Info } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { HeroBlock } from "@/src/components/blocks/HeroBlock";

type ButtonVariant = "default" | "outline" | "secondary" | "link";

type ButtonType = {
  _key: string;
  label: string;
  variant: ButtonVariant;
  link: {
    href: string;
    openInNewTab: boolean;
  };
};

type HeroBlockProps = {
  _type: "hero";
  title?: string;
  badge?: string;
  richText?: Array<{
    _type: string;
    style: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  image?: {
    _type: string;
    asset: {
      _type: string;
      url: string;
    };
    alt: string;
  };
  buttons?: ButtonType[];
};

// Sample data for HeroBlock
const SAMPLE_HERO_DATA: HeroBlockProps = {
  _type: "hero",
  title: "Build Beautiful Pages with Reusable Blocks",
  badge: "New Release",
  richText: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Create stunning, responsive web pages using our collection of pre-built blocks. Mix and match components to build your perfect page layout.",
        },
      ],
    },
  ],
  image: {
    _type: "image",
    asset: {
      _type: "preview",
      url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1600&h=900&q=80",
    },
    alt: "Modern workspace with multiple monitors showing code",
  },
  buttons: [
    {
      _key: "button1",
      label: "Get Started",
      variant: "default" as ButtonVariant,
      link: {
        href: "#",
        openInNewTab: false,
      },
    },
    {
      _key: "button2",
      label: "Learn More",
      variant: "outline" as ButtonVariant,
      link: {
        href: "#",
        openInNewTab: false,
      },
    },
  ],
};

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

  // Only render if it's the HeroBlock
  if (type !== "HeroBlock") {
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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="text-gray-400 hover:text-white">
              ← Back to Blocks
            </Link>
            <h1 className="text-2xl font-bold">Hero Block</h1>
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
            <HeroBlock {...SAMPLE_HERO_DATA} />
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Component Usage</h3>
                <button
                  onClick={() =>
                    copyToClipboard(`<HeroBlock 
  title="Your Title"
  badge="Optional Badge"
  richText={[/* Your rich text content */]}
  image={/* Your image object */}
  buttons={[/* Your buttons array */]}
/>`)
                  }
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
                {`// Example usage
<HeroBlock 
  title="Your Title"
  badge="Optional Badge"
  richText={[/* Your rich text content */]}
  image={/* Your image object */}
  buttons={[/* Your buttons array */]}
/>`}
              </SyntaxHighlighter>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sample Data Structure</h3>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(SAMPLE_HERO_DATA, null, 2))
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
                {JSON.stringify(SAMPLE_HERO_DATA, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Block Information</h3>
            <div className="prose prose-invert">
              <p>
                The Hero Block is a versatile component designed for creating
                impactful page headers. It supports the following features:
              </p>
              <ul>
                <li>Title with large, bold typography</li>
                <li>Optional badge text</li>
                <li>Rich text description</li>
                <li>Featured image with optimized loading</li>
                <li>Configurable call-to-action buttons</li>
                <li>Responsive layout that adapts to all screen sizes</li>
              </ul>
              <h4>Required Fields</h4>
              <ul>
                <li>
                  <code>title</code> - The main heading text
                </li>
                <li>
                  <code>_type</code> - Must be "hero"
                </li>
              </ul>
              <h4>Optional Fields</h4>
              <ul>
                <li>
                  <code>badge</code> - Small text label above the title
                </li>
                <li>
                  <code>richText</code> - Formatted description text
                </li>
                <li>
                  <code>image</code> - Featured image object
                </li>
                <li>
                  <code>buttons</code> - Array of call-to-action buttons
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
