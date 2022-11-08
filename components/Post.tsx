import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Post } from "../lib/blog";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type Props = {
  post: Post
}

export const PostView = ({ post }: Props) => (
  <div className="relative">
    <ReactMarkdown
      components={{
        h1: ({ level, node, children, ...props }) => (
          <Link href={`/post/${post.slug}`}>
            <h1
              className="hover:before:content-['#'] before:text-xl before:mr-1 before:text-blue-500 text-3xl mb-4 before:absolute before:-left-4"
              {...props}
            >{children}</h1>
          </Link>
        ),
        h2: ({ level, node, children, ...props }) => (
          <h2
            className="hover:before:content-['##'] before:text-lg before:text-blue-500 text-2xl before:absolute before:-left-6"
            {...props}
          >{children}</h2>
        ),
        h3: ({ level, node, children, ...props }) => (
          <h3
            className="hover:before:content-['###'] before:text-base before:mr-1 before:text-blue-500 text-xl mb-2 before:absolute before:-left-8"
            {...props}
          >{children}</h3>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="rounded-lg bg-gray-100 bg-opacity-70 text-sm">
              <SyntaxHighlighter
                // @ts-ignore
                style={a11yLight}
                customStyle={{
                  backgroundColor: 'transparent',
                }}
                showLineNumbers={true}
                wrapLines={true}
                language={match[1]}
                {...props}
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="rounded-md pl-1 pr-1 bg-slate-100"
              {...props}
            >{children}</code>
          )
        },
        a: ({ children, ...props }) => (
          <a
            className="text-purple-600 underline"
            {...props}
          >{children}</a>
        ),
        p: ({ node, ...props }) => (<p className="mb-4 text-gray-700" {...props} />),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="pl-4 border-l-4 border-l-indigo-700 border-opacity-75 font-serif"
            {...props}
          />
        ),
      }}
    >{post.content}</ReactMarkdown>
  </div >
)
