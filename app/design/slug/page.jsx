/* eslint-disable @next/next/inline-script-id */
import React from "react";
import PropTypes from "prop-types";
import getMarkdowns from "../../../src/utils/getMarkdowns/getMarkdowns";
import getMarkdown from "../../../src/utils/getMarkdown/getMarkdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import Script from "next/script";

export default async function Page({ params }) {
const contentPath = "src/content/blog";
const post = getMarkdown(params.slug, contentPath);

return (
  <div>
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {post.content}
    </ReactMarkdown>
    <Script
      type="module"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs";
        mermaid.initialize({startOnLoad: true});
        mermaid.contentLoaded();
`,
      }}
    />
  </div>
);
}

export function generateStaticParams() {
const contentPath = "src/content/blog";
const posts = getMarkdowns(contentPath);

return posts.map((post) => ({
  slug: post.slug,
}));
}

Page.propTypes = {
params: PropTypes.func.isRequired,
};
