/**
 * Histórico de versões e release notes
 *
 * Este arquivo mantém um registro estruturado de todas as versões
 * e suas respectivas mudanças, permitindo gerar release notes
 * automaticamente.
 */

export interface ReleaseNote {
	version: string;
	date: string;
	title: string;
	description?: string;
	changes: {
		feature?: string[];
		fix?: string[];
		improvement?: string[];
		breaking?: string[];
		docs?: string[];
	};
}

/**
 * Histórico completo de versões
 * Mantenha esta lista em ordem cronológica inversa (mais recente primeiro)
 */
export const releaseHistory: ReleaseNote[] = [
	{
		version: "0.0.10",
		date: "2025-04-11",
		title: "Componente Carousel",
		description: "Ajuste no componente carousel",
		changes: {
			fix: ["Ajustado as variaveis do arquivo styles.scss"],
		},
	},
	{
		version: "0.0.9",
		date: "2025-04-11",
		title: "Novos componentes",
		description: "Criado novos componentes disponibilizados",
		changes: {
			feature: [
				"Novo componente Button",
				"Novo componente Tooltip",
				"Novo componente Grid",
				"Novo componente Row",
				"Novo componente Modal",
				"Novo componente Notification",
				"Novo componente Carousel",
			],
			improvement: [
				"Adicionado loader do componente Input",
				"Adicionado loader do componente Dropdown",
				"Adicionado loader do componente Button",
			],
		},
	},
	{
		version: "0.0.8",
		date: "2025-04-10",
		title: "Novos componentes e ajuste na responsividade",
		description: "Adição melhorias significativas na CLI.",
		changes: {
			feature: [
				"Criada nova option no cli de instalar todos os componentes",
				"Criada nova option no cli de criar relase notes",
			],
		},
	},
	{
		version: "0.0.7",
		date: "2025-04-11",
		title: "Novos componentes e melhorias na CLI",
		description: "Adição de novos componentes e melhorias significativas na CLI.",
		changes: {
			feature: [
				"Novo componente Input com suporte a diferentes variantes",
				"Adição de tema escuro para todos os componentes",
			],
			improvement: [
				"Melhor desempenho na instalação de componentes",
				"Interface da CLI mais intuitiva",
			],
			fix: ["Correção de problemas de estilo em dispositivos móveis"],
		},
	},
	{
		version: "0.0.6",
		date: "2025-04-11",
		title: "Melhorias na CLI",
		description:
			"Adição do comando installAll para facilitar a instalação de todos os componentes de uma vez.",
		changes: {
			feature: [
				"Novo comando 'installAll' para instalar todos os componentes implementados de uma só vez",
				"Adição de comando para visualizar release notes",
			],
			improvement: [
				"Melhor tratamento de erros durante a instalação de componentes",
				"Feedback visual aprimorado durante a instalação",
			],
		},
	},
	{
		version: "0.0.5",
		date: "2025-04-01",
		title: "Componente Chip",
		changes: {
			feature: ["Adição do componente Chip", "Suporte para diferentes variantes de Chip"],
			improvement: ["Melhorias na documentação dos componentes"],
		},
	},
	{
		version: "0.0.4",
		date: "2025-03-15",
		title: "Comando de listagem",
		changes: {
			feature: ["Novo comando 'list' para exibir todos os componentes disponíveis"],
			fix: ["Correção do caminho do binário da CLI"],
		},
	},
	{
		version: "0.0.3",
		date: "2025-03-01",
		title: "Melhorias na CLI",
		changes: {
			improvement: [
				"Migração para @inquirer/prompts para melhor interatividade",
				"Adição de confirmação antes da instalação",
			],
			fix: ["Correção na detecção do diretório de componentes"],
		},
	},
	{
		version: "0.0.2",
		date: "2025-02-15",
		title: "Componente Button",
		changes: {
			feature: ["Adição do componente Button", "Suporte para diferentes variantes de Button"],
			fix: ["Correção na estrutura de arquivos do pacote"],
		},
	},
	{
		version: "0.0.1",
		date: "2025-02-01",
		title: "Primeira versão",
		description: "Lançamento inicial da biblioteca ocean com CLI básica.",
		changes: {
			feature: ["CLI básica para instalação de componentes", "Estrutura inicial do projeto"],
		},
	},
];

/**
 * Obtém as notas de release para uma versão específica
 * @param version Versão específica ou 'latest' para a mais recente
 * @returns Nota de release ou undefined se não encontrada
 */
export function getReleaseNote(version = "latest"): ReleaseNote | undefined {
	if (version === "latest") {
		return releaseHistory[0];
	}

	return releaseHistory.find((note) => note.version === version);
}

/**
 * Obtém todas as notas de release
 * @returns Array com todas as notas de release
 */
export function getAllReleaseNotes(): ReleaseNote[] {
	return releaseHistory;
}

/**
 * Formata uma nota de release para exibição no terminal
 * @param note Nota de release a ser formatada
 * @returns String formatada para exibição
 */
export function formatReleaseNote(note: ReleaseNote): string {
	let output = `\n# ${note.title} (v${note.version}) - ${note.date}\n\n`;

	if (note.description) {
		output += `${note.description}\n\n`;
	}

	if (note.changes.feature && note.changes.feature.length > 0) {
		output += "## ✨ Novos recursos\n\n";
		for (const item of note.changes.feature) {
			output += `- ${item}\n`;
		}
		output += "\n";
	}

	if (note.changes.improvement && note.changes.improvement.length > 0) {
		output += "## 🚀 Melhorias\n\n";
		for (const item of note.changes.improvement) {
			output += `- ${item}\n`;
		}
		output += "\n";
	}

	if (note.changes.fix && note.changes.fix.length > 0) {
		output += "## 🐛 Correções\n\n";
		for (const item of note.changes.fix) {
			output += `- ${item}\n`;
		}
		output += "\n";
	}

	if (note.changes.breaking && note.changes.breaking.length > 0) {
		output += "## ⚠️ Mudanças que quebram compatibilidade\n\n";
		for (const item of note.changes.breaking) {
			output += `- ${item}\n`;
		}
		output += "\n";
	}

	if (note.changes.docs && note.changes.docs.length > 0) {
		output += "## 📚 Documentação\n\n";
		for (const item of note.changes.docs) {
			output += `- ${item}\n`;
		}
		output += "\n";
	}

	return output;
}

/**
 * Gera o conteúdo completo do CHANGELOG.md
 * @returns String com o conteúdo do CHANGELOG.md
 */
export function generateChangelog(): string {
	let changelog = "# Changelog\n\n";
	changelog += "Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.\n\n";

	for (const note of releaseHistory) {
		changelog += `## [${note.version}] - ${note.date}\n\n`;

		if (note.title) {
			changelog += `### ${note.title}\n\n`;
		}

		if (note.description) {
			changelog += `${note.description}\n\n`;
		}

		if (note.changes.feature && note.changes.feature.length > 0) {
			changelog += "### ✨ Novos recursos\n\n";
			for (const item of note.changes.feature) {
				changelog += `- ${item}\n`;
			}
			changelog += "\n";
		}

		if (note.changes.improvement && note.changes.improvement.length > 0) {
			changelog += "### 🚀 Melhorias\n\n";
			for (const item of note.changes.improvement) {
				changelog += `- ${item}\n`;
			}
			changelog += "\n";
		}

		if (note.changes.fix && note.changes.fix.length > 0) {
			changelog += "### 🐛 Correções\n\n";
			for (const item of note.changes.fix) {
				changelog += `- ${item}\n`;
			}
			changelog += "\n";
		}

		if (note.changes.breaking && note.changes.breaking.length > 0) {
			changelog += "### ⚠️ Mudanças que quebram compatibilidade\n\n";
			for (const item of note.changes.breaking) {
				changelog += `- ${item}\n`;
			}
			changelog += "\n";
		}

		if (note.changes.docs && note.changes.docs.length > 0) {
			changelog += "### 📚 Documentação\n\n";
			for (const item of note.changes.docs) {
				changelog += `- ${item}\n`;
			}
			changelog += "\n";
		}
	}

	return changelog;
}
