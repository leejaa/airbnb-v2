import axios from "axios";
import { IncomingWebhook } from "@slack/webhook";

const url = process.env.SLACK_WEBHOOK_URL || '';
const headers = {
    "Content-Type": "application/json"
};
const body = {
    text: 'master에 배포합니다.'
};
const webhook = new IncomingWebhook(url);

export default async(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let result = 'success';
    try {
        await webhook.send({
            text: 'master에 배포합니다.'
        });
    } catch (error) {
        console.log('error', error);
        result = error;
    }
    res.end(JSON.stringify({ result }));
}

async function doHook() {
    try {
        console.log('Web Hook 실행');
        await axios.post( url, body, { headers });
    } catch (error) {
        console.log('error', error);
    }
}