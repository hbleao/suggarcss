import { onlyNumbers } from "./onlyNumbers";

describe("onlyNumbers", () => {
  it("should keep only numeric characters", () => {
    expect(onlyNumbers("123abc")).toBe("123");
    expect(onlyNumbers("abc123")).toBe("123");
    expect(onlyNumbers("a1b2c3")).toBe("123");
  });

  it("should remove special characters", () => {
    expect(onlyNumbers("123-456")).toBe("123456");
    expect(onlyNumbers("(11) 99999-9999")).toBe("11999999999");
    expect(onlyNumbers("123.456.789-00")).toBe("12345678900");
  });

  it("should handle empty string", () => {
    expect(onlyNumbers("")).toBe("");
  });

  it("should handle string with no numbers", () => {
    expect(onlyNumbers("abc")).toBe("");
    expect(onlyNumbers("!@#$%")).toBe("");
  });

  it("should handle non-string input", () => {
    // @ts-ignore - Testing invalid input
    expect(onlyNumbers(null)).toBe("");
    // @ts-ignore - Testing invalid input
    expect(onlyNumbers(undefined)).toBe("");
    // @ts-ignore - Testing invalid input
    expect(onlyNumbers(123)).toBe("");
  });

  it("should handle mixed content", () => {
    expect(onlyNumbers("CEP: 12345-678")).toBe("12345678");
    expect(onlyNumbers("Telefone: (11) 99999-9999")).toBe("11999999999");
    expect(onlyNumbers("CPF: 123.456.789-00")).toBe("12345678900");
  });
});
