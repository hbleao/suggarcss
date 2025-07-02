'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { HeaderToolbar } from './HeaderToolbar';
import { MenuNav } from './MenuNav';
import * as C from './components';

import LogoPortoSVG from '@/assets/icons/ic-logo-porto.svg';
import { Column, Grid, Link, ShowOnDevice } from '@/components';

import type { Category } from './HeaderDrawer/types';

export const Header = (props: any) => {
	const { menu, submenus: categories } = props;
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({} as Category);
	const [indexSubcategory, setIndexSubcategory] = useState(0);
	const hasSubcategories = !!selectedCategory?.categories;
	const subcategory = hasSubcategories
		? selectedCategory?.categories[indexSubcategory]
		: [];

	function handleToggleMenu() {
		if (!isOpenMenu) {
			setIsOpenMenu(true);
			return;
		}
		setIsOpenMenu(false);
		setSelectedCategory({} as Category);
	}

	function handleRedirect(url: string, target: string) {
		window.open(url, target);
	}

	function handleCategory(submenu: any) {
		setSelectedCategory(submenu);
	}

	function handleSubcategory(index: number) {
		setIndexSubcategory(index);
	}

	useEffect(() => {
		setIndexSubcategory(0);
	}, []);

	return (
		<C.Root>
			<C.Menu>
				<ShowOnDevice media="tabletLandscape" orientation="lessThan">
					<C.MenuLogo
						style={{ borderBottom: isOpenMenu ? '1px solid #e0e0e0' : '' }}
					>
						<C.IconMobileMenu
							isOpen={isOpenMenu}
							aria-label={isOpenMenu ? 'Fechar menu' : 'Abrir menu'}
							onClick={handleToggleMenu}
						/>
						<Image src={LogoPortoSVG} width={87} height={22} alt="" />
						{props?.menu?.loginButton && (
							<Link
								style={{ marginLeft: 'auto' }}
								styles="secondary"
								width="contain"
								size="small"
								href={props?.menu?.loginButton.url}
							>
								{props?.menu?.loginButton.label}
							</Link>
						)}
					</C.MenuLogo>
				</ShowOnDevice>

				<ShowOnDevice media="tabletLandscape" orientation="greaterThan">
					<MenuNav {...menu} />
				</ShowOnDevice>
			</C.Menu>

			<div style={{ background: '#f7f7f7' }}>
				<Grid>
					<Column>
						<HeaderToolbar
							selectedCategory={selectedCategory}
							categories={categories}
							subcategory={subcategory}
							indexSubcategory={indexSubcategory}
							hasSubcategories={hasSubcategories}
							handleCategory={handleCategory}
							handleSubcategory={handleSubcategory}
							handleRedirect={handleRedirect}
						/>
					</Column>
				</Grid>
			</div>

			{/* <HeaderDrawer
				isOpenMenu={isOpenMenu}
				links={menu?.menuLinks}
				categories={categories}
				subcategory={subcategory}
				selectedCategory={selectedCategory}
				handleCategory={handleCategory}
				handleSubcategory={handleSubcategory}
				indexSubcategory={indexSubcategory}
			/> */}
		</C.Root>
	);
};
