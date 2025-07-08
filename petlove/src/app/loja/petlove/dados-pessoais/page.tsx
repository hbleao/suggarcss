'use client';
import { env } from 'next-runtime-env';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import './styles.scss';

import {
  Button,
  Checkbox,
  Dialog,
  HeaderAcquisitionFlow,
  Input,
  Loader,
  ProgressBar,
  Typography,
} from '@/components';
import { useDebouncedValue } from '@/hooks';
import { DataQualityService, encryptValueService, getPublicIP, ProposalService } from '@/services';
import { useAquisitionStore } from '@/store';
import {
  cpfMask,
  generateSessionId,
  onlyNumbers,
  phoneMask,
  sanitize
} from '@/utils';

export default function PersonalData() {
  const organizationId = generateSessionId(String(env('NEXT_PUBLIC_ORGANIZATION_ID')));
  const cartCookieDomain = generateSessionId(String(env('NEXT_PUBLIC_CART_COOKIE_DOMAIN')));
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
  });
  const isEmailValueDebounce = useDebouncedValue(user.email, 700);
  const isPhoneValueDebounce = useDebouncedValue(user.phone, 700);
  const isEnableButton = emailValidation.isValid && user.fullName.length > 5 && user.cpf.length === 14 && phoneValidation.isValid;
  const [_, setCookie] = useCookies([
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
    setTimeout(() => {
      window.open(url, '_self');
    }, 0);
  }

  async function handleSetCookies(cartId: string) {
    try {
      const encryptFullNameValue = await encryptValueService(user.fullName);
      const encryptEmailValue = await encryptValueService(user.email);
      const encryptCpfValue = await encryptValueService(onlyNumbers(user.cpf));
      const encryptPhoneValue = await encryptValueService(onlyNumbers(user.phone));

      setCookie('shopping_token', cartId);
      setCookie('nom_enc_sms', encryptFullNameValue);
      setCookie('em_enc_sms', encryptEmailValue);
      setCookie('tax_enc_sms', encryptCpfValue);
      setCookie('mob_enc_sms', encryptPhoneValue);
      setCookie('sid_enc_sms', organizationId);

    } catch (error) {
      console.error('HandleSetCookies: ', error);
      throw error;
    }
  }

  async function handleNextScreen() {
    setIsLoadingProposal(true);
    setIsErrorProposalRequest(false);

    try {
      const body = await getProposalBody();
      const httpProposalResponse = await ProposalService(body);

      await handleSetCookies(httpProposalResponse?.cartCommerceId.cartId);

      window.sessionStorage.setItem('shopping_token', httpProposalResponse.cartCommerceId.cartId);

      if (isErrorProposalRequest) return;

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

  async function checkEmailValidation() {
    if (user.email?.length < 8) return;
    try {
      setIsLoadingEmailValidation(true);
      const httpEmailValidationResult = await DataQualityService({
        type: 'email',
        param: user.email
      });
      console.log('httpEmailValidationResult', httpEmailValidationResult);
      setEmailValidation(httpEmailValidationResult);
    } catch (error) {
      setEmailValidation({
        isValid: false,
        message: 'Valor inválido'
      });
    } finally {
      setIsLoadingEmailValidation(false);
    }
  }

  async function checkPhoneValidation() {
    if (user.phone?.length !== 15) return;
    try {
      setIsLoadingPhoneValidation(true);
      const httpPhoneValidationResult = await DataQualityService({
        type: 'telefone',
        param: onlyNumbers(user.phone)
      });
      console.log('httpPhoneValidationResult', httpPhoneValidationResult);
      setPhoneValidation(httpPhoneValidationResult);
    } catch (error) {
      setEmailValidation({
        isValid: false,
        message: 'Valor inválido'
      });
    } finally {
      setIsLoadingPhoneValidation(false);
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

  return (
    <>
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/planos"
        hasShoppingCart={false}
      />
      <ProgressBar initialValue={80} value={90} />
      <main className="page__personal-data">
        <Typography variant="title4" className="personal-data__title">
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
            success={user.email.length > 5}
            disabled={isLoadingProposal}
            onChange={(e) => setUser({ ...user, fullName: sanitize(e.target.value) })}
          />
          <Input
            label="CPF"
            width="fluid"
            value={user.cpf}
            disabled={isLoadingProposal}
            success={user.cpf.length === 14}
            onChange={(e) => setUser({ ...user, cpf: cpfMask(e.target.value) })}
          />
          <Input
            label="Telefone"
            width="fluid"
            value={user.phone}
            disabled={isLoadingProposal}
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            isLoading={isLoadingEmailValidation}
            helperText="As próximas etapas para ativar seu plano Petlove Saúde serão enviadas para este e-mail."
            errorMessage={emailValidation.message}
          />
          <Checkbox
            className="personal-data__checkbox"
            label="Tenho interesse em receber comunicação com condições especiais e
							ofertas de Produtos e Serviços Porto."
            variant={user.acceptTerms ? 'checked' : 'default'}
            onClick={() =>
              setUser({
                ...user,
                acceptTerms: !user.acceptTerms,
              })
            }
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
            disabled={!isEnableButton}
            onClick={handleNextScreen}
          >
            {isLoadingProposal ? <Loader color='neutral-0' /> : 'Continuar'}
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
