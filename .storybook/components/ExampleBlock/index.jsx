import React from "react";

export const ExampleBlock = ({
	children,
	preview,
	title,
	description,
	backgroundColor = "#f8f9fa",
}) => {
	return (
		<div
			style={{
				border: "1px solid #e0e0e0",
				borderRadius: "8px",
				overflow: "hidden",
				marginBottom: "2rem",
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
			}}
		>
			{title && (
				<div
					style={{
						padding: "0.75rem 1.25rem",
						borderBottom: "1px solid #e0e0e0",
						backgroundColor: "#f8f9fa",
					}}
				>
					<h3
						style={{
							margin: 0,
							fontSize: "1.1rem",
							fontWeight: "600",
							color: "#333",
						}}
					>
						{title}
					</h3>
					{description && (
						<p
							style={{
								margin: "0.5rem 0 0",
								fontSize: "0.95rem",
								color: "#666",
							}}
						>
							{description}
						</p>
					)}
				</div>
			)}

			{preview && (
				<div
					style={{
						padding: "1.5rem",
						backgroundColor: backgroundColor,
						borderBottom: "1px solid #e0e0e0",
					}}
				>
					{preview}
				</div>
			)}

			<div
				style={{
					position: "relative",
				}}
			>
				{children}
			</div>
		</div>
	);
};
