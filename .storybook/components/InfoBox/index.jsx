export const InfoBox = ({
	title,
	children,
	icon = null,
	backgroundColor = "white",
	borderColor = "#e0f0ff",
	titleColor = "#0046c0",
	numbered = false,
	number = null,
}) => (
	<div
		style={{
			background: backgroundColor,
			padding: "1.5rem",
			borderRadius: "8px",
			boxShadow: "0 2px 12px rgba(0, 70, 192, 0.08)",
			border: `1px solid ${borderColor}`,
			marginBottom: "1.5rem",
		}}
	>
		{title && (
			<h3
				style={{
					color: titleColor,
					margin: "0 0 1rem 0",
					fontSize: "1.3rem",
					display: "flex",
					alignItems: "center",
					gap: "8px",
				}}
			>
				{numbered && (
					<span
						style={{
							width: "28px",
							height: "28px",
							borderRadius: "50%",
							background: titleColor,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0,
						}}
					>
						<span style={{ color: "white", fontWeight: "bold" }}>{number}</span>
					</span>
				)}
				{icon && icon}
				{title}
			</h3>
		)}
		{children}
	</div>
);
