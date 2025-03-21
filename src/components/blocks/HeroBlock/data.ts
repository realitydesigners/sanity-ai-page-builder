import { type HeroBlockProps } from "./";

export const SAMPLE_HERO_DATA: HeroBlockProps = {
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
      variant: "default",
      link: {
        href: "#",
        openInNewTab: false,
      },
    },
    {
      _key: "button2",
      label: "Learn More",
      variant: "outline",
      link: {
        href: "#",
        openInNewTab: false,
      },
    },
  ],
};
