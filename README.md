# Nuxt Send Email Example

A simple example project to demonstrate how to use [**Nuxt 3**](https://nuxt.com/), [**Node.js**,](https://nodejs.org/en/download/package-manager/current) and **[Nodemailer](https://www.npmjs.com/package/nodemailer)** to send emails via a form. This is the first version of this example project, with more thorough explanations to come. A comment-free version will be uploaded to the `uncommented` branch shortly.

![screenshot-2024-10-04-gKm1jprv@2x](https://raw.githubusercontent.com/thaikolja/assets/main/markdown/a829a224660b5b7417e4460408bdb866.png)

## Features

- **Nuxt 3 Integration**: Utilizes Nuxt 3 for building a modern web application.
- **Email Sending**: Uses the Node.js package `nodemailer` to send emails from the server side.
- **Tailwind CSS**: Styled with Tailwind CSS for a modern and responsive design.
- **Form Handling**: Demonstrates form submission and server-side processing.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thaikolja/nuxt-send-email-example.git
   cd nuxt-send-email-example
   ```

2. **Install dependencies** listed in `package.json`:
   
   ```bash
   yarn install # or bun i; or npm i
   ```
   
3. **Set your outgoing email server credentials**:
   
   - Google Mail
     - [Create an "App Password"](https://myaccount.google.com/apppasswords)
     - Go to `/server/api/mail/send.post.ts` and change `user` and `pass` on lines 145 and 145, respectively 
   - Other Providers
     - Open the same `send.post.ts` and enter your email account login details
     - Instead of `provider`, use `host` to define your hostname (i.e., `mail.website.com`)
     - `port` may have to be added below `service` and `secure` switched to `false` for some servers with invalid certificates.

## Usage

1. To run the project locally, use the following command:

```bash
yarn dev # or bun dev; or npm run dev
```

2. This will start the Nuxt development server. You can access the application at [`http://localhost:3000`](`http://localhost:3000`).

3. Then, fill out the form and click "Send E-Mail" to immediately receive an email to the target (`to` address).

## Configuration

The project uses a basic configuration setup:

- **[Nuxt Config](https://nuxt.com/docs/api/nuxt-config)**: Located in `nuxt.config.ts`, it sets up Tailwind CSS and basic meta tags.
- **Email Sending**: Configured in `server/api/email/send.post.ts` using `nodemailer`.

## Contribution

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request. 

# Author

* **Kolja Nolte** <kolja.nolte@gmail.com>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Nuxt.js**: For providing a powerful framework for building Vue.js applications.
- **Nodemailer**: For simplifying email sending in Node.js.
- **Tailwind CSS**: For offering a utility-first approach to styling.
