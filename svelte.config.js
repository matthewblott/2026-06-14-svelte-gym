import adapter from '@sveltejs/adapter-auto';

export default {
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true,
			handleRenderingErrors: true
		}
	},
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
		experimental: { async: true }
	}
};

