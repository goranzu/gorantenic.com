const rssPlugin = require("@11ty/eleventy-plugin-rss");
const navPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const transforms = require("./lib/transforms");

module.exports = function (config) {
  // Plugins
  config.addPlugin(navPlugin);
  config.addPlugin(rssPlugin);

  // Transforms
  Object.entries(transforms).map(([name, transform]) => {
    config.addTransform(name, transform);
  });

  // Watch Targets
  config.addWatchTarget("./src/assets");

  // Markdown
  config.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    }),
  );

  // Passtrhough files
  config.addPassthroughCopy("src/assets/images");
  config.addPassthroughCopy("src/assets/fonts");

  // Deep Merge
  config.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "layouts",
      includes: "includes",
      data: "data",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
