// 1. Inicialização
import sleep from 'k6';

//2. Configuração
export const options = {
  vus: 10, // número de usuários virtuais
  duration: '30s', // duração do teste
};

//3. execução //código vu
export default function () {
    console.log('Iniciando o teste de carga com k6');
    sleep(1);
}

//4. desmontagem
export function teardown(data) {
    console.log(data);
}