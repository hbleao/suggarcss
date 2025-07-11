'use client';
import Head from 'next/head';
import { useEffect } from 'react';

/**
 * @param {string} sessionId - O parâmetro sessionId precisa gerado
 * @param {string} organizationId - O parâmetro organizationId é unico de cada aplicação
 *
 * @returns {JSX.Element} Retorna um componente JSX
 *
 * @example
 * <TolkitLexis sessionId="xxxxxxx" organizationId="xxxxxxx" />
 */

export const TolkitLexis = ({ sessionId, organizationId }: any) => {
  if (typeof window === 'undefined') return;

  useEffect(() => {
    if (sessionId) {
      const url = `https://apicorporativops.portoseguro.com.br/fp/tags?org_id=${organizationId}&session_id=${sessionId}`;
      const styles =
        'width: 100px; height: 100px; border: 0; position: absolut; top: -5000px';
      const iframeNode = document.createElement('iframe');
      iframeNode.src = url;
      iframeNode.setAttribute('style', styles);
      const noscriptNode = document.createElement('noscript');
      noscriptNode.appendChild(iframeNode);
      document.body?.appendChild(noscriptNode);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      // @ts-ignore
      if (typeof threatmetrix !== 'undefined') {
        const code = `
        var session_id = "${sessionId}"
        threatmetrix.profile("apicorporativops.portoseguro.com.br", "${organizationId}", "${sessionId}")
      `;
        const textNode = document.createTextNode(
          // biome-ignore lint/security/noGlobalEval: <explanation>
          code.replace(/\${(.*?)}/g, (_, g) => eval(g)),
        );
        const scriptNode = document.createElement('script');
        scriptNode.type = 'text/javascript';
        scriptNode.appendChild(textNode);
        document.body?.appendChild(scriptNode);
      }
    }
  }, [sessionId]);

  return (
    <Head>
      <script>
        {`(function(){
        var g=this||self;function z(){return"undefined"===typeof Date.now?(new Date).getTime():Date.now()}function N(E){this.L=E;16==this.L?(this.v=268435456,this.C=4026531839):(this.v=78364164096,this.C=2742745743359)}function l(E){return(Math.floor(Math.random()*E.C)+E.v).toString(E.L)};function T(E){this.C=E}T.prototype.supported=function(){return void 0!=window.localStorage};T.prototype.get=function(){return window.localStorage.getItem(this.C)};T.prototype.set=function(E){return window.localStorage.setItem(this.C,E)};T.prototype.set=T.prototype.set;function Z(){var E=z(),Y=new N(16);Y=l(Y)+l(Y)+l(Y)+l(Y);return[0,0,E,E,Y].join(":")}function J(){var E=new T("ed73f20edbf2b73");if(!E.supported())return null;E=E.get();if(null===E)return null;var Y=E.split("_");2===Y.length&&(E=Y[0]);return"0:"+E}
        function v(){var E=J();if(null===E)if(E=new T("ed73f20edbf2b74"),E.supported()){var Y=E.get();null===Y&&(Y=Z());var u=E.set;var S=Y.split(":");if(5!=S.length)S=Y;else{var t=parseInt(S[1],10)+1,K=z();K>parseInt(S[2],10)+157788E5?S=Z():(S[1]=t.toString(),S[3]=K,S=S.join(":"))}u.call(E,S);E="1:"+Y}else E=null;return E}
        function y(E,Y){E={iceServers:[{urls:"turn:aa.online-metrix.net?transport\x3dtcp",username:E,credential:Y},{urls:"turn:aa.online-metrix.net?transport\x3dudp",username:E,credential:Y}]};return"undefined"!==typeof window.RTCPeerConnection&&null!==window.RTCPeerConnection?new window.RTCPeerConnection(E):"undefined"!==typeof window.webkitRTCPeerConnection&&null!==window.webkitRTCPeerConnection?new window.webkitRTCPeerConnection(E):"undefined"!==typeof window.C&&null!==window.C?new window.C(E):null}
        function w(E,Y){var u=v();try{var S=y("2:"+E+":"+Y+":"+u,Y);if(S&&"undefined"!==typeof S.createDataChannel&&null!==S.createDataChannel){S.createDataChannel(Math.random().toString());var t=function(){};E=function(K){S.setLocalDescription(K,t,t)};"undefined"===typeof Promise||0<S.createOffer.length?S.createOffer(E,t):S.createOffer().then(E,t);setInterval(function(){"undefined"!==typeof S.close&&null!==S.close&&S.close();"undefined"!==typeof S.onicecandidate&&null!==S.onicecandidate&&(S.onicecandidate=
        function(){},S=null)},1E4)}}catch(K){}}var X=null;function h(E){for(var Y;null!==(Y=document.getElementById(E));)Y.parentElement.removeChild(Y)}
        function P(E,Y,u,S){if("undefined"!==typeof E&&"undefined"!==typeof Y&&"undefined"!==typeof u&&8===Y.length){if(-1!==u.indexOf(":"))throw Error("invalid session_id "+u);h("tdz_ifrm");h("tmx_tags_iframe");h("tmx_tags_js");var t=document;if("undefined"!==typeof t.currentScript&&null!==t.currentScript){var K=t.currentScript.getAttribute("nonce");"undefined"!==typeof K&&null!==K&&""!==K?X=K:"undefined"!==typeof t.currentScript.nonce&&null!==t.currentScript.nonce&&""!==t.currentScript.nonce&&
        (X=t.currentScript.nonce)}w(Y,u);t=document.getElementsByTagName("head").item(0);K=document.createElement("script");K.id="tmx_tags_js";K.setAttribute("type","text/javascript");var k=new N(36),I=Math.floor(Math.random()*k.C),n=Math.floor(Math.random()*k.C);n=(n-n%256+5+I)%k.C;var L=(885187064159+I)%k.C;I=l(k)+(I+k.v).toString(k.L);n=(L+k.v).toString(k.L)+(n+k.v).toString(k.L);E="https://"+E+"/"+I+".js";Y=[n+"\x3d"+Y,l(k)+l(k)+"\x3d"+u];"undefined"!==typeof S&&null!==S&&0<S.length&&Y.push(l(k)+l(k)+
        "\x3d"+S);K.setAttribute("src",E+"?"+Y.join("\x26"));null!==X&&(K.setAttribute("nonce",X),K.getAttribute("nonce")!==X&&(K.nonce=X));t.appendChild(K)}}var W=["threatmetrix","profile"],Q=g;W[0]in Q||"undefined"==typeof Q.execScript||Q.execScript("var "+W[0]);for(var R;W.length&&(R=W.shift());)W.length||void 0===P?Q[R]&&Q[R]!==Object.prototype[R]?Q=Q[R]:Q=Q[R]={}:Q[R]=P;}).call(this);
        `}
      </script>
    </Head>
  );
};
