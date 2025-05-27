import React, { useState } from "react";
import { Radio } from "../../../src/components";

export default {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => (
  <Radio>Opção padrão</Radio>
);

export const Checked = () => (
  <Radio variant="checked">Opção selecionada</Radio>
);

export const Disabled = () => (
  <Radio variant="disabled">Opção desabilitada</Radio>
);

export const WithDescription = () => (
  <Radio description="Esta é uma descrição adicional para o radio button">
    Opção com descrição
  </Radio>
);

export const RadioGroup = () => {
  const [selected, setSelected] = useState("opcao1");
  
  const handleChange = (value) => {
    setSelected(value);
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Radio 
        variant={selected === "opcao1" ? "checked" : "default"}
        onClick={() => handleChange("opcao1")}
      >
        Opção 1
      </Radio>
      <Radio 
        variant={selected === "opcao2" ? "checked" : "default"}
        onClick={() => handleChange("opcao2")}
      >
        Opção 2
      </Radio>
      <Radio 
        variant={selected === "opcao3" ? "checked" : "default"}
        onClick={() => handleChange("opcao3")}
      >
        Opção 3
      </Radio>
      <Radio variant="disabled">
        Opção desabilitada
      </Radio>
    </div>
  );
};

export const RadioWithCustomStyling = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <Radio 
      style={{ backgroundColor: "#f0f8ff", padding: "12px", borderRadius: "8px" }}
    >
      Opção com estilo personalizado
    </Radio>
    <Radio 
      variant="checked"
      style={{ backgroundColor: "#f0fff0", padding: "12px", borderRadius: "8px" }}
    >
      Opção selecionada com estilo personalizado
    </Radio>
  </div>
);

export const RadioWithLongText = () => (
  <Radio>
    Esta é uma opção de radio button com um texto muito longo para demonstrar como o componente 
    se comporta quando o conteúdo textual é extenso e pode quebrar em múltiplas linhas, mantendo 
    o alinhamento adequado com o ícone do radio.
  </Radio>
);
