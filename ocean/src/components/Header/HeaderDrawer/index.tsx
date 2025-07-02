"use client";
import Image from "next/image";
import React from "react";

import { MenuNav } from "../MenuNav";
import * as Header from "../components";

import { Button, Spacing } from "@/components";
import { formatAemImageUrl } from "@/utils";

import { useLockScroll } from "@/hooks";
import type { Category, HeaderDrawerProps } from "./types";

export const HeaderDrawer = ({
	isOpenMenu,
	links,
	categories,
	subcategory,
	selectedCategory,
	indexSubcategory,
	handleCategory,
	handleSubcategory,
}: HeaderDrawerProps) => {
	useLockScroll(isOpenMenu);

	return (
		<Header.Drawer isOpen={isOpenMenu}>
			<Spacing bottom={1.6} />
			<MenuNav menuLinks={links} />
			<Spacing bottom={2.4} />
			<Header.DrawerCategories>
				<Header.DrawerList>
					{categories.map((submenu) => (
						<Header.DrawerListItem
							key={`${submenu.label}`}
							onClick={() => handleCategory(submenu)}
						>
							<Header.DrawerListLabel>{submenu.label}</Header.DrawerListLabel>
							<Header.HeaderArrow />
						</Header.DrawerListItem>
					))}
				</Header.DrawerList>
			</Header.DrawerCategories>

			{!!selectedCategory.label && (
				<Header.DrawerCategory isOpen={!!selectedCategory.label}>
					<Header.DrawerCategoryHeader>
						<Button
							onClick={() => handleCategory({} as Category)}
							variant="insurance"
							styles="ghost"
							size="small"
						>
							<Header.HeaderArrow />
							Voltar
						</Button>
						{!!selectedCategory?.logo && (
							<Image
								src={formatAemImageUrl(selectedCategory.logo.image)}
								alt={selectedCategory.logo.alt}
								width={180}
								height={24}
							/>
						)}

						<Header.DrawerSubcategory>
							{selectedCategory.categories.map((category, i) => (
								<React.Fragment key={category.name}>
									{category?.name && (
										<Header.DrawerSubcategoryItem
											key={category?.name}
											onClick={() => handleSubcategory(i)}
											isSelected={i === indexSubcategory}
										>
											{category.name}
										</Header.DrawerSubcategoryItem>
									)}
								</React.Fragment>
							))}
						</Header.DrawerSubcategory>
					</Header.DrawerCategoryHeader>

					<Header.DrawerLine />

					<Header.DrawerSubcategoryList>
						{subcategory.links.map((link) => (
							<Header.DrawerSubcategoryListItem key={`${link.label}`}>
								<a href={link.url} target={link.target}>
									{link.label}
								</a>
							</Header.DrawerSubcategoryListItem>
						))}
					</Header.DrawerSubcategoryList>
				</Header.DrawerCategory>
			)}
		</Header.Drawer>
	);
};
