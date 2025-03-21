import Link from "next/link";
import { Code, Eye } from "lucide-react";

// For now, we'll hardcode the available blocks
const AVAILABLE_BLOCKS = [
  {
    type: "HeroBlock",
    title: "Hero Block",
    description:
      "A versatile hero section with title, description, image, and CTA buttons",
  },
  // Add more blocks here as they become available
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Explore Blocks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_BLOCKS.map((block) => (
            <Link
              href={`/explore/${block.type}`}
              key={block.type}
              className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all"
            >
              <div className="aspect-video relative bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-medium">{block.title}</span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-400 mb-4">{block.description}</p>

                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code size={16} />
                    <span>Code</span>
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
