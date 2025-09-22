import http from 'k6/http';
import { check, sleep } from 'k6';
import { sharedArray } from 'k6/data';



export const options = {
    stages: [
        { duration: '10s', target: 10 }, // rampa para 20 usuários em 1 minuto
        { duration: '10s', target: 10 }, // mantém 20 usuários por 3 minutos
        { duration: '10s', target: 0 },  // rampa para 0 usuários em 1 minuto
    ],
    thresholds: {
        checks: ['rate > 0.99'], // menos de 1% das requisições devem falhar
        http_req_duration: ['p(95) < 200'], // 95% das requisições devem ser menores que 200ms
    }
}

const users = new sharedArray('users', function () {
    return JSON.parse(open('./dados.json')).crocodilos;
});

export default function () {
    const crocodilo = users[Math.floor(Math.random() * users.length)].id;
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

    const res = http.get(BASE_URL);

    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    sleep(1);
}