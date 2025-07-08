import { produce } from 'immer';
import type { ActionProps, InitialStateProps } from './types';

function reducer(state: InitialStateProps, action: ActionProps) {
  switch (action.type) {
    case 'setSearchField': {
      state.search[action.fieldName] = action.payload;
      return;
    }

    case 'setPostalGuideField': {
      state.postalGuide[action.fieldName] = action.payload;
      return;
    }

    case 'setPostalGuideDropdown': {
      state.postalGuide.dropdowns[action.fieldName] = action.payload;
      return;
    }

    case 'setSearchErrors': {
      state.search.errors[action.fieldName] = action.payload;
      return;
    }

    case 'setPostalGuideErrors': {
      state.postalGuide.errors[action.fieldName] = action.payload;
      return;
    }

    case 'resetSearchErrors': {
      state.search.errors = {
        cep: '',
      };
      return;
    }

    case 'resetPostalGuideErrors': {
      state.postalGuide.errors = {
        street: '',
        city: '',
        selectedState: '',
        addressInput: ''
      };
      return;
    }

    case 'setAllSearchFields': {
      const fieldsMap = {
        cep: 'cep',
        address: 'address',
        neighborhood: 'neighborhood',
        state: 'state',
        ibgeCode: 'ibgeCode',
        city: 'city',
        street: 'street',
        stateCode: 'stateCode',
      };

      for (const [payloadKey, fieldKey] of Object.entries(fieldsMap)) {
        const value = action.payload[payloadKey];
        if (value && value.length > 0) {
          state.search[fieldKey] = value;
        }
      }
      return;
    }

    case 'setAllNotificationFields': {
      const fieldNotificationMap = {
        hasCoverage: 'hasCoverage',
        ibgeCode: 'ibgeCode',
        address: 'address',
        street: 'street',
        neighborhood: 'neighborhood',
        cep: 'cep',
        state: 'state',
        stateCode: 'stateCode',
      };

      for (const [payloadKey, fieldKey] of Object.entries(fieldNotificationMap)) {
        const value = action.payload[payloadKey];
        state.notification[fieldKey] = value ? value : '';
      }
      return;
    }

    case 'cleanSearchFields': {
      state.search = {
        ...state.search,
        cep: '',
        address: '',
        neighborhood: '',
        state: '',
        city: '',
        street: '',
        stateCode: '',
        complement: '',
        number: '',
        isFetchingCep: false,
        errors: {
          cep: '',
        },
      };
      return;
    }

    case 'clearNotification': {
      state.notification = {
        hasCoverage: false,
        ibgeCode: '',
        address: '',
        street: '',
        cep: '',
        neighborhood: '',
        state: '',
        stateCode: '',
      }

      return;
    }

    case 'clearPostalGuide': {
      state.postalGuide = {
        addressInput: '',
        cep: '',
        street: '',
        address: '',
        selectedCity: '',
        selectedState: '',
        addressList: [],
        availableCities: [],
        filteredCities: [],
        availableStates: [],
        cepList: [],
        dropdowns: {
          city: false,
          state: false,
        },
        isFetchingCity: false,
        isFetchingFullAddress: false,
        errors: {
          street: '',
          city: '',
          selectedState: '',
          addressInput: '',
        }
      }

      return;
    }
  }
}

export const cepReducer = produce(reducer);
