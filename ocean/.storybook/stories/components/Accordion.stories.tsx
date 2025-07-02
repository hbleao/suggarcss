import React from "react";
import { Accordion } from "../../../src/components";

export default {
	title: "Components/Accordion",
	component: Accordion,
};

export const Default = () => (
	<Accordion title="Accordion Padrão">Este é um conteúdo do Accordion padrão.</Accordion>
);

export const OpenByDefault = () => (
	<Accordion title="Aberto por padrão" defaultOpen>
		Accordion aberto por padrão.
	</Accordion>
);

export const Multiple = () => (
	<div>
		<Accordion title="Primeiro Accordion" defaultOpen>
			Conteúdo do primeiro Accordion.
		</Accordion>
		<Accordion title="Segundo Accordion">Conteúdo do segundo Accordion.</Accordion>
	</div>
);
