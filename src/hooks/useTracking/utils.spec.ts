import { formatGtmText } from "./utils";

describe("utils", () => {
  describe("formatGtmText", () => {
    it("deve converter texto para minúsculas", () => {
      expect(formatGtmText("TEXTO DE TESTE")).toBe("texto-de-teste");
    });

    it("deve substituir espaços por hífens", () => {
      expect(formatGtmText("texto com espaços")).toBe("texto-com-espaços");
    });

    it("deve lidar com múltiplos espaços", () => {
      expect(formatGtmText("texto  com   múltiplos    espaços")).toBe("texto-com-múltiplos-espaços");
    });

    it("deve retornar string vazia para entrada vazia", () => {
      expect(formatGtmText("")).toBe("");
    });

    it("deve manter caracteres especiais", () => {
      expect(formatGtmText("texto com @#$%^&*()")).toBe("texto-com-@#$%^&*()");
    });
  });
});
