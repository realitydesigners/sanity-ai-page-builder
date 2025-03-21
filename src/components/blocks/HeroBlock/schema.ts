import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "@/src/sanity/schemaTypes/common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Badge",
      initialValue: "Beta",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Build Beautiful Pages with Reusable Blocks",
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "The main image for the hero section",
      options: {
        hotspot: true,
      },
    }),
    buttonsField,
  ],
  initialValue: {
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
  },
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Hero Block",
    }),
  },
});
