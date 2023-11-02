import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ViteYaml from '@modyfi/vite-plugin-yaml';
import yaml from 'js-yaml';

// Add a yaml tag to add quotes around a string
const SayYamlType = new yaml.Type('!Say', {
  kind: 'scalar',
  construct: (data) => `"${data}"`,
});
const yamlSchema = yaml.DEFAULT_SCHEMA.extend([SayYamlType]);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteYaml({schema: yamlSchema})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
