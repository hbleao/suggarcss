import { formatGtmText } from "./utils";

describe("utils", () => {
  describe("formatGtmText", () => {
    it("should convert to lowercase", () => {
      expect(formatGtmText("TEXTO DE TESTE")).toBe("texto-de-teste");
    });

    it('should convert to lowercase and replace spaces with hyphens', () => {
      expect(formatGtmText("texto com espaços")).toBe("texto-com-espaços");
    });

    it('should handle multiple spaces', () => {
      expect(formatGtmText("texto  com   múltiplos    espaços")).toBe("texto-com-múltiplos-espaços");
    });

    it("should return empty string for empty input", () => {
      expect(formatGtmText("")).toBe("");
    });

    it('should keep special characters', () => {
      expect(formatGtmText("texto com @#$%^&*()")).toBe("texto-com-@#$%^&*()");
    });
  });
});
