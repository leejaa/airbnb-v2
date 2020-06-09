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