import type { HTMLAttributes } from "react";

type Breadcrumb = {
	label: string;
	link: string;
};

export type RootProps = HTMLAttributes<HTMLDivElement> & {
	breadcrumbList: Breadcrumb[];
};
