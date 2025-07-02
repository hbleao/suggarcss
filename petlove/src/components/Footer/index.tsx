"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./styles.scss";

import { Column } from "../Column";
import { icons } from "./icons";

import { Button, Flex, Grid, Link, Modal } from "@/components";

import type { FooterProps } from "./types";

export const Footer = ({
	titleAboutUs,
	aboutUs,
	titleQuickLinks,
	quickLinks,
	titleSocialMedia,
	socialMedia,
	titleAppStore,
	buttonsAppStore,
	bottomLinks,
}: FooterProps) => {
	const router = useRouter();
	const quickLinksList = {
		title: titleQuickLinks,
		links: quickLinks,
	};
	const aboutUsList = {
		title: titleAboutUs,
		links: aboutUs,
	};

	function handleOpenModal() {
		const params = new URLSearchParams(window.location.search);
		params.set("modal", "parceiros");
		router.push(`?${params.toString()}`, { scroll: false });
	}

	return (
		<footer className="footer">
			<Grid>
				<>
					<Column
						mobile={[1, 4]}
						tabletPortrait={[1, 4]}
						tabletLandscape={[1, 4]}
						desktop={[1, 4]}
						wide={[1, 4]}
						className="footer__links"
					>
						<div className="links__title">{quickLinksList.title}</div>
						<ul className="links__list">
							{quickLinksList.links.map((link) => (
								<li key={`link-${link.name}`} className="links__list-item">
									<a
										href={link.url}
										className="links__link"
										target="_blank"
										rel="noreferrer"
									>
										{link.icon && (
											<Image
												src={icons[link.icon]?.icon}
												width={16}
												height={20}
												alt="icon"
											/>
										)}
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</Column>

					<Column
						mobile={[4, 7]}
						tabletPortrait={[4, 7]}
						tabletLandscape={[4, 7]}
						desktop={[4, 7]}
						wide={[4, 7]}
						className="footer__links"
					>
						<div className="links__title">{aboutUsList.title}</div>
						<ul className="links__list">
							{aboutUsList.links.map((link) => (
								<li key={`link-${link.name}`} className="links__list-item">
									<a
										href={link.url}
										className="links__link"
										target="_blank"
										rel="noreferrer"
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</Column>

					<Column
						mobile={[1, 8]}
						tabletPortrait={[9, 13]}
						tabletLandscape={[10, 13]}
						desktop={[10, 13]}
						wide={[10, 13]}
						className="footer__social-media"
					>
						<Image
							className="social-media__logo"
							src={icons["icon-logo-white"]?.icon}
							alt="Porto seguro"
							width={156}
							height={40}
						/>
						<h3 className="social-media__title">{titleSocialMedia}</h3>
						{socialMedia && socialMedia.length > 0 && (
							<div className="social-media__links">
								{socialMedia.map((media) => (
									<a
										key={`social-${media.icon}`}
										href={media.url}
										target="_blank"
										className="social-media__link"
										rel="noreferrer"
									>
										<Image
											width={40}
											height={40}
											src={icons[media.icon]?.icon}
											alt="icon"
										/>
									</a>
								))}
							</div>
						)}

						<div className="footer__store">
							<h3 className="store__title">{titleAppStore}</h3>
							<div className="store__list">
								<a
									href={buttonsAppStore[0].url}
									target="_blank"
									rel="noreferrer"
								>
									<Image
										src={icons["icon-apple"].icon}
										width={120}
										height={80}
										alt="apple store"
									/>
								</a>
								<a
									href={buttonsAppStore[1].url}
									target="_blank"
									rel="noreferrer"
								>
									<Image
										src={icons["icon-google"].icon}
										width={120}
										height={80}
										alt="google play"
									/>
								</a>
							</div>

							<Button
								variant="negative"
								styles="secondary"
								onClick={handleOpenModal}
							>
								Parceiros e Investidores
							</Button>
						</div>
					</Column>

					<Column
						mobile={[1, 8]}
						tabletPortrait={[1, 8]}
						tabletLandscape={[1, 13]}
						desktop={[1, 13]}
						wide={[1, 13]}
						className="footer__bottom-links"
					>
						{bottomLinks.length > 0 && (
							<div className="bottom-links__list">
								{bottomLinks.map((link) => (
									<div key={`bottom-${link.name}`}>
										<a href={link.url} className="bottom-links__item">
											{link.name}
										</a>
									</div>
								))}
							</div>
						)}
					</Column>
				</>
			</Grid>
			<Modal
				name="parceiros"
				title="Parceiro Porto"
				subtitle="Encontre aqui a área exclusiva para o seu perfil"
			>
				<Flex direction="column" gap="1.6rem">
					<Link
						href="https://corretor.portoseguro.com.br/corretoronline/"
						styles="secondary"
					>
						Corretor on-line
					</Link>
					<Link
						href="https://wwws.portoseguro.com.br/portalnegocio/"
						styles="secondary"
					>
						Prestadores de serviço
					</Link>
					<Link href="https://ri.portoseguro.com.br/" styles="secondary">
						Investidores
					</Link>
					<Link
						href="https://www.portoseguro.com.br/fale-conosco/trabalhe-conosco/representante-de-seguros"
						styles="secondary"
					>
						Representantes de seguro
					</Link>
					<Link
						href="https://www.portoseguro.com.br/fale-conosco/trabalhe-conosco/fornecedores"
						styles="secondary"
					>
						Fornecedores
					</Link>
				</Flex>
			</Modal>
		</footer>
	);
};
