/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function DefaultTemplate({ page, pageTitle, site, config, nav, pathname, children }: any) {
  return (
    <Layout site={site} config={config} nav={nav} page={page} pageTitle={pageTitle} pathname={pathname}>
      <article class="prose">
        {children}
      </article>
    </Layout>
  );
}
