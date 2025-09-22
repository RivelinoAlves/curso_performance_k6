import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'], // menos de 1% das requisições devem falhar
        http_req_duration: ['p(95) < 200', 'p(90) < 400', 'p(99.9) < 2000'], // 95% das requisições devem ser menores que 200ms
        checks: ['rate > 0.99'], // mais de 99% dos checks devem passar
    }
};

export default function () {
   const res = http.get('https://test.k6.io');

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}