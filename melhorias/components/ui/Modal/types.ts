export type ModalProps = {
	title: string;
	subtitle: string;
	isOpen: boolean;
	handleCloseModal: () => void;
	children: any;
};
