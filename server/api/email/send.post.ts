/**
 * YOU CAN VIEW THIS FILE WITHOUT THE COMMENTS UNDER THIS LINK:
 * @link https://github.com/thaikolja/nuxt-node-email/blob/uncommented/server/api/email/send.post.ts
 *
 * This is the file where the email sending process is done. We're now not on the front-end anymore but on the
 * back-end, which communicates with the server (in this case, Node.js), because only servers can send emails since
 * they're not client-side. This file also only accepts POST requests, which we have to keep in mind int the
 * front-end form.
 *
 * The process is very easy, as you can see below, and there are many alternative ways of doing this. But this is
 * the default method and, in my opinion, the easiest. We will do the following:
 *
 * 1. Import necessary packages
 * 2. Within the Nuxt handler function, we read what data was sent from the form
 * 3. We check if the data is valid (in this example, only if it exists)
 * 4. Declare two constants that will be the parameters the sending function will need.
 * 5. We (try to) send the email.
 * 6. We return the result so our front-end can see if it was successful or not.
 *
 * @author Kolja Nolte / thaikolja <kolja.nolte@gmail.com>
 * @version 1.0.0
 */

/** This import is not mandatory because it's auto-imported, but it's useful because it gives your IDE hints for
 *  autocompletion, type hinting, and so on.
 */
import { defineEventHandler } from '#imports'

/**
 * We use this import so that we can create a mutable object that we can change anytime, i.e. changing the value of the
 * object. This is useful because we can change the response object anytime, and we only have one return statement at
 * the end of the function, which makes debugging a lot easier.
 */
import { ref }                from 'vue'

/**
 * We need to install (e.g., `npm install nodemailer`) this package to send emails. It's a very popular package and
 * works well. You can also use other packages, but this one is the easiest to use in my opinion.
 */
import nodemailer             from 'nodemailer'

/**
 * This function tells Nuxt how to handle this API request. Make sure you're using `async`. This function MUST
 * return an OBJECT, not an array, string, or anything else.
 */
export default defineEventHandler(async (event) => {
	/**
	 *  This constant will contain the data that we've sent from the front-end
	 *  (index.vue) form. The format must be JSON. `readBody()` must be `await`ed because it's an asynchronous function.
	 */
	const formData = await readBody(event)

	/**
	 * This constant will contain the structure of the response as well as the default values that we'll send back to the
	 * front-end. It's a good idea to have a structure; in case of an errorMessage, our front-end won't scream
	 * "Undefined variable". Instead, it'll know what went wrong and can act upon it (e.g., show an error message).
	 *
	 * The default response here indicates a server errorMessage. We'll adjust the values based on the result.
	 *
	 * We use Vue.js' `ref()` function to create a reactive object so we can change its values anytime.
	 *
	 * A better way to do this is by using TypeScript and defining a "type" or "interface" for the response object. This
	 * way, you can  ensure that the response object is always in the correct format (= always has the same keys).
	 *
	 * @link https://www.typescriptlang.org/docs/handbook/2/objects.html
	 */
	const response        = ref()
	const defaultResponse = {
		status:  200,
		message: '',
		success: true
	}

	/**
	 * For now, we set the response to the default response. If the email sending process is successful, we'll change
	 * the response object accordingly. See this as a kind of "fallback" in case something goes wrong. Don't forget to
	 * reassign reactive objects with `response.value = ...` instead of `response = ...`.
	 */
	response.value = defaultResponse

	/**
	 * Here, we're checking if the data that was sent from the front-end is valid. NPM packages like Zod are great for
	 * this and offer a lot of features. In this example, we're only checking if the fields are empty. See the link to
	 * learn how to use Zod (it's easy). This can also be automized to avoid repeating code like here.
	 *
	 * @link https://zod.dev/?id=basic-usage
	 */
	if (formData) {
		/** Check if the "Name" input field is empty */
		if (!formData['user_name']) {
			response.value = {
				status:  400,
				message: 'The \"Name\" field is empty',
				success: false
			}
			/** Check if the "E-Mail" input field */
		} else if (!formData['user_email']) {
			response.value = {
				status:  400,
				message: 'The \"E-Mail\" field is empty',
				success: false
			}
			/** Check if the "Message" input field */
		} else if (!formData['message']) {
			response.value = {
				status:  400,
				message: 'No message was sent',
				success: false
			}
		}
		/** If no data was sent at all */
	} else {
		response.value = {
			status:  400,
			message: 'No data was sent',
			success: false
		}
	}

	/**
	 * If at this point we already have problems with what (or what not) was entered in the input fields, we can
	 * straight away shut down here and return an related message (note that `return` stops the function).
	 */
	if (response.value.status !== 200) {
		return {
			status:  400,
			message: 'Invalid input',
			success: false
		}
	}

	/**
	 * The `transporter` constant is like the main config that we'll use to send emails with.
	 * If you use `service: gmail`, you won't have to enter the `hostname` key. Important for Google Mail: DO NOT
	 * enter your Google password. Instead, create an "Application Specific" password under this link. It'll look like
	 * the example.
	 *
	 * @example   kqrl jdma kqry jdms
	 * @link      https://security.google.com/settings/security/apppasswords
	 */
	const transporter = nodemailer.createTransport({
		service: 'gmail', // For other servers, use the SMTP's hostname via `host: ...`
		secure:  true, // Depending on your host, you might need to set this to `false`
		auth:    {
			user: 'kolja.nolte@gmail.com',
			pass: 'lgrh svho kqrl jdma'
		}
	})

	/**
	 * Here, we're setting the header and content, i.e. the subject line and so on. We save it in a constant because it'll
	 * look less messy in the next step.
	 */
	const fields = {
		from:    'peter.pan@disney.com',
		to:      'user@website.com',
		subject: 'Nuxt + Node.js Test E-Mail',
		text:    formData['message']
	}

	/**
	 * We're calling the `sendMail` method which will exactly do that: send the email. It's always a good idea to have
	 * errorMessage validation in case something goes wrong so it can communicate this to the front-end ("E-Mail could
	 * not be sent" or something like this).
	 */
	transporter.sendMail(fields, function (error) {
		/** Let's try to send the email */
		if (error) {
			/** Oh fuck, an error... Let's change the response so our front-end knows about this and add the details */
			response.value = {
				status:  500,
				message: error.message,
				success: false
			}
		} else {
			/** Everything went well 😎. We'll change the response so our front-end gets that information and can use it */
			response.value = {
				status:  200,
				message: 'E-Mail sent successfully',
				success: true
			}
		}
	})

	/**
	 * That's already it from the back-end point of view. Of course, we can improve this process much more, for
	 * example by using Zod to validate the fields, or formatting the output, or recording the (successful) sending of
	 * the message into a database. But this is the barebones version that should send an email you have entered in
	 * the `fields: { to: "..." }` value a few lines above.
	 */

	/**
	 * We return the response object so our front-end knows what happened. From the front-end, we can then display:
	 * `status`:  (int):      The HTTP status code (200 = OK, 500 = Internal server error, ...)
	 * `message`: (string):   A message that can be displayed to the user
	 * `success`: (bool):     Whether the email was sent successfully or not
	 */
	return response.value
})
