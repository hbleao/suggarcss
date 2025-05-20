'use client';
// import * as Header from '@porto-ocean/header';
import { useEffect, useState } from 'react';

// import { HeaderDrawer } from './HeaderDrawer';

export const SectionHeader = (props: any) => {
	const { menu, submenus: categories } = props;
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({} as any);
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
		setSelectedCategory({} as any);
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
	}, [selectedCategory]);

	return (
		<header>Section header</header>
		// <Header.Root>
		// 	<Header.Menu>
		// 		<Header.MenuLogo>
		// 			<ShowOnDevice lessThan media="tabletLandscape">
		// 				<Header.IconMobileMenu
		// 					isOpen={isOpenMenu}
		// 					aria-label={isOpenMenu ? 'Fechar menu' : 'Abrir menu'}
		// 					onClick={handleToggleMenu}
		// 				/>
		// 			</ShowOnDevice>
		// 			<Image src={IcLogoPorto} alt="" width={87} height={21} />
		// 		</Header.MenuLogo>

		// 		<ShowOnDevice greaterThan media="tabletLandscape">
		// 			<MenuNav menuLinks={menu.menuLinks} />
		// 		</ShowOnDevice>
		// 		<Header.MenuButton
		// 			onClick={() =>
		// 				handleRedirect(menu.loginButton.url, menu.loginButton.target)
		// 			}
		// 		>
		// 			{menu.loginButton.label}
		// 		</Header.MenuButton>
		// 	</Header.Menu>

		// 	<HeaderToolbar
		// 		selectedCategory={selectedCategory}
		// 		categories={categories}
		// 		subcategory={subcategory}
		// 		indexSubcategory={indexSubcategory}
		// 		hasSubcategories={hasSubcategories}
		// 		handleCategory={handleCategory}
		// 		handleSubcategory={handleSubcategory}
		// 		handleRedirect={handleRedirect}
		// 	/>

		// 	<HeaderDrawer
		// 		isOpenMenu={isOpenMenu}
		// 		links={menu.menuLinks}
		// 		categories={categories}
		// 		subcategory={subcategory}
		// 		selectedCategory={selectedCategory}
		// 		handleCategory={handleCategory}
		// 		handleSubcategory={handleSubcategory}
		// 		indexSubcategory={indexSubcategory}
		// 	/>
		// </Header.Root>
	);
};
