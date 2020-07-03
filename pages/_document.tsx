import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="google-signin-client_id" content="856576729820-vgvbjdgki8nfqcgnhmljoksd5v2p2j9r.apps.googleusercontent.com" />
          <meta name='description' content='Description' />
          <meta name='keywords' content='Keywords' />
          <title>자훈비앤비</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="stylesheet" href="/static/css/carousel.min.css" />
          <style global jsx>
            {`
              html, body, #__next {
                  height: 100%;
                  width: 100%;
                  overflow: hidden;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charSet="utf-8"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
      </html>
    );
  }
}