import { defineConfig } from 'vite';
import mdPlugin, { Mode } from 'vite-plugin-markdown';

import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), mdPlugin({ mode: [Mode.HTML, Mode.REACT ] })]
})
