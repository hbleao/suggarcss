import { onlyLetterMask } from "./onlyLetters";

describe("onlyLetterMask", () => {
  it("should remove numbers from string", () => {
    expect(onlyLetterMask("abc123")).toBe("abc");
    expect(onlyLetterMask("123abc")).toBe("abc");
    expect(onlyLetterMask("a1b2c3")).toBe("abc");
  });

  it("should remove special characters from string", () => {
    expect(onlyLetterMask("a@b#c$")).toBe("abc");
    expect(onlyLetterMask("a!b?c%")).toBe("abc");
  });

  it("should keep spaces", () => {
    expect(onlyLetterMask("abc def")).toBe("abc def");
  });

  it("should handle accented characters", () => {
    expect(onlyLetterMask("áéíóú")).toBe("aeiou");
    expect(onlyLetterMask("àèìòù")).toBe("aeiou");
    expect(onlyLetterMask("âêîôû")).toBe("aeiou");
    expect(onlyLetterMask("ãõñ")).toBe("aon");
    expect(onlyLetterMask("çÇ")).toBe("cC");
  });

  it("should handle empty string", () => {
    expect(onlyLetterMask("")).toBe("");
  });

  it("should handle falsy values", () => {
    // @ts-ignore - Testing invalid input
    expect(onlyLetterMask(null)).toBe("");
    // @ts-ignore - Testing invalid input
    expect(onlyLetterMask(undefined)).toBe("");
  });

  it("should handle mixed content", () => {
    expect(onlyLetterMask("João123!@#")).toBe("Joao");
    expect(onlyLetterMask("Maria Silva 42")).toBe("Maria Silva ");
  });
});
