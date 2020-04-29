import axios from "axios";

const url = 'https://hooks.slack.com/services/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';
const headers = {
    "Content-Type": "application/json"
};
const body = {
    text: 'master에 배포합니다.'
};

export default async(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        await doHook();
    } catch (error) {
        res.end(JSON.stringify({ result: error }));
    }
    res.end(JSON.stringify({ result: 'SUCCESS' }));
}

async function doHook() {
    try {
        console.log('Web Hook 실행');
        await axios.post( url, body, { headers });
    } catch (error) {
        console.log('error', error);
    }
}