import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
let isServiceInitialized = false;

const bundle = async (rawCode: string) => {
  if (!isServiceInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "./esbuild.wasm",
    });
    isServiceInitialized = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log(result);
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (error: any) {
    return {
      code: "",
      err: error.message,
    };
  }
};

export default bundle;
