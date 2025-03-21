// Schema imports
import { cta } from "./CtaBlock/schema";
import { faqAccordion } from "./FaqAccordianBlock/schema";
import { hero } from "./HeroBlock/schema";
import { imageLinkCards } from "./ImageCardBlock/schema";

// Component imports
import { CtaBlock } from "./CtaBlock";
import { FaqAccordianBlock } from "./FaqAccordianBlock";
import { HeroBlock } from "./HeroBlock";
import { ImageCardBlock } from "./ImageCardBlock";

export const BLOCK_COMPONENTS = {
  cta: CtaBlock,
  faqAccordion: FaqAccordianBlock,
  hero: HeroBlock,
  imageLinkCards: ImageCardBlock,
} as const;

// Export for Sanity Studio schema
export const pageBuilderBlocks = [hero, cta, faqAccordion, imageLinkCards];
