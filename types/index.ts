type BlockState = {
  title: string;
  body: string;
  active: boolean;
};

export type FileState = BlockState;

export type FileStates = FileState[];

export type BlogState = BlockState;

export type BlogStates = BlogState[];
