// vite.config.ts
import {defineConfig} from "vite";
import mdPlugin, {Mode} from "vite-plugin-markdown";
import reactRefresh from "@vitejs/plugin-react-refresh";
var vite_config_default = defineConfig({
  plugins: [reactRefresh(), mdPlugin({mode: [Mode.HTML, Mode.REACT]})]
});
export {
  vite_config_default as default
};
