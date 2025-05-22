import type { ReleaseNote } from '../release-notes';
import { releaseHistory } from '../release-notes';

/**
 * Obtém todas as notas de versão
 * @returns Array com todas as notas de versão
 */
export function getAllReleaseNotes(): ReleaseNote[] {
  return releaseHistory;
}

/**
 * Obtém uma nota de versão específica
 * @param version Versão desejada
 * @returns Nota de versão ou undefined se não encontrada
 */
export function getReleaseNote(version: string): ReleaseNote | undefined {
  return releaseHistory.find((note) => note.version === version);
}

/**
 * Obtém a nota de versão mais recente
 * @returns Nota de versão mais recente
 */
export function getLatestReleaseNote(): ReleaseNote {
  return releaseHistory[0];
}

/**
 * Formata uma nota de versão para exibição
 * @param note Nota de versão a ser formatada
 * @returns String formatada com a nota de versão
 */
export function formatReleaseNote(note: ReleaseNote): string {
  let output = `\n🚀 Versão ${note.version} - ${note.date}\n`;
  output += `${note.title}\n`;
  if (note.description) {
    output += `${note.description}\n`;
  }
  output += "\n";

  if (note.changes.feature && note.changes.feature.length > 0) {
    output += "✨ Novos recursos:\n";
    for (const feature of note.changes.feature) {
      output += `  • ${feature}\n`;
    }
    output += "\n";
  }

  if (note.changes.fix && note.changes.fix.length > 0) {
    output += "🐛 Correções de bugs:\n";
    for (const fix of note.changes.fix) {
      output += `  • ${fix}\n`;
    }
    output += "\n";
  }

  if (note.changes.improvement && note.changes.improvement.length > 0) {
    output += "🔧 Melhorias:\n";
    for (const improvement of note.changes.improvement) {
      output += `  • ${improvement}\n`;
    }
    output += "\n";
  }

  if (note.changes.breaking && note.changes.breaking.length > 0) {
    output += "⚠️ Mudanças que quebram compatibilidade:\n";
    for (const change of note.changes.breaking) {
      output += `  • ${change}\n`;
    }
    output += "\n";
  }

  return output;
}

/**
 * Manipula o comando de notas de versão
 * @param version Versão específica (opcional)
 * @param options Opções do comando
 */
export function handleReleaseNotes(version?: string, options?: { all?: boolean }): void {
  if (options?.all) {
    // Exibir todas as versões
    const allNotes = getAllReleaseNotes();
    console.log("\n📋 Histórico completo de versões:\n");
    
    // Usamos for...of em vez de forEach por questões de performance e estilo
    for (const note of allNotes) {
      console.log(formatReleaseNote(note));
      console.log("-----------------------------------\n");
    }
  } else if (version) {
    // Exibir uma versão específica
    const note = getReleaseNote(version);
    if (note) {
      console.log(formatReleaseNote(note));
    } else {
      console.error(`\n❌ Erro: Versão ${version} não encontrada.`);
      process.exit(1);
    }
  } else {
    // Exibir a versão mais recente
    const latestNote = getLatestReleaseNote();
    console.log(formatReleaseNote(latestNote));
  }
}
