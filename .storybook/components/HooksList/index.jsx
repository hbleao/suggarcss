export const HooksList = () => (
	<div style={{ marginBottom: "64px" }}>
		<h2
			style={{
				fontSize: "2.2rem",
				color: "#404040",
				marginBottom: "1.6rem",
				position: "relative",
				paddingBottom: "0.5rem",
				display: "inline-block",
				borderBottom: "3px solid #00a1fc",
			}}
		>
			Hooks disponíveis
		</h2>

		<div
			style={{
				padding: "1.5rem",
				background: "#f8fbff",
				borderRadius: "8px",
				boxShadow: "0 2px 8px rgba(0, 70, 192, 0.08)",
				border: "1px solid #00a1fc",
				marginBottom: "2.5rem",
			}}
		>
			<div
				style={{
					marginBottom: "24px",
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
				}}
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="#66cafc"
					xmlns="http://www.w3.org/2000/svg"
					style={{ marginBottom: "16px" }}
				>
					<path
						d="M16.5 9c-1.5 0-2.91.38-4.13 1.03l.67-2.68c.15-.59-.33-1.15-.94-1.15H8.5c-.38 0-.73.27-.83.64L6.21 13.75c-.14.53.25 1.05.8 1.05h2.29l-.67 4.32c-.08.49.31.91.8.91.28 0 .55-.15.7-.39l5.18-7.18C14.09 9.75 11.25 9 9 9c-1.39 0-2.67.27-3.82.72l.58-2.32C5.9 6.86 5.37 6.3 4.76 6.3H2.25c-.38 0-.73.27-.83.64L.17 11.81c-.14.53.25 1.05.8 1.05h2.29l-1.23 7.94c-.08.49.31.91.8.91.28 0 .55-.15.7-.39L7.8 14.5c1.43.5 3.01.78 4.7.78 2.7 0 5.15-.67 7.25-1.82l.63-.88c.35-.48.23-1.16-.27-1.5-.86-.57-1.86-.99-2.93-1.21l-1.28-.35c.02-.01.05-.02.07-.02.84-.23 1.72-.37 2.66-.37.84 0 1.67.11 2.44.32.5.14 1.03-.11 1.14-.62.1-.5-.22-1-.72-1.14-1-.28-2.07-.42-3.17-.42z"
						fill="#66cafc"
					/>
				</svg>
				<h3
					style={{
						margin: 0,
						fontSize: "2rem",
						fontWeight: "600",
						color: "#404040",
						marginBottom: "4px",
					}}
				>
					Hooks
				</h3>
				<p
					style={{
						margin: "0 0 1.2rem 0",
						fontSize: "1.6rem",
						lineHeight: "1.5",
						color: "#404040",
					}}
				>
					Hooks utilitários para facilitar o desenvolvimento
				</p>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
					gap: "0.8rem",
					fontSize: "0.95rem",
				}}
			>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useasync--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useAsync
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usemodal--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useModal
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usetoggle--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useToggle
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useform--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useForm
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-uselocalstorage--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useLocalStorage
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useoutsideclick--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useOutsideClick
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usemediaquery--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useMediaQuery
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usewindowsize--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useWindowSize
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useprevious--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					usePrevious
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usecookie--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useCookie
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useonscreen--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useOnScreen
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usecopytoclipboard--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useCopyToClipboard
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useeventlistener--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useEventListener
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-usedebouncedvalue--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useDebouncedValue
				</a>
				<a
					href="http://localhost:6006/?path=/docs/hooks-useintersectionobserver--docs"
					style={{
						padding: "0.5rem",
						border: "1px solid #66cafc",
						color: "#404040",
						fontSize: "1.5rem",
						borderRadius: "4px",
					}}
				>
					useIntersectionObserver
				</a>
			</div>
		</div>
	</div>
);
