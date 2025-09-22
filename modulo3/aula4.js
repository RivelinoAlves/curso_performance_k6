//Métricar persolnalizadas
import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';


export const options = {
    vus: 1,
    duration: '3s',
};

const chamadas = new Counter('chamadas_realizadas');
const myGauge = new Gauge('meu_gauge');
const myRate = new Rate('meu_rate');
const myTrend = new Trend('meu_trend');

export default function () {
   const req = http.get('https://test.k6.io');
   //contador
    chamadas.add(1);
    //medidor
    myGauge.add(req.timings.blocked)
    //taxa
    myRate.add(req.status === 200);
    //tendencia
    myTrend.add(req.timings.waiting);
}