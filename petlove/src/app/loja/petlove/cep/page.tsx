'use client';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useReducer } from 'react';

import './styles.scss';

import { ModalWithoutCep } from './ModalWithoutCep';
import { NotificationCep } from './NotificationCep';
import { cepReducer, initialState } from './reducer';

import { Button, CustomData, HeaderAcquisitionFlow, Input, ProgressBar, Typography } from '@/components';
import { useDebouncedValue, useTracking } from '@/hooks';
import { CepService, fetchPostalGuideStateService, PostalCepService } from '@/services';
import { useAquisitionStore } from '@/store';
import { cepMask } from '@/utils';
import { pushCoverageCepToDataLayer, pushCoveragePostalGuideToDataLayer, pushErrorCoverageCepToDataLayer, pushErrorCoveragePostalGuideToDataLayer } from './dataLayer';

export default function Cep() {
  useTracking();
  const router = useRouter();
  const [state, dispatch] = useReducer(cepReducer, initialState);
  const { data: localStorage, setAddress: setLocalStorage } = useAquisitionStore((state) => state);
  const postalGuideAddressInputDebounce = useDebouncedValue(state.postalGuide.addressInput, 700);
  const searchCepDebounce = useDebouncedValue(state.search.cep, 700);
  const showNotification = state.notification?.address && state.notification?.cep && state.notification?.stateCode && state.notification?.state && state.notification?.street;

  function handleNextScreen() {
    setLocalStorage({
      cep: state.search.cep,
      state: state.search?.state,
      city: state.search?.city,
      number: '',
      complement: '',
      stateCode: state.notification.stateCode,
      street: state.search?.street,
      neighborhood: state.search.neighborhood,
      ibgeCode: state.notification.ibgeCode,
    });

    router.push('/loja/petlove/endereco');
  }

  function getInitialDataFromSessionStorage() {
    if (localStorage?.address?.cep.length < 1) return;
    dispatch({
      type: 'setAllSearchFields',
      payload: { ...localStorage.address },
    });
  }

  async function fetchSearchCep() {
    dispatch({
      type: 'setSearchField',
      fieldName: 'isFetchingCep',
      payload: true
    });
    dispatch({ type: 'resetPostalGuideErrors' });
    dispatch({ type: 'clearNotification' });
    dispatch({ type: 'resetSearchErrors' });

    try {
      const isValid = validationField();
      if (!isValid) return;

      const userAddess = await CepService(state.search.cep);
      dispatch({ type: 'setAllSearchFields', payload: userAddess });
      dispatch({ type: 'setAllNotificationFields', payload: userAddess });
      pushCoverageCepToDataLayer(userAddess);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      dispatch({
        type: 'setSearchErrors',
        fieldName: 'cep',
        payload: 'Algo deu errado. Tente novamente mais tarde.'
      });
      pushErrorCoverageCepToDataLayer(error);
    } finally {
      dispatch({
        type: 'setSearchField',
        fieldName: 'isFetchingCep',
        payload: false
      });
    }
  }

  async function fetchAvailableCities() {
    if (!state.postalGuide.selectedState) return;
    dispatch({
      type: 'setPostalGuideField',
      fieldName: 'isFetchingCity',
      payload: true
    });
    try {
      const cities = await fetchPostalGuideStateService(state.postalGuide.selectedState);
      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'availableCities',
        payload: cities
      })
    } catch (error) {
      console.error('fetchAvailableCities', error);
    } finally {
      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'isFetchingCity',
        payload: false
      });
    }
  }

  async function fetchfullUserAddress() {
    try {
      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'isFetchingFullAddress',
        payload: true
      });
      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'addressList',
        payload: []
      });
      dispatch({
        type: 'setPostalGuideErrors',
        fieldName: 'addressInput',
        payload: ''
      });

      if (!state.postalGuide.addressInput) return;

      const address = {
        stateName: state.postalGuide.selectedState,
        cityName: state.postalGuide.selectedCity,
        addressName: state.postalGuide.addressInput,
      }
      const { logradouros } = await PostalCepService(address);

      if (logradouros.length < 1) {
        throw new Error('Digite um logradouro válido');
      }

      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'addressList',
        payload: logradouros
      });
      dispatch({
        type: 'setPostalGuideErrors',
        fieldName: 'addressInput',
        payload: ''
      });
      pushCoveragePostalGuideToDataLayer();
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error('fetchfullUserAddress', error);
      dispatch({
        type: 'setPostalGuideErrors',
        fieldName: 'addressInput',
        payload: 'error'
      });
      pushErrorCoveragePostalGuideToDataLayer(error);
    } finally {
      dispatch({
        type: 'setPostalGuideField',
        fieldName: 'isFetchingFullAddress',
        payload: false
      });
    }
  }

  function validationField() {
    return state.search.cep.length === 9;
  }

  function handleOpenModalWithoutCep() {
    const params = new URLSearchParams(window.location.search);
    console.log('handleOpenModalWithoutCep', params);
    params.set('modal', 'modal-nao-sei-o-cep');
    router.push(`?${params.toString()}`, { scroll: false });
    // dispatch({ type: 'cleanSearchFields' });
    // dispatch({ type: 'clearNotification' });
    // dispatch({
    //   type: 'setSearchErrors',
    //   fieldName: 'cep',
    //   payload: ''
    // });

    // dispatch({ type: 'clearPostalGuide' });
  }

  const handleCloseModalWithoutCep = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('modal');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    getInitialDataFromSessionStorage();
  }, [localStorage]);

  useEffect(() => {
    fetchSearchCep();
  }, [searchCepDebounce]);

  useEffect(() => {
    fetchAvailableCities();
  }, [state.postalGuide.selectedState]);

  useEffect(() => {
    fetchfullUserAddress();
  }, [postalGuideAddressInputDebounce]);

  return (
    <>
      <CustomData
        pageName="Cuidamos do seu pet onde ele estiver"
        category='aquisicao'
        product='petlove-saude'
        subproduct=''
        funnel='short-form'
        vertical='servico'
        cpf=''
      />
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/dados-do-pet"
        hasShoppingCart={false}
      />
      <ProgressBar initialValue={20} value={40} />
      <div className="page__cep">
        <Typography
          id="gtm-title"
          variant="title4"
          weight="bold"
          className="cep__title"
        >
          Cuidamos do seu pet onde ele estiver
        </Typography>
        <Typography
          variant="body1"
          color="neutral-700"
          className="cep__subtitle"
        >
          Agora, informe a região onde seu pet mora para encontrarmos o plano
          ideal.
        </Typography>

        <div className="cep__input">
          <Input
            label="CEP"
            name="cep"
            disabled={state.search.isFetchingCep}
            width="fluid"
            autoFocus
            value={state.search.cep}
            isLoading={state.search.isFetchingCep}
            success={state.notification.hasCoverage}
            onChange={(value) =>
              dispatch({
                type: 'setSearchField',
                fieldName: 'cep',
                payload: cepMask(value.target.value),
              })
            }
            errorMessage={state.search?.errors?.cep}
          />
          <Typography
            variant="body1"
            className="cep__link"
            color="brand-insurance-900"
            onClick={handleOpenModalWithoutCep}
          >
            Não sei o CEP
          </Typography>
        </div>

        {showNotification && (
          <NotificationCep
            error={false}
            coverage={state.notification.hasCoverage}
            cep={state.notification.cep}
            street={state.notification.street}
            stateCode={state.notification.stateCode}
            neighborhood={state.notification.neighborhood}
          />
        )}

        <Button
          title="continuar"
          variant='insurance'
          disabled={!state.notification.hasCoverage}
          styles="primary"
          width="fluid"
          onClick={handleNextScreen}
        >
          Continuar
        </Button>
      </div>
      <Suspense>
        <ModalWithoutCep
          title="Pesquisa de CEP"
          subtitle="Todos campos são obrigatórios"
          buttonLabel="Selecionar CEP"
          state={state}
          dispatch={dispatch}
          handleCloseModal={handleCloseModalWithoutCep}
        />
      </Suspense>
    </>
  );
}
