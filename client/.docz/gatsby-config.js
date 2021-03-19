const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Widgets',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'D:\\PingPong\\pingPongApp\\client\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Widgets',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3002,
        p: 3000,
        separator: '-',
        paths: {
          root: 'D:\\PingPong\\pingPongApp\\client',
          templates:
            'D:\\PingPong\\pingPongApp\\client\\node_modules\\docz-core\\dist\\templates',
          docz: 'D:\\PingPong\\pingPongApp\\client\\.docz',
          cache: 'D:\\PingPong\\pingPongApp\\client\\.docz\\.cache',
          app: 'D:\\PingPong\\pingPongApp\\client\\.docz\\app',
          appPackageJson: 'D:\\PingPong\\pingPongApp\\client\\package.json',
          appTsConfig: 'D:\\PingPong\\pingPongApp\\client\\tsconfig.json',
          gatsbyConfig: 'D:\\PingPong\\pingPongApp\\client\\gatsby-config.js',
          gatsbyBrowser: 'D:\\PingPong\\pingPongApp\\client\\gatsby-browser.js',
          gatsbyNode: 'D:\\PingPong\\pingPongApp\\client\\gatsby-node.js',
          gatsbySSR: 'D:\\PingPong\\pingPongApp\\client\\gatsby-ssr.js',
          importsJs:
            'D:\\PingPong\\pingPongApp\\client\\.docz\\app\\imports.js',
          rootJs: 'D:\\PingPong\\pingPongApp\\client\\.docz\\app\\root.jsx',
          indexJs: 'D:\\PingPong\\pingPongApp\\client\\.docz\\app\\index.jsx',
          indexHtml:
            'D:\\PingPong\\pingPongApp\\client\\.docz\\app\\index.html',
          db: 'D:\\PingPong\\pingPongApp\\client\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
