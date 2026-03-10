import { api } from "@/lib/api";

export const createPost = async (data: FormData) => {
  const res = await api.post("/api/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getPosts = async () => {
  const res = await api.get("/api/posts");
  return res.data;
};

export const getPostById = async (id: string) => {
  const res = await api.get(`/api/posts/${id}`);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await api.delete(`/api/posts/${id}`);
  return res.data;
};

export const getFeed = async () => {
  const res = await api.get("/api/feed");
  return res.data;
};
