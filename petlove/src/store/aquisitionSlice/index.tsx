import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { initialData } from './initialData';

import type { IAddress, IPet, IPlan, IUser, UserProps } from './types';

export const useAquisitionStore = create(
	persist<UserProps>(
		(set, get) => ({
			data: initialData,
			setPet: (pet: IPet) =>
				set({
					data: {
						...get().data,
						pet: { ...get().data.pet, ...pet },
					},
				}),
			setAddress: (address: IAddress) => {
				set({
					data: {
						...get().data,
						address: { ...get().data.address, ...address },
					},
				});
			},
			setPlan: (plan: IPlan) => {
				set({
					data: {
						...get().data,
						plan: { ...get().data.plan, ...plan },
					},
				});
			},
			setUser: (user: IUser) => {
				set({
					data: {
						...get().data,
						user: { ...get().data.user, ...user },
					},
				});
			},
			cleanData: () =>
				set({
					data: initialData,
				}),
		}),
		{
			name: '@porto-petlove-aquisition',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
