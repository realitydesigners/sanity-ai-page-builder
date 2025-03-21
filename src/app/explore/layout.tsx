import Link from "next/link";
import Image from "next/image";
export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 sticky top-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="w-full px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-semibold text-white hover:text-gray-300"
              >
                <Image
                  src="/logo.png"
                  alt="Sanity Blocks"
                  width={32}
                  height={32}
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/explore"
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                Explore
              </Link>
              <a
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                Docs
              </a>
              <a
                href="https://github.com/your-username/sanity-ai-page-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
