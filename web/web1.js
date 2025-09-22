import { browser } from 'k6/browser';
import { sleep, check } from 'k6';

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 3,
            duration: '10s',
            options: {
                browser: {
                    type: 'chromium',
                }
            }
        }
    },
    thresholds: {
        'checks': ['rate == 1.0']
    }
};

export default async function () {
    const page = browser.newPage();

    try{
        await page.goto('https://test.k6.io/my_messages.php');

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        const submition = page.locator('input[type="submit"]');

        await Promise.all([
            submition.click(),
            page.waitForNavigation()
        ]);

        check(page, {
           header: (p) => p.locator('h').textContent == 'Welcome, admin!'
        });

    }finally{
        await page.close();
    
    }
}