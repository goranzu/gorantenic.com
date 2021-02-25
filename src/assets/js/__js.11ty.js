const ENTRY_FILE = "main.js";

const rollup = require("rollup");
const terser = require("rollup-plugin-terser").terser;
const baseConfig = require("../../../config");

const inputOpts = {
  input: "./src/assets/js/" + ENTRY_FILE,
};

const outputOpts = {
  format: "es",
  sourcemap: baseConfig.isDev,
  plugins: [
    terser({
      mangle: {
        toplevel: true,
      },
      compress: {
        drop_console: baseConfig.isProd,
        drop_debugger: baseConfig.isProd,
      },
      output: {
        quote_style: 1,
      },
    }),
  ],
};

module.exports = class {
  data() {
    return {
      permalink: `/assets/js/${ENTRY_FILE}`,
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const bundle = await rollup.rollup(inputOpts);
    const { output } = await bundle.generate(outputOpts);
    const out = output.length && output[0];

    let code = "";
    if (out) {
      // JS code
      code = out.code;

      // inline source map
      if (out.map) {
        let b64 = new Buffer.from(out.map.toString());
        code +=
          "//# sourceMappingURL=data:application/json;base64," +
          b64.toString("base64");
      }
    }

    return code;
  }
};
