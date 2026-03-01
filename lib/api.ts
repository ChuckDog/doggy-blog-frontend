const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000";

export async function getBlogPosts() {
  const res = await fetch(`${BASE}/blog/posts`, { cache: "no-store" });
  return res.json();
}

export async function getPostById(id: string) {
  const res = await fetch(`${BASE}/blog/posts/${id}`, { cache: "no-store" });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/blog/categories`, { cache: "no-store" });
  return res.json();
}

export async function getTags() {
  const res = await fetch(`${BASE}/blog/tags`, { cache: "no-store" });
  return res.json();
}

export async function getPostsByCategory(categoryId: string) {
  const res = await fetch(`${BASE}/blog/categories/${categoryId}/posts`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getPostsByTag(tagId: string) {
  const res = await fetch(`${BASE}/blog/tags/${tagId}/posts`, {
    cache: "no-store",
  });
  return res.json();
}

export async function searchPosts(keyword: string) {
  const res = await fetch(
    `${BASE}/blog/search?keyword=${encodeURIComponent(keyword)}`,
    { cache: "no-store" },
  );
  return res.json();
}
