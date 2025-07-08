import type { initialState } from './initialState';

export type SearchField = keyof typeof initialState.search;
export type PostalGuideField = keyof typeof initialState.postalGuide;
export type NotificationField = keyof typeof initialState.notification;

export type Field = SearchField | PostalGuideField | NotificationField;

export type ActionProps = {
  type:
  | 'setSearchField'
  | 'setPostalGuideField'
  | 'setPostalGuideDropdown'
  | 'setSearchErrors'
  | 'setCleanFieldsCep'
  | 'resetSearchErrors'
  | 'resetPostalGuideErrors'
  | 'setAllSearchFields'
  | 'setAllNotificationFields'
  | 'cleanSearchFields'
  | 'clearNotification'
  | 'clearPostalGuide'
  | 'setPostalGuideErrors';
  fieldName?: Field;
  payload?: any;
};

export type keyValueProps = {
  [key: string]: any;
};

export interface InitialStateProps {
  search: {
    cep: string;
    street: string;
    state: string;
    address: string;
    neighborhood: string;
    complement: string;
    number: string;
    ibgeCode: string;
    city: string;
    stateCode: string;
    isFetchingCep: boolean;
    errors: any;
  };
  postalGuide: {
    addressInput: string;
    cep: string;
    street: string;
    address: string;
    selectedCity: string;
    selectedState: string;
    addressList: string[];
    availableCities: string[];
    filteredCities: string[];
    availableStates: string[];
    cepList: string[];
    dropdowns: {
      city: boolean;
      state: boolean;
    };
    isFetchingCity: boolean;
    isFetchingFullAddress: boolean;
    errors: {
      street: string;
      city: string;
      selectedState: string;
      addressInput: string;
    };
  };
  notification: {
    hasCoverage: boolean;
    address: string;
    street: string;
    ibgeCode: string;
    cep: string;
    neighborhood: string;
    state: string;
    stateCode: string;
  };
}
