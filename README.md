## Setup (example with coinmarketcap's API)

##### routes.js
```javascript
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const ROUTES = {
    get: [
        '/cryptocurrency/listings/latest',
        '/cryptocurrency/listings/historical',
    ],
    put: [],
    post: [],
    delete: [],
};
const HEADERS = {
    'X-CMC_PRO_API_KEY': '🖕🏽'
};
```

## Usage
```bash
npm run start
```
Then navigate to [localhost:7000/your-endpoint](http://localhost:7000/your-endpoint)
