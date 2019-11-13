## Installation
In order to use checkout with [BigCommerce SDK](https://github.com/bigcommerce/checkout-sdk-js) you need to go through additional steps described below:

### BigCommerce
Setup [Stencil](https://developer.bigcommerce.com/stencil-docs), local development platform:

1) You will need to have an authentication token to use the Stencil CLI. See [Getting API Credentials API](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials)

2) Prepare your environment. See [Prerequisites by OS](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil#installing_prerequisites)

- Stencil requires the Node.js runtime environment, version 6.x or later. We have tested Stencil on **version 6.4.0**. We recommend that you install or update Node.js using [nvm](https://github.com/creationix/nvm#installation).

3) Stencil CLI setup. See [Install Stencil CLI](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil#installing_installing-the-stencil-cli)

4) Theme setup. See [Cloning Cornerstone Repo](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil#installing_cloning-cornerstone)

- Make sure to save credentials you received from Step 1 into ```.stencil``` file. Example config:


```
{
  "normalStoreUrl": "https://test1832.mybigcommerce.com",
  "port": 3000,
  "clientId": "a71k1n50mzh8s5st9lakdobz51ephn1",
  "accessToken": "78iapt6n507f1mtact0ruejhk175g0v",
  "customLayouts": {
    "brand": {},
    "category": {},
    "page": {},
    "product": {}
  }
}
```

5) Dependencies setup. See [Installing Stencil CLI JS Dependencies](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities)
