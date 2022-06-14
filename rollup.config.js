import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

export default {
    'input': 'src/recipe.ts',
    'output': {
        file: 'bundle.js',
    },
    plugins: [
        nodeResolve({browser: true}),
        typescript(),
        terser(),
    ],
}