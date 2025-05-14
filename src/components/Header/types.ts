import { ReactNode } from 'react';

export interface HeaderProps {
  variant?: 'default' | 'negative';
  logo?: ReactNode;
  menuItems?: MenuItem[];
  toolbarItems?: ToolbarItem[];
  drawerItems?: DrawerItem[];
  isDrawerOpen?: boolean;
  onDrawerToggle?: () => void;
  className?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
  tooltip?: TooltipContent;
  isActive?: boolean;
  onClick?: () => void;
}

export interface ToolbarItem {
  label?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface DrawerItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  categories?: DrawerCategory[];
  onClick?: () => void;
}

export interface DrawerCategory {
  label: string;
  subcategories?: DrawerSubcategory[];
}

export interface DrawerSubcategory {
  label: string;
  items: DrawerSubcategoryItem[];
}

export interface DrawerSubcategoryItem {
  label: string;
  href: string;
}

export interface TooltipContent {
  header?: TooltipHeader;
  cards?: TooltipCard[];
  contentList?: TooltipContentListItem[];
}

export interface TooltipHeader {
  logo?: ReactNode;
  categories?: TooltipHeaderCategory[];
}

export interface TooltipHeaderCategory {
  label: string;
  href: string;
}

export interface TooltipCard {
  title: string;
  subtitle?: string;
}

export interface TooltipContentListItem {
  label: string;
  href: string;
  badge?: string;
}
