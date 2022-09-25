import path from "path";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import html from "@web/rollup-plugin-html";
import serve from "rollup-plugin-serve";

const plugins = [
  nodeResolve(),
  html({
    // input: "index.html",
    //   minify: true,
  }),
];

console.log("WATCH", process.env.WATCH);

if (process.env.WATCH) {
  plugins.push(
    serve({
      contentBase: path.join(__dirname, "dist"),
      port: 10001,
    })
  );
}

const input = path.join(__dirname, "public/index.html");
console.log("input", input);
export default {
  input,
  output: { dir: path.join(__dirname, "dist") },
  plugins,
};
