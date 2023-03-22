import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			components: `${path.resolve(__dirname, "./src/components/")}`,
			contexts: `${path.resolve(__dirname, "./src/contexts/")}`,
			models: `${path.resolve(__dirname, "./src/models/")}`,
			pages: `${path.resolve(__dirname, "./src/pages/")}`,
			styles: `${path.resolve(__dirname, "./src/styles/")}`,
			hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
			utils: `${path.resolve(__dirname, "./src/utils/")}`,
			config: `${path.resolve(__dirname, "./src/config/")}`,
			services: `${path.resolve(__dirname, "./src/services/")}`,
			routes: `${path.resolve(__dirname, "./src/routes/")}`,
			public: `${path.resolve(__dirname, "./public/")}`,
		},
	},
});
