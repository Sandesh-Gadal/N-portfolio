import emailjs from '@emailjs/browser';

// Define the shape of our response
interface EmailResponse {
  success: boolean;
  response?: any;
  error?: any;
}

// Configuration from .env file
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends an email using EmailJS
 * @param {HTMLFormElement} formElement - The ref current value of the form
 */
export const sendContactEmail = async (formElement : HTMLFormElement) => {
  try {
    const response = await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      formElement,
      PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};