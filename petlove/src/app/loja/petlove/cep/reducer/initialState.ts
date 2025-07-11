export const initialState = {
  search: {
    cep: '',
    street: '',
    state: '',
    address: '',
    neighborhood: '',
    complement: '',
    number: '',
    city: '',
    ibgeCode: '',
    stateCode: '',
    isFetchingCep: false,
    errors: {
      cep: '',
    },
  },
  postalGuide: {
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
      addressInput: ''
    },
  },
  notification: {
    hasCoverage: false,
    ibgeCode: '',
    address: '',
    street: '',
    cep: '',
    neighborhood: '',
    state: '',
    stateCode: '',
  },
} as const;
