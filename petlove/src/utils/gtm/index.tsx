import { env } from 'next-runtime-env';
import Script from 'next/script';

const GTM_CODE = env('NEXT_PUBLIC_GTM_CODE');

export const GTM = () => {
  return (
    <Script strategy="afterInteractive" id="gtm">
      {`
				(function gtmLoader(){function loadGTM(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CODE}');};})();
			`}
    </Script>
  );
};
