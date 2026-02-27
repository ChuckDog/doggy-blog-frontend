// 博客文章类型定义
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number; // 阅读时间（分钟）
}

// 导航链接类型
export interface NavLink {
  name: string;
  href: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  count: number;
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  count: number;
}