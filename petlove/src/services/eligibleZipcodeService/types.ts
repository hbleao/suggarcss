export type ScopeAndEligibilityServiceResponse = {
	coverage: boolean;
	statusCode: number;
	addressData: {
		street: string;
		city: string;
		neighborhood: string;
		postalCode: string;
		stateCode: string;
		state: string;
	};
};
