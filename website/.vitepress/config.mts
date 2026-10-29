import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import side from './sidebar.generated.json' with { type: 'json' };

const GH = 'https://github.com/junaaid96/angular-fundamentals-lessons';
const SITE = 'https://junaaid96.github.io/angular-fundamentals-lessons/';

export default withMermaid(defineConfig({
  srcDir: 'content',
  base: '/angular-fundamentals-lessons/',
  lang: 'en-US',
  title: 'Angular Fundamentals Lessons',
  titleTemplate: ':title · Angular Fundamentals',
  description: 'Hands-on lessons for modern Angular 22: standalone components, signals, zoneless change detection, control flow, routing, forms, DI and deferrable views.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: SITE },
  head: [
    ['meta', { name: 'theme-color', content: '#c3002f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Angular Fundamentals Lessons' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],
  transformPageData(page) {
    const route = page.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    const title = page.frontmatter.title || page.title || 'Angular Fundamentals Lessons';
    const desc = page.frontmatter.description || page.description || '';
    page.frontmatter.head ??= [];
    page.frontmatter.head.push(
      ['link', { rel: 'canonical', href: SITE + route }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:url', content: SITE + route }],
      ['meta', { property: 'og:description', content: desc }],
    );
  },
  markdown: {
    lineNumbers: true,
    config(md) {
      // Angular template syntax such as {{ value }} in inline code must not be compiled by Vue.
      const orig = md.renderer.rules.code_inline!;
      md.renderer.rules.code_inline = (...args) => orig(...args).replace('<code', '<code v-pre');
    },
  },
  themeConfig: {
    nav: [
      { text: 'Learning path', link: '/' },
      { text: 'Lessons', link: side.lessons[0]?.link ?? '/' },
      { text: 'angular.dev', link: 'https://angular.dev' },
    ],
    sidebar: [
      { text: 'Learning path', items: [{ text: 'Overview', link: '/' }] },
      { text: `Lessons (00-${String(side.lessons.length - 1).padStart(2, '0')})`, collapsed: false, items: side.lessons },
    ],
    socialLinks: [{ icon: 'github', link: GH }],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    editLink: {
      pattern: ({ frontmatter }) => `https://github.com/junaaid96/angular-fundamentals-lessons/blob/main/${frontmatter.source ?? ''}`,
      text: 'View source on GitHub',
    },
    footer: { message: 'Released under the MIT License.', copyright: '© 2026 Md. Junaidul Islam' },
  },
  mermaid: { theme: 'default' },
}));
