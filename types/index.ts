export type BlockState = {
  title: string;
  body: string;
  active: boolean;
  slug?: string;
};

export type FileState = BlockState;

export type FileStates = FileState[];

export type BlogState = BlockState & {
  htmlContent?: string;
  formattedDate?: string;
  shortDate?: string;
};

export type BlogStates = BlogState[];
