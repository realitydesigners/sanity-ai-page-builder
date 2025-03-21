import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import {
  buttonsField,
  richTextField,
} from "../../../sanity/schemaTypes/common";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  icon: PhoneIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description:
        "The smaller text that sits above the title to provide context",
      initialValue: "Ready to get started?",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The large text that is the primary focus of the block",
      initialValue: "Take Your Website to the Next Level",
    }),
    richTextField,
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
            text: "Join thousands of satisfied customers who have transformed their websites using our powerful block-based system. Get started today and see the difference.",
          },
        ],
      },
    ],
    buttons: [
      {
        _key: "primary",
        label: "Get Started Now",
        variant: "default",
        link: {
          href: "/signup",
          openInNewTab: false,
        },
      },
      {
        _key: "secondary",
        label: "View Demo",
        variant: "outline",
        link: {
          href: "/demo",
          openInNewTab: true,
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
      subtitle: "CTA Block",
    }),
  },
});
