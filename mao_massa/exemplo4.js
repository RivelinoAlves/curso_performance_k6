import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import paparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
    }
}

const csvData = new SharedArray('some data name', function () {
    return paparse.parse(open('./usuarios.csv'), { header: true }).data;
});

export default function () {
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email;
    const PASS = 'user123'
    const BASE_URL = 'https://test-api.k6.io';

    console.log(USER);

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USER,
        password: PASS
    });

    check(res, {
        'sucesso ao logar': (r) => r.status === 200,
        'token recebido': (r) => r.json('access') !== '',
    });

    sleep(1)
}