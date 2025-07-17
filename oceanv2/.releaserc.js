module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        // Não publicar no npm, apenas atualizar a versão no package.json
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}'
      }
    ]
    // Removido o plugin GitHub para uso local
  ],
  // Configurações para uso local
  ci: false,
  dryRun: false
};
