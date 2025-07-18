// usePostalGuide.ts
import { useCallback, useState } from 'react';
import { fetchPostalGuideStateService } from '@/services/fetchPostalGuideStateService';
import { PostalCepService } from '@/services/PostalCepService';
import { pushCoveragePostalGuideToDataLayer, pushErrorCoveragePostalGuideToDataLayer } from '@/utils/dataLayer';

export function usePostalGuide(selectedState: string, selectedCity: string, addressInput: string) {
  const [cities, setCities] = useState<string[]>([]);
  const [addressList, setAddressList] = useState<string[]>([]);

  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const [errorCities, setErrorCities] = useState<string | null>(null);
  const [errorAddress, setErrorAddress] = useState<string | null>(null);

  const fetchAvailableCities = useCallback(async () => {
    if (!selectedState) return;
    setIsLoadingCities(true);
    setErrorCities(null);

    try {
      const cities = await fetchPostalGuideStateService(selectedState);
      setCities(cities);
    } catch (error) {
      console.error('fetchAvailableCities', error);
      setErrorCities('Erro ao buscar cidades');
    } finally {
      setIsLoadingCities(false);
    }
  }, [selectedState]);

  const fetchFullUserAddress = useCallback(async () => {
    setIsLoadingAddress(true);
    setErrorAddress(null);
    setAddressList([]);

    try {
      if (!addressInput) return;

      const address = {
        stateName: selectedState,
        cityName: selectedCity,
        addressName: addressInput,
      };

      const { logradouros } = await PostalCepService(address);

      if (logradouros.length < 1) throw new Error('Digite um logradouro válido');

      setAddressList(logradouros);
      pushCoveragePostalGuideToDataLayer();
    } catch (error: any) {
      console.error('fetchFullUserAddress', error);
      setErrorAddress('Digite um logradouro válido');
      pushErrorCoveragePostalGuideToDataLayer(error);
    } finally {
      setIsLoadingAddress(false);
    }
  }, [selectedState, selectedCity, addressInput]);

  return {
    cities,
    addressList,
    isLoadingCities,
    isLoadingAddress,
    errorCities,
    errorAddress,
    fetchAvailableCities,
    fetchFullUserAddress,
  };
}
