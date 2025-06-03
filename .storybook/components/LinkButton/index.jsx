export const LinkButton = ({
	href,
	children,
	backgroundColor = "#0046c0",
	textColor = "white",
	icon = null,
}) => (
	<a
		href={href}
		style={{
			minWidth: "280px",
			padding: "1.5rem",
			background: backgroundColor,
			borderRadius: "8px",
			boxShadow: "0 2px 8px rgba(0, 70, 192, 0.08)",
			color: textColor,
			textDecoration: "none",
			display: "block",
		}}
	>
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				flexDirection: "column",
				marginBottom: "1rem",
			}}
		>
			{icon && <div style={{ marginBottom: "1rem" }}>{icon}</div>}
			<h3 style={{ margin: 0, fontSize: "2rem", fontWeight: "600", color: textColor }}>
				{children}
			</h3>
		</div>
	</a>
);

export const LinkButtonGroup = ({ children, gap = "1.6rem" }) => (
	<div style={{ display: "flex", gap: gap, flexWrap: "wrap", marginBottom: "2rem" }}>
		{children}
	</div>
);
