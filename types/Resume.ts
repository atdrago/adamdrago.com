export type ResumeItem =
  | ResumeItemParagraph
  | ResumeItemSection
  | ResumeItemList;

export interface ResumeItemParagraph {
  kind: "paragraph";
  content: string;
}

export interface ResumeItemSection {
  kind: "section";
  content: {
    heading?: string;
    subheading?: string;
    comment?: string;
    items?: ResumeItem[];
  };
}
export interface ResumeItemList {
  kind: "list";
  items?: { content: string; style: "normal" | "bold" }[];
}

export interface Resume {
  updatedAt: string;
  sections: {
    heading: string;
    items?: ResumeItem[];
  }[];
}
