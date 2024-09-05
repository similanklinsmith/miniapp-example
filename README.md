# Mini App Example Project

## Getting Started

The Mini App Example project is a sample project built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) to create a web interface.

### Prerequisites

Before running the Mini App Example, make sure you have the following software installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- Choose one of the following package managers: [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Text editor or IDE (e.g., [Visual Studio Code](https://code.visualstudio.com/))

Also, ensure your environment is properly configured.

### Setting Up the Development Environment

1. **Clone the Example Repository**

   ```bash
   git clone https://github.com/paotang-miniapp/miniapp-example
   cd miniapp-example
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables**
  
   Create a .env file in the root directory of the project and add the following environment variables as shown in .env.example:

   ```bash
    NEXT_PUBLIC_APP_ENV=local
    NEXT_PUBLIC_THREE_LEGGED_CLIENT_ID=     # 3 legged client id value from oapi portal
    NEXT_PUBLIC_AUTHENTICATION_SCOPE=       # authentication scope from oapi portal sparated by '+', example: openid+offline

    MINIAPP_UUID=                           # miniapp uuid value from miniapp portal
    TWO_LEGGED_CLIENT_ID=                   # 2 legged client id value from oapi portal
    TWO_LEGGED_SECRET_KEY=                  # 2 legged secret key value from oapi portal
    THREE_LEGGED_CLIENT_ID=                 # 3 legged client id value from oapi portal
    THREE_LEGGED_SECRET_KEY=                # 3 legged secret key value from oapi portal
    AUTHENTICATION_SCOPE=                   # authentication scope from oapi portal sparated by '+', example: openid+offline
    AUTHENTICATION_REDIRECT_URL=            # redirect url. it must be the same as the authentication redirect url in oapi portal and default destination url in miniapp portal

    URL_EXCHANGE_TOKEN=                     # exchange token full url
    URL_GET_CUSTOMER_PROFILE=               # get customer profile full url
    URL_PAYMENT_GET_TOKEN=                  # payment get token full url        
    URL_PAYMENT_DEEPLINK=                   # payment deeplink full url
    URL_PAYMENT_INQUIRY_TRANSACTION_URL=    # payment inquiry transaction full url

    PAYMENT_TXN_CONFIG_COMP_CODE=           # company code value from oapi portal in merchant configuration
    PAYMENT_TXN_CONFIG_DEEPLINK_URL=        # deeplink url for return to app after payment completed
   ```

4. **Run the Mini App Example**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **View Your Application**

   Visit [http://localhost:3000](http://localhost:3000) to view your application.

   ![login](./instruction/screen/1.png)

----

### Project Structure

This project is divided into two main parts: Frontend and Backend.

1. The Frontend is located in the `src/app` folder (excluding `src/app/api`).
2. The Backend is located in the `src/app/api` folder, which includes examples of API usage.

### Starting to Develop

To start developing your Mini App, navigate to the `src/app` folder and begin editing the files within it. It’s recommended to start with the `src/app/page.tsx` file, which serves as the main file for your Mini App's web page. This file already contains examples of using the JS Bridge, enabling you to start developing your Mini App immediately.

### Integrate with OAPI Services using Provided Functions

In this project, we have prepared functions for working with OAPI Services. These functions are located in the `src/lib/frontend/index.ts` file and include:

make sure to configure the environment variables in the .env file before using these functions.

#### Authentication service

1. `initAuthAndExchangeToken` - Calls jsbridge `initAuth` with clientId and scope values from environment variables, and sends an API request to OAPI Services to exchange the token.
2. `getCustomerProfileWithAccessToken` - Retrieves the customer profile using the access token obtained from the token exchange with PT Pass.

#### Payment service

1. `generateDeeplinkAndOpenPwP` - Get access token and initialize payment transaction and opens the payment flow for completing the transaction.
2. `inquiryTransaction` - Get access token and inquiry the transaction status using the txnRefId

These functions will invoke the APIs within this project, located in the `src/app/api` folder. Examples of API usage are provided and can be modified as needed. Additionally, we provide backend functions for integrating with OAPI services in the `src/lib/backend` folder, You can use these functions with your own services.

### Easy Way to Deploy Your Mini App to Vercel

Deploying your Mini App to Vercel is simple and quick. Just follow these steps:

1. **Login to Vercel**
   - Visit [Vercel](https://vercel.com/) and log in to your account.

   ![login](./instruction/deploy-to-vercel/1.png)

2. **Add a New Project**
   - Click on the "Add New" button.
   - Then click on the "Project" button to start a new project.

   ![add new](./instruction/deploy-to-vercel/2.png)

3. **Select Your Repository**
   - Choose the repository. You can select from GitHub, GitLab, or Bitbucket.
   - Click on "Import" to proceed.

   ![select repository](./instruction/deploy-to-vercel/3.png)

4. **Configure Your Project**
   - Verify and configure your project settings.
   - Add the environment variables from your `.env` file. In "Environment Variables", click on "Add" to add each variable.
   - Ensure all the settings are correct, then click "Deploy" to initiate the deployment.

   ![config](./instruction/deploy-to-vercel/4.png)

5. **View Your Deployed Mini App**
   - After deployment, click on the provided "Domains" URL to view your app.

   ![dashboard](./instruction/deploy-to-vercel/5.png)

By following these steps, you can easily deploy your Mini App to Vercel and make it accessible to users. For more detailed information on deploying projects to Vercel, visit the [Vercel Documentation](https://vercel.com/docs).
