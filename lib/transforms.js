const { inlineSource } = require("inline-source");
const htmlmin = require("html-minifier");
const baseConfig = require("../config");
// const crit = require("critical");

// const isHomePage = (outputPath) => outputPath === "dist/index.html";

async function inline(content, outputPath) {
  if (!String(outputPath).endsWith(".html")) return content;

  return await inlineSource(content, {
    compress: true,
    rootpath: "./dist",
  });
}

function htmlMinifier(content, outputPath = ".html") {
  if (!String(outputPath && baseConfig.isDev).endsWith(".html")) return content;

  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
  });
}

// async function critical(content, outputPath) {
//   if (!String(outputPath).endsWith(".html") || baseConfig.isDev) return content;
//   if (!isHomePage(outputPath)) return content;

//   try {
//     const { html } = await crit.generate({
//       base: "dist/",
//       html: content,
//       inline: true,
//       width: 1280,
//       height: 800,
//     });
//     return html;
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = { inline, htmlMinifier };
