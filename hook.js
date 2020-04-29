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