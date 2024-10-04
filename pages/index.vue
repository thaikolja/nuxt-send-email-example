<script lang="ts" setup>
/** Importing ref from Vue to create reactive variables */
import { ref } from 'vue'

/**
 * Reactive variable to store the server response
 *
 * Holds the server's response, including status, message, and success flag,
 * to display feedback to the user after form submission.
 */
const response = ref({
  status:  0,
  message: '',
  success: false
})

/**
 * Tracks if the form is being submitted
 *
 * Used to disable the submit button during submission, preventing multiple submissions
 * and enhancing user experience.
 */
const isSubmitting = ref(false)

/**
 * Handles form submission
 *
 * Collects form data, sends it to the server, and updates the response variable.
 * Ensures the user receives feedback on the success or failure of their email submission.
 */
const sendEmail = async () => {
  isSubmitting.value = true

  // Collect form data
  const formData = new FormData(document.getElementById('form') as HTMLFormElement)
  const data     = Object.fromEntries(formData.entries())

  try {
    // Send a POST request to the server
    const result = await $fetch('/api/email/send', {
      method: 'POST',
      body:   data
    })

    // Update response with server's response
    response.value = {
      status:  result.status,
      message: result.message,
      success: result.success
    }
  } catch (error) {
    // Handle errors during the request
    response.value = {
      status:  500,
      message: error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred',
      success: false
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <aside class="max-w-4xl mx-auto my-12">
    <!-- Header area -->
    <header class="text-center">
      <h1 class="text-6xl font-bold">Nuxt 3 Send E-Mail Example</h1>
    </header>
    <!-- Main area -->
    <main class="">
      <!-- Description -->
      <section id="description" class="my-12 bg-neutral-800 p-6 rounded">
        <p>
          <strong>This is a simplified version of a Nuxt 3 website that uses Node.js to send emails to a pre-defined
            address.</strong> To easier understand the code, a lot of modern features that are usually integrated in
          professional form have been left out on purpose, for example input field validation or better error handling.
          <NuxtLink to="https://tailwindcss.nuxtjs.org/" target="_blank" title="Click here">
            TailwindCSS is used for styling.
          </NuxtLink>
        </p>
        <p class="mt-8">
          As a developer who'd like to learn how to build forms in Nuxt 3 that send emails via the <code>
          <NuxtLink to="https://www.w3schools.com/nodejs/nodejs_email.asp" title="Click here" target="_blank">
            nodemailer
          </NuxtLink>
        </code> package, only two files are handling almost all of the work: <code>/pages/index.vue</code>, which
          provides the front-end, and <code>/server/api/email/send</code>, which is the back-end and responsible for the
          actual email functionality.
        </p>
        <p class="mt-8">
          This is the fully commented version. To download this project without inline comments, you can checkout the
          branch <code>uncommented</code>. You'll find additional resources in the project's <code>README.md</code>.
        </p>
      </section>
      <!-- Form -->
      <form id="form" @submit.prevent="sendEmail" class="flex flex-col space-y-6">
        <!-- Name field -->
        <div class="flex flex-col">
          <label for="user-name" class="font-bold mb-2 text-xl">Name</label>
          <input type="text"
                 name="user_name"
                 id="user-name"
                 placeholder="Enter your full name..."
                 required
                 class="w-full px-2 py-3 rounded text-black"
                 value="August Engelhardt">
          <!-- Default value set for demonstration purposes -->
        </div>
        <!-- Email field -->
        <div class="flex flex-col">
          <label for="user-email" class="font-bold mb-2 text-xl">Email</label>
          <input type="email"
                 name="user_email"
                 id="user-email"
                 placeholder="Enter your email-address..."
                 required
                 class="w-full px-2 py-3 rounded text-black"
                 value="a.engelhardt@gmail.com">
          <!-- Default value set for demonstration purposes -->
        </div>
        <!-- Message field -->
        <div class="flex flex-col">
          <label for="message" class="font-bold mb-2 text-xl">Message</label>
          <textarea id="message"
                    name="message"
                    placeholder="Enter your message..."
                    required
                    class="w-full px-2 py-3 rounded text-black min-h-32">Hello, this is a test message.</textarea>
          <!-- Default value set for demonstration purposes -->
        </div>
        <!-- Submit button -->
        <div class="flex">
          <button type="submit"
                  :disabled="isSubmitting"
                  v-if="response.status === 0"
                  class="bg-red-800 rounded text-xl p-2 font-bold w-1/2 mx-auto text-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
            Send E-Mail
          </button>
        </div>
      </form>
      <!-- Response Display -->
      <div v-if="response.status !== 0" class="mt-4 text-center">
        <p :class="response.success ? 'bg-green-400' : 'text-red-400'"
           class="font-semibold text-xl text-black rounded py-4">
          {{ response.success ? 'Success: The e-mail has been successfully sent.' : 'Error: ' }} {{ response.message }}
        </p>
      </div>
    </main>
    <footer class="text-center border-t mt-8 border-neutral-600 pt-6 text-sm text-neutral-500">
      <p>Made with ♥️ in Bangkok</p>
    </footer>
  </aside>
</template>

<style lang="postcss" scoped>
/** Improved readability for paragraph text */
main {
  #description {
    a {
      @apply text-indigo-400 hover:text-indigo-300 transition;
    }

    p {
      @apply leading-relaxed text-lg text-justify;
    }
  }
}

/** Add hover effect and transition for the submit button */
button[type="submit"] {
  transition: transform 0.2s ease-in-out;
}

button[type="submit"]:hover {
  transform: scale(1.05);
}
</style>
