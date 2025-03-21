import Link from "next/link";
import { RichText } from "../../richtext";

// Define the types for the component
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
  eyebrow?: string;
  richText?: any[];
  buttons?: ButtonType[];
};

export type CTABlockProps = PagebuilderType<"cta">;

// Simple Badge component to replace the imported one
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-white/10 text-white border border-white/20 dark:bg-gray-900/50 dark:text-gray-100 backdrop-blur-xl";
      case "outline":
        return "bg-transparent border border-violet-200/30 text-violet-100 dark:border-violet-500/20 dark:text-violet-200";
      default:
        return "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 dark:from-violet-400/20 dark:to-fuchsia-400/20 dark:text-violet-200";
    }
  };

  return (
    <span
      className={`inline-flex px-4 py-1.5 text-xs sm:text-sm sm:px-5 sm:py-2 font-medium rounded-full shadow-lg shadow-violet-500/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 ${getVariantClasses()} ${className}`}
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
              return "border border-violet-200/20 text-white hover:bg-violet-500/10 dark:border-violet-400/20 dark:text-white dark:hover:bg-violet-500/20 backdrop-blur-xl transition-all duration-300";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 dark:bg-gray-800/50 dark:text-white dark:hover:bg-gray-700/50 backdrop-blur-xl";
            case "link":
              return "text-violet-200 hover:text-violet-100 dark:text-violet-300 dark:hover:text-violet-200 p-0 hover:scale-105";
            default:
              return "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 dark:from-violet-500 dark:to-fuchsia-500 dark:hover:from-violet-400 dark:hover:to-fuchsia-400 shadow-lg shadow-violet-500/25 dark:shadow-violet-500/20";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : "_self"}
            className={`${buttonClassName} inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm sm:px-6 sm:py-3 md:px-8 md:py-3.5 font-medium rounded-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

export function CtaBlock({ richText, title, eyebrow, buttons }: CTABlockProps) {
  return (
    <section className="my-8 sm:my-12 md:my-16 lg:my-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden">
          {/* High-tech background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-violet-900/50 to-gray-900 dark:from-gray-900 dark:via-violet-950/30 dark:to-gray-900 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-500/10 via-fuchsia-500/5 to-transparent dark:from-violet-400/10 dark:via-fuchsia-400/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent dark:from-violet-400/10" />

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          {/* Content */}
          <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-[85rem] mx-auto space-y-6 sm:space-y-8">
              {eyebrow && (
                <div className="transform transition-all duration-300 hover:scale-105">
                  <Badge variant="secondary">{eyebrow}</Badge>
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white text-balance [text-shadow:0_4px_8px_rgba(139,92,246,0.3)] transition-all duration-300 px-4">
                {title}
              </h2>
              <div className="text-base sm:text-lg text-gray-300/90 dark:text-gray-300/90 max-w-2xl mx-auto backdrop-blur-sm px-4">
                <RichText
                  richText={richText}
                  className="text-balance leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]"
                />
              </div>
              <div className="flex justify-center pt-4 sm:pt-6 md:pt-8">
                <SanityButtons
                  buttons={buttons}
                  buttonClassName="w-full sm:w-auto mx-2"
                  className="w-full sm:w-fit flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
