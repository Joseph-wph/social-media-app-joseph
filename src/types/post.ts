export type PostUser = {
  id: number;
  username: string;
  name: string;
  avatar?: string;
};

export type Post = {
  id: number;
  content: string;
  image?: string;
  createdAt: string;

  user: PostUser;
  sharesCount: number;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type FeedResponse = {
  items: Post[];
  pagination: Pagination;
};
