import { RichText } from "../../richtext";
import { PreviewImage } from "../../preview-image";
import Link from "next/link";
import Image from "next/image";

// Define the missing types
type ButtonType = {
  _key?: string;
  _type?: string;
  label?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
  };
  variant?: "default" | "outline" | "secondary" | "link";
};

type PagebuilderType<T extends string> = {
  _type: T;
  title?: string;
  badge?: string;
  richText?: any[];
  image?: any;
  buttons?: ButtonType[];
};

export type HeroBlockProps = PagebuilderType<"hero">;

// Simple Badge component to replace the imported one
const Badge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "outline":
        return "bg-transparent border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${getVariantClasses()}`}
    >
      {children}
    </span>
  );
};

// Custom SanityButtons component
const SanityButtons = ({
  buttons,
  className = "",
  buttonClassName = "",
}: {
  buttons?: ButtonType[];
  className?: string;
  buttonClassName?: string;
}) => {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={className}>
      {buttons.map((button, index) => {
        if (!button.link?.href) return null;

        const getButtonVariantClasses = () => {
          switch (button.variant) {
            case "outline":
              return "border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800";
            case "secondary":
              return "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600";
            case "link":
              return "text-blue-600 hover:underline dark:text-blue-400 p-0";
            default:
              return "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : "_self"}
            className={`${buttonClassName} inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  richText,
}: HeroBlockProps) {
  const isPreview = !image?.asset;

  return (
    <section id="hero" className="mt-4 md:py-16 bg-black">
      <div className="container  mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 items-center justify-items-center text-center lg:items-start lg:justify-items-start lg:text-left">
            {badge && <Badge variant="secondary">{badge}</Badge>}
            <div className="grid gap-4">
              <h1 className="text-4xl lg:text-6xl font-semibold text-balance">
                {title}
              </h1>
              {richText && (
                <RichText
                  richText={richText}
                  className="text-base md:text-lg font-normal text-gray-600 dark:text-gray-300"
                />
              )}
            </div>

            <SanityButtons
              buttons={buttons}
              buttonClassName="w-full sm:w-auto"
              className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start mb-8"
            />
          </div>

          <div className="h-96 w-full">
            {isPreview ? (
              <Image
                src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1600&h=900&q=80"
                width={1600}
                height={900}
                priority
                quality={90}
                alt="Modern workspace with multiple monitors showing code"
                className="h-full w-full rounded-3xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            ) : (
              <PreviewImage
                image={image}
                width={1600}
                height={900}
                priority
                quality={90}
                className="h-full w-full rounded-3xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
