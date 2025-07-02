import { act, renderHook } from "@testing-library/react";
import { useCookie } from ".";

describe("useCookie", () => {
	beforeEach(() => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		document.cookie.split(";").forEach((cookie) => {
			const eqPos = cookie.indexOf("=");
			const name =
				eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
		});
	});

	const getCookie = (name: string): string | undefined => {
		const match = document.cookie.match(
			new RegExp(`(^|;\\s*)(${name})=([^;]*)`),
		);
		return match ? decodeURIComponent(match[3]) : undefined;
	};

	it("deve inicializar com o valor padrão quando o cookie não existe", () => {
		const { result } = renderHook(() =>
			useCookie("testCookie", "defaultValue"),
		);
		expect(result.current[0]).toBe("defaultValue");
	});

	it("deve definir e recuperar um cookie", () => {
		const { result } = renderHook(() =>
			useCookie("testCookie", "defaultValue"),
		);

		act(() => {
			result.current[1]("newValue");
		});

		expect(result.current[0]).toBe("newValue");

		expect(getCookie("testCookie")).toBe("newValue");
	});

	it("deve remover um cookie", () => {
		const { result } = renderHook(() =>
			useCookie("testCookie", "defaultValue"),
		);

		act(() => {
			result.current[1]("someValue");
		});

		expect(result.current[0]).toBe("someValue");
		expect(getCookie("testCookie")).toBe("someValue");

		act(() => {
			result.current[2]();
		});

		expect(result.current[0]).toBe("defaultValue");
		expect(getCookie("testCookie")).toBeUndefined();
	});

	it("deve aceitar opções ao definir um cookie", () => {
		const { result } = renderHook(() =>
			useCookie("testCookie", "defaultValue"),
		);

		act(() => {
			result.current[1]("optionsValue", { path: "/", days: 1 });
		});

		expect(result.current[0]).toBe("optionsValue");
		expect(getCookie("testCookie")).toBe("optionsValue");
	});

	it("deve manter o valor do cookie entre renderizações", () => {
		document.cookie = "persistentCookie=persistentValue;path=/";

		const { result, rerender } = renderHook(() =>
			useCookie("persistentCookie", "defaultValue"),
		);
		expect(result.current[0]).toBe("persistentValue");

		rerender();

		expect(result.current[0]).toBe("persistentValue");
	});
});
