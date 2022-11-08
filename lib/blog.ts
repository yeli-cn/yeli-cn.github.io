import { getFilesRecursively, readFileAsString } from "./utils/files";
import { load } from 'js-yaml'
import { assert } from "console";

export interface Blog {
  posts: Array<Post>,
  slugs: string[],
  tags: string[],
  categories: string[],
}

export type Post = {
  title: string,
  slug: string,
  content: string,
  categories: string[],
  tags: string[],
  date: Date,
}

let __BLOG_INSTANCE: Blog | null = null;

export const initBlog = async () => {
  if (__BLOG_INSTANCE) {
    return __BLOG_INSTANCE;
  }

  const sourcePath = '/Users/tang/Projects/yeli-cn.github.io/source/';
  const posts = await loadAllPosts(sourcePath);

  let instance = {
    posts: posts.sort((a, b) => a.date.getMilliseconds() - b.date.getMilliseconds()),
    tags: posts.reduce((prev, curr) => prev.concat(curr.tags), [] as string[]),
    categories: posts.reduce((prev, curr) => prev.concat(curr.categories), [] as string[]),
    slugs: posts.map(post => post.slug),
  }
  // console.log('Init the blog...\n', instance);
  __BLOG_INSTANCE = instance;
  return __BLOG_INSTANCE;
}


const loadAllPosts = async (path: string): Promise<Array<Post>> => {
  const files = getFilesRecursively(path).filter(file => file.endsWith('.md'));
  return files.map(file => {
    const { content, metadata } = parseMetadata(readFileAsString(file));
    const title = metadata?.title;

    // TODO: Try to parse the title from both the metadata and the content.
    assert(title, 'No title in this post:', file);

    const snakeCase = (str: string) => str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');

    const categories = file
      .split(path)[1]
      .split('/')
      .slice(0, -1);

    return {
      title: title!,
      slug: snakeCase(title!),
      content,
      categories,
      tags: metadata?.tags ?? [],
      date: metadata?.date ?? new Date(),
    };
  })
}

export const postsCount = async () => {
  const blog = await initBlog();
  return blog.posts.length;
}

export const fetchPagedPosts = async (page: number, size: number): Promise<Array<Post>> => {
  assert(page >= 1 && size >= 1, 'Both page and page size must greater or equal than 1');
  const blog = await initBlog();
  return blog.posts.slice((page - 1) * size, Math.min(blog.posts.length, page * size));
}

export const fetchAllPostsPaths = async (): Promise<string[]> => {
  const blog = await initBlog();
  return blog.slugs;
}

export const findPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const blog = await initBlog();
  return blog.posts.filter(post => post.slug == slug).pop();
}

// It returns metadata object and the string of content.
//
// The metadata must be at the beginning of the text and
// it should conforms the yaml(or markdown metadata) syntax.
const parseMetadata = (text: string) => {
  const metadataReg = /^\s*\-{3}([\w\W]*)\-{3}/;
  const matched = metadataReg.exec(text);

  if (matched) {
    const metadata = matched[1];
    const parsed = metadata ? load(metadata) : {};
    return {
      content: text.substring(matched[0].length + 1, text.length),
      metadata: parsed as {
        title?: string,
        tags?: string[],
        date?: Date
      }
    }
  }
  return { content: text }
}
