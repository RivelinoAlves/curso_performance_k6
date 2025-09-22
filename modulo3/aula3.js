import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
};

export default function () {
   const res = http.get('https://test.k6.io');

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}