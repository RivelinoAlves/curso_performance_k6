import http from 'k6/http';

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            rate: 5,
            duration: '30s',
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '10s',
            tags: { test_type: 'listagem_de_crocodilos' },
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: { test_type: 'listagem_de_crocodilos' },
        }
    }
};

export function listar() {
    http.get(__ENV.URL + 'crocodiles/');

}

export function buscar() {
    if (__VU % 2 === 0) {
        http.get(__ENV.URL + 'crocodiles/2');
    } else {
        http.get(__ENV.URL + 'crocodiles/1');
    }
}
