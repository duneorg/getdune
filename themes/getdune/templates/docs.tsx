/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function DocsTemplate({ page, pageTitle, site, config, nav, pathname, children }: any) {
  return (
    <Layout site={site} config={config} nav={nav} page={page} pageTitle={pageTitle} pathname={pathname}>
      <article class="prose">
        <h1>{page?.frontmatter?.heading ?? page?.frontmatter?.title}</h1>
        {page?.frontmatter?.description && (
          <p class="page-intro">{page.frontmatter.description}</p>
        )}
        <div>{children}</div>
      </article>
    </Layout>
  );
}
