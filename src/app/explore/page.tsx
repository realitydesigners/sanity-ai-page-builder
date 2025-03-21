import { getAllBlocks } from "@/src/components/blocks/registry";
import Link from "next/link";
import { Code, Copy, Eye } from "lucide-react";

export default function ExplorePage() {
  const blocks = getAllBlocks();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Explore Blocks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(blocks).map(([type, block]) => (
            <Link
              href={`/explore/${type}`}
              key={type}
              className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all"
            >
              <div className="aspect-video relative bg-gray-800">
                {/* Preview will go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-medium">{type}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {type.replace(/([A-Z])/g, " $1").trim()}
                </h3>

                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code size={16} />
                    <span>Code</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Copy size={16} />
                    <span>Copy</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
