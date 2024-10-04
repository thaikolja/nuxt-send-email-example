// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	modules:           [
		'@nuxtjs/tailwindcss'
	],
	app:               {
		head: {
			htmlAttrs:     {
				lang: 'en'
			},
			titleTemplate: 'Sending E-Mails with Nuxt 3, Node.js, and Nodemailer',
			meta:          [
				{
					name:    'description',
					content: 'A simplified version of a Nuxt 3 website that uses Node.js and nodemailer to demonstrate hwo' + ' to send emails to a pre-defined address'
				},
				{
					name:    'author',
					content: 'Kolja Nolte'
				}
			]
		}
	}
})
