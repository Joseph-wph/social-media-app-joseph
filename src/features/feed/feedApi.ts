import { api } from "@/lib/api";

export const getFeed = async (page = 1, limit = 20) => {
  const res = await api.get("/api/feed", {
    params: { page, limit },
  });

  return res.data;
};
