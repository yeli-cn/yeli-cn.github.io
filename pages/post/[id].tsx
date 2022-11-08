import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { Layout } from '@/components/Layout';
import { PostView } from '@/components/Post';
import { fetchAllPostsPaths, findPostBySlug, Post } from '@/lib/blog';


interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetchAllPostsPaths();
  return {
    paths: paths.map(path => ({ params: { id: path } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (content) => {
  const { id } = content.params as IParams;
  const post = await findPostBySlug(id) ?? null;
  return {
    props: { post: JSON.parse(JSON.stringify(post!)) }
  }
}

const PostPage: NextPage<{ post: Post }> = ({ post }) => (
  <Layout>
    <PostView post={post} />
  </Layout>
)

export default PostPage;
