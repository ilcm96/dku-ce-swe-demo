export type Reply = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
};

export type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
  replies: Reply[];
};

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  board: "review" | "free" | "qna";
};
