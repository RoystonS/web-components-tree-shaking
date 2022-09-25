import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import postcssLit from "rollup-plugin-postcss-lit";
import typescript from "@rollup/plugin-typescript";

const plugins = [
  nodeResolve(),
  postcss({
    extract: false,
    inject: false,
  }),
  postcssLit(),
  typescript(),
];

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "es",
    },
  ],
  external: ["tslib", "lit", "lit/decorators.js", "lit/directives/class-map.js", "@lit/reactive-element"],
  manualChunks(id) {
    if (id.includes("component1")) {
      return "component1";
    } else if (id.includes("component2")) {
      return "component2";
    } else if (id.includes("src/index.ts")) {
      return undefined;
    } else {
      throw new Error(`Unexpected module: ${id}`);
    }
  },
  plugins,
};
