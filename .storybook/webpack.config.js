/**
 * Configuração personalizada do webpack para o Storybook
 * Este arquivo ajuda a suprimir avisos de depreciação do Sass
 * e adiciona suporte a arquivos SVG
 */
module.exports = async ({ config }) => {
	// Encontrar a regra para arquivos SCSS
	const sassRule = config.module.rules.find(
		(rule) => rule.test && rule.test.toString().includes("scss")
	);

	if (sassRule) {
		// Encontrar o loader do Sass
		const sassLoader = sassRule.use.find(
			(use) => use && use.loader && use.loader.includes("sass-loader")
		);

		if (sassLoader) {
			// Configurar o loader do Sass para suprimir avisos
			sassLoader.options = {
				...sassLoader.options,
				sassOptions: {
					...(sassLoader.options?.sassOptions || {}),
					quietDeps: true,
					quietDeprecation: true,
					logger: {
						warn: () => {}, // Função vazia para suprimir avisos
						debug: () => {},
					},
				},
			};
		}
	}

	// Configuração para arquivos SVG
	// Encontrar a regra existente para SVG (se houver)
	const fileLoaderRule = config.module.rules.find(
		(rule) => rule.test && rule.test.toString().includes('svg')
	);

	// Modificar a regra existente para excluir SVGs
	if (fileLoaderRule) {
		fileLoaderRule.exclude = /\.svg$/;
	}

	// Adicionar uma nova regra para SVGs
	config.module.rules.push({
		test: /\.svg$/,
		use: [{
			loader: '@svgr/webpack',
			options: {
				svgo: false, // Desativa a otimização SVG para preservar o formato original
				svgoConfig: {
					plugins: [{ removeViewBox: false }],
				},
			},
		}],
	});

	return config;
};
