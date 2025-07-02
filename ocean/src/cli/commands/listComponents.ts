import { getAvailableComponents, getImplementedComponents } from '../utils';

/**
 * Lista todos os componentes disponíveis, indicando quais estão implementados
 */
export function listComponents(): void {
  const available = getAvailableComponents();
  const implemented = getImplementedComponents();
  
  if (available.length === 0) {
    console.log("\n⚠️ Nenhum componente disponível encontrado.\n");
    return;
  }
  
  console.log("\n📋 Componentes disponíveis:\n");
  
  // Organizar componentes alfabeticamente
  const sortedComponents = [...available].sort();
  
  // Calcular o tamanho máximo do nome para alinhamento
  const maxLength = Math.max(...sortedComponents.map(comp => comp.length));
  
  for (const component of sortedComponents) {
    const isImplemented = implemented.includes(component);
    const status = isImplemented ? "✅ Implementado" : "⚠️ Em desenvolvimento";
    const paddedName = component.padEnd(maxLength + 2);
    
    console.log(`  ${paddedName} ${status}`);
  }
  
  console.log(`\nTotal: ${available.length} componentes (${implemented.length} implementados)\n`);
}
