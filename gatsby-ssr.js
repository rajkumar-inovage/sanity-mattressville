require(`isomorphic-fetch`)
const React = require('react')
const preferDefault = m => (m && m.default) || m

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="mVille"
      rel="stylesheet"
      type="text/css"
      href={`${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8000'
          : process.env.SITE_URL
      }/scss/mVille.min.css`}
    />,
    <meta name="google-site-verification" content="s7068EzxQCTXdWVZu87mk4P8tag5AA2JtPyurFnSctM" key={`GoogleShopping`} />,
    <script
      key="gtm"
      dangerouslySetInnerHTML={{
        __html: `!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-PWDN66V",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer");`,
      }}
    />,

    <script 
      key="gtag" 
      async 
      src="https://www.googletagmanager.com/gtag/js?id=UA-183637056-1" 
    />,
    <script key="googleAdsTaglink" async src="https://www.googletagmanager.com/gtag/js?id=AW-456583818"></script>,
    <script 
      key="googleAdsTag" 
      dangerouslySetInnerHTML={{
        __html: `  window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-456583818');
      `
      }}
    />,
    <script 
      key="masterTag" 
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-183637056-1');`
      }}
    />,
    
    <script
      key="aw"
      dangerouslySetInnerHTML={{
        __html: `gtag('event', 'page_view', {
          'send_to': 'AW-456583818',
          'value': 'replace with value',
          'items': [{
            'id': 'replace with value',
            'google_business_vertical': 'retail'
          }]
        });`,
      }}
    />,
  ])
}

exports.wrapRootElement = preferDefault(require(`./inject-provider`))
