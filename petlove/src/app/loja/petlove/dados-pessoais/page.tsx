'use client';
import { env } from 'next-runtime-env';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import './styles.scss';

import {
  Button,
  Checkbox,
  CustomData,
  Dialog,
  HeaderAcquisitionFlow,
  Input,
  ProgressBar,
  Typography
} from '@/components';
import { useDebouncedValue, useTracking } from '@/hooks';
import { DataQualityService, encryptValue, getPublicIP, ProposalService } from '@/services';
import { useAquisitionStore } from '@/store';
import {
  cpfMask,
  generateSessionId,
  onlyNumbers,
  phoneMask,
  sanitize
} from '@/utils';
import { pushAddToCartToDataLayer, pushPromoMktComunicationToDataLayer } from './dataLayer';
import { handleFieldsValidation } from './validation';

export default function PersonalData() {
  useTracking();
  const cartCookieDomain = env('NEXT_PUBLIC_CART_COOKIE_DOMAIN');
  const organizationId = generateSessionId(String(env('NEXT_PUBLIC_ORGANIZATION_ID')));
  const { data: localStorage, setUser: setLocalStorage } = useAquisitionStore((state) => state);
  const [isLoadingProposal, setIsLoadingProposal] = useState(false);
  const [isErrorProposalRequest, setIsErrorProposalRequest] = useState(false);
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: '',
  });
  const [isLoadingEmailValidation, setIsLoadingEmailValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState({
    isValid: false,
    message: '',
  });
  const [isLoadingPhoneValidation, setIsLoadingPhoneValidation] = useState(false);
  const [ip, setIp] = useState('');
  const [user, setUser] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    acceptTerms: false,
    errors: {
      cpf: '',
      fullName: '',
      email: ''
    }
  });
  const isEmailValueDebounce = useDebouncedValue(user.email, 1000);
  const isPhoneValueDebounce = useDebouncedValue(user.phone, 1000);
  const isCpfValueDebounce = useDebouncedValue(user.cpf, 700);
  const isFullNameValueDebounce = useDebouncedValue(user.fullName, 700);
  const isEnableButton =
    emailValidation.isValid &&
    user.fullName.length > 5 &&
    user.errors?.fullName?.length < 1 &&
    user.errors?.cpf?.length < 1 &&
    user.cpf.length === 14 &&
    phoneValidation.isValid &&
    !isLoadingEmailValidation &&
    !isLoadingPhoneValidation;
  const [_, setCookie, removeCookie] = useCookies([
    'shopping_token',
    'nom_enc_sms',
    'em_enc_sms',
    'mob_enc_sms',
    'sid_enc_sms',
    'tax_enc_sms',
    'enc_cad_pf',
  ]);

  function loadInitialStorage() {
    setUser({
      cpf: localStorage.user.cpf,
      email: localStorage.user.email,
      fullName: localStorage.user.fullName,
      phone: phoneMask(localStorage.user.phone),
      acceptTerms: localStorage.user.acceptTerms,
      errors: {
        cpf: '',
        fullName: '',
        email: ''
      }
    });
  }

  async function handleFetchPublicIP() {
    try {
      const ip = await getPublicIP();
      setIp(ip);
    } catch (error) {
      console.error('handleFetchPublicIP: ', error);
    }
  }

  async function getProposalBody() {
    return {
      pet: {
        name: localStorage.pet.name,
        type: localStorage.pet.type,
      },
      address: {
        cep: onlyNumbers(localStorage.address.cep),
        street: localStorage.address.street,
        number: localStorage.address.number,
        complement: localStorage.address.complement,
        city: localStorage.address.city,
        state: localStorage.address.state,
        stateCode: localStorage.address.stateCode,
        neighborhood: localStorage.address.neighborhood
      },
      plan: {
        id: localStorage.plan.id,
        name: localStorage.plan.name,
        price: localStorage.plan.price,
        coverage: localStorage.plan.coverage
      },
      user: {
        fullName: user.fullName,
        cpf: onlyNumbers(user.cpf),
        phone: onlyNumbers(user.phone),
        email: user.email,
        acceptTerms: user.acceptTerms,
        mktCommunication: true,
      },
      "cartCommerceId": "",
      "customerCommerceToken": "",
      "marketingOptInFlag": true,
      "sessionId": organizationId,
      "userAgent": navigator.userAgent,
      "ipAddress": ip
    }
  }

  function redirectToCart(url: string) {
    window.open(url, '_self');
  }

  async function handleSetCookies(cartId: string) {
    try {
      const cookieDomain = { path: '/', domain: cartCookieDomain };

      removeCookie('shopping_token', cookieDomain);

      const encryptFullNameValue = encryptValue(user.fullName);
      const encryptEmailValue = encryptValue(user.email);
      const encryptCpfValue = encryptValue(user.cpf);
      const encryptPhoneValue = encryptValue(user.phone);

      setCookie('shopping_token', cartId);
      setCookie('nom_enc_sms', encryptFullNameValue, cookieDomain);
      setCookie('em_enc_sms', encryptEmailValue, cookieDomain);
      setCookie('tax_enc_sms', encryptCpfValue, cookieDomain);
      setCookie('mob_enc_sms', encryptPhoneValue, cookieDomain);
      setCookie('sid_enc_sms', organizationId, cookieDomain);

    } catch (error) {
      console.error('HandleSetCookies: ', error);
      throw error;
    }
  }

  async function checkEmailValidation() {
    const isInvalidEmail = user.errors.email?.length > 0 || user.errors.email !== '';
    const isEmptyEmail = user.email === '';

    if (isInvalidEmail || isEmptyEmail) return;
    setEmailValidation({
      isValid: false,
      message: ''
    });
    try {
      setIsLoadingEmailValidation(true);
      const httpEmailValidationResult = await DataQualityService({
        type: 'email',
        param: user.email
      });
      setEmailValidation(httpEmailValidationResult);
    } catch (error) {
      setEmailValidation({
        isValid: false,
        message: 'Digite um email válido'
      });
    } finally {
      setIsLoadingEmailValidation(false);
    }
  }

  async function checkPhoneValidation() {
    if (user.phone?.length !== 15) return;
    setPhoneValidation({
      isValid: false,
      message: ''
    });
    try {
      setIsLoadingPhoneValidation(true);
      const httpPhoneValidationResult = await DataQualityService({
        type: 'telefone',
        param: onlyNumbers(user.phone)
      });
      setPhoneValidation(httpPhoneValidationResult);
    } catch (error) {
      setPhoneValidation({
        isValid: false,
        message: 'Digite um telefone válido'
      });
    } finally {
      setIsLoadingPhoneValidation(false);
    }
  }

  function handleMktCommunication() {
    setUser({
      ...user,
      acceptTerms: !user.acceptTerms,
    })

  }

  function checkCpfAndFullNameValidation() {
    const errors = handleFieldsValidation(user);
    setUser({ ...user, errors });
  }

  async function handleNextScreen() {
    setIsLoadingProposal(true);
    setIsErrorProposalRequest(false);

    try {
      const body = await getProposalBody();
      const httpProposalResponse = await ProposalService(body);

      await handleSetCookies(httpProposalResponse?.cartCommerceId.cartId);

      window.sessionStorage.setItem('shopping_token', httpProposalResponse.cartCommerceId.cartId);

      pushAddToCartToDataLayer(localStorage.plan, localStorage.pet.name);
      pushPromoMktComunicationToDataLayer({
        acceptTerms: user?.acceptTerms, cpf: user?.cpf
      });

      setLocalStorage({
        acceptTerms: user.acceptTerms,
        cpf: user.cpf,
        email: user.email,
        fullName: user.fullName,
        phone: onlyNumbers(user.phone),
        mktCommunication: true
      });

      redirectToCart(httpProposalResponse.urlCartRedirect);
    } catch (error) {
      setIsErrorProposalRequest(true);
    } finally {
      setIsLoadingProposal(false);
    }
  }

  useEffect(() => {
    loadInitialStorage();
    handleFetchPublicIP();
  }, [localStorage]);

  useEffect(() => {
    checkEmailValidation();
  }, [isEmailValueDebounce]);

  useEffect(() => {
    checkPhoneValidation();
  }, [isPhoneValueDebounce]);

  useEffect(() => {
    checkCpfAndFullNameValidation();
  }, [isCpfValueDebounce, isFullNameValueDebounce, user.email]);

  return (
    <>
      <CustomData
        pageName="Pra continuar, queremos conhecer você"
        category='aquisicao'
        product='petlove-saude'
        subproduct=''
        funnel='short-form'
        vertical='servico'
        cpf={user?.cpf}
      />
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/planos"
        hasShoppingCart={false}
      />
      <ProgressBar initialValue={80} value={90} />
      <main className="page__personal-data">
        <Typography id="gtm-title" variant="title4" className="personal-data__title">
          Pra continuar, queremos conhecer você!
        </Typography>
        <Typography
          variant="body1"
          color="neutral-700"
          className="personal-data__subtitle"
          weight="bold"
        >
          Ou digite os seus dados para continuar
        </Typography>
        <form className="personal-data__form">
          <Input
            label="Nome"
            width="fluid"
            autoFocus
            value={user.fullName}
            success={user.fullName.length > 5 && user.errors?.fullName?.length < 1}
            disabled={isLoadingProposal}
            onChange={(e) => setUser({ ...user, fullName: sanitize.string(e.target.value) })}
            errorMessage={user.errors?.fullName}
          />
          <Input
            label="CPF"
            width="fluid"
            value={user.cpf}
            disabled={isLoadingProposal}
            success={user.cpf.length === 14 && !user.errors?.cpf}
            onChange={(e) => setUser({ ...user, cpf: cpfMask(e.target.value) })}
            errorMessage={user.errors?.cpf}
          />
          <Input
            label="Telefone"
            width="fluid"
            value={user.phone}
            disabled={isLoadingProposal || isLoadingPhoneValidation}
            success={phoneValidation.isValid}
            isLoading={isLoadingPhoneValidation}
            onChange={(e) =>
              setUser({ ...user, phone: phoneMask(e.target.value) })
            }
            errorMessage={phoneValidation.message}
          />
          <Input
            label="Email"
            width="fluid"
            value={user.email}
            success={emailValidation.isValid}
            disabled={isLoadingProposal}
            onChange={(e) => setUser({ ...user, email: sanitize.email(e.target.value) })}
            isLoading={isLoadingEmailValidation}
            helperText="As próximas etapas para ativar seu plano Petlove Saúde serão enviadas para este e-mail."
            errorMessage={emailValidation.message}
          />
          <Checkbox
            className="personal-data__checkbox"
            label="Tenho interesse em receber comunicação com condições especiais e
							ofertas de Produtos e Serviços Porto."
            variant={user.acceptTerms ? 'checked' : 'default'}
            onClick={handleMktCommunication}
          />

          <p className="personal-data__checkbox">
            Ao clicar em "Continuar", você está ciente de que a Porto irá
            coletar e tratar seus dados pessoais de acordo com a nossa
            <a
              className="personal-data__policy"
              target="_blank"
              href="https://www.portoseguro.com.br/privacidade"
              rel="noreferrer"
            >
              {' '}
              Política de Privacidade{' '}
            </a>
            e a
            <a
              className="personal-data__policy"
              target="_blank"
              href="https://saude.petlove.com.br/politica-de-privacidade"
              rel="noreferrer"
            >
              {' '}
              Política de Privacidade da Petlove.
            </a>
          </p>

          <Button
            type='button'
            width="fluid"
            className="personal-data__link-checkout"
            isLoading={isLoadingProposal}
            disabled={!isEnableButton}
            onClick={handleNextScreen}
          >
            Continuar
          </Button>
        </form>

        <Dialog isOpen={isErrorProposalRequest}
          title="Poxa, nosso sistema está em manutenção"
          subtitle="Estamos trabalhando para que volte a funcionar o quanto antes."
          description="Por favor, tente de novo mais tarde."
          footer={<Button size='small' onClick={handleNextScreen}>Tentar novamente</Button>}
        />
      </main>
    </>
  );
}
