import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    // Configuração para arquivos Markdown
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
          {
            loader: require.resolve('./docs-loader.js'),
          },
        ],
      });
    }
    
    // Configuração para o Sass
    if (config.module?.rules) {
      // Encontra a regra para arquivos scss
      const rules = config.module.rules as Array<{
        test?: RegExp;
        use?: Array<{
          loader?: string;
          options?: Record<string, unknown>;
        }>;
      }>;
      
      const sassRuleIndex = rules.findIndex(rule => 
        rule?.test?.toString().includes('scss')
      );
      
      if (sassRuleIndex >= 0) {
        // Substitui a regra existente por uma nova configuração
        const sassRule = rules[sassRuleIndex];
        
        // Configura o sass-loader para ignorar avisos de depreciação
        if (sassRule?.use && Array.isArray(sassRule.use)) {
          const sassLoaderIndex = sassRule.use.findIndex(use => 
            use?.loader?.includes('sass-loader')
          );
          
          if (sassLoaderIndex >= 0) {
            sassRule.use[sassLoaderIndex] = {
              loader: require.resolve('sass-loader'),
              options: {
                implementation: require('sass'),
                sassOptions: {
                  quietDeps: true,
                  quietDeprecation: true,
                  logger: {
                    warn: () => {}, // Função vazia para suprimir avisos
                    debug: () => {}
                  }
                }
              }
            };
          }
        }
      }
    }
    
    return config;
  }
};

export default config;