const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

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

// Auth & Likes
export const getAuthToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export async function login(data: any) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

// Re-using the admin create user endpoint might require auth. 
// We should check if we can register publicly. 
// The backend UsersController.createUser is now protected by AuthGuard('jwt').
// So public registration is currently NOT possible unless we open it up or create a dedicated register endpoint.
// For now, let's assume we use an existing user or create one via console.
// OR we can create a public register endpoint in AuthController.
export async function register(data: any) {
  // Ideally this should point to a public registration endpoint
  // For this demo, let's assume we added one or user uses console to create accounts.
  // Let's try to call a public endpoint we might add later.
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
}

export async function likePost(postId: string) {
  const token = getAuthToken();
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to like');
}

export async function unlikePost(postId: string) {
  const token = getAuthToken();
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to unlike');
}

export async function getLikesCount(postId: string) {
  const res = await fetch(`${BASE}/posts/${postId}/likes`);
  return res.json();
}

export async function getIsLiked(postId: string) {
  const token = getAuthToken();
  if (!token) return { liked: false };
  const res = await fetch(`${BASE}/posts/${postId}/is-liked`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { liked: false };
  return res.json();
}
