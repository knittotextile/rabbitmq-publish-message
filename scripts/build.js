const esbuild = require("esbuild");
const { clean } = require("esbuild-plugin-clean");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    platform: "node",
    target: "node16",
    bundle: true,
    sourcemap: true,
    outdir: "dist",
    plugins: [clean()],
  })
  .then(({ errors, warnings }) => {
    console.log("start bundling");
    console.log("warnings : ", warnings);
    console.log("errors : ", errors);
  })
  .catch(console.error);
