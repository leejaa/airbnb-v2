const axios = require( 'axios' );

const url = 'https://hooks.slack.com/services/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';

const headers = {
    "Content-Type": "application/json"
};

const body = {
    text: 'master에 배포합니다.'
};

doHook();

async function doHook() {
    try {
        console.log('Web Hook 실행');
        await axios.post( url, body, { headers });
    } catch (error) {
        console.log('error', error);
    }
}