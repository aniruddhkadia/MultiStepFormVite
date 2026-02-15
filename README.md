# React Multi-Step Form

A small Vite + React + TypeScript project that demonstrates a reusable multi-step form component with validation-ready UI primitives.

## Features

- Lightweight multi-step form flow implemented with a custom hook
- Small, composable UI components (inputs, buttons, card)
- Vite for fast dev experience and TypeScript for type safety

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Project Structure (key files)

- `index.html` — app entry
- `src/main.tsx` — React entry
- `src/App.tsx` — top-level app component
- `src/hooks/use-multi-step-form.tsx` — multi-step form hook and logic
- `src/components/multi-step-form.tsx` — form container and orchestration
- `src/components/steps.tsx` — step definitions
- `src/components/ui/` — small UI primitives (`button.tsx`, `input.tsx`, `card.tsx`, `label.tsx`, `select.tsx`)

## Development Notes

- The multi-step behavior is implemented in the `use-multi-step-form` hook. To add or reorder steps, edit `src/components/steps.tsx` and adjust the step components.
- Validation is intentionally left flexible — integrate your preferred validation library (e.g., `zod`, `yup`, `react-hook-form`) inside each step component.

## Email (EmailJS) integration

- This project can send submitted form data to an admin email using EmailJS (client-side). On form submission the app sends the collected fields to the admin and the user receives a thank-you message (email) from the admin/template.
- Configure EmailJS by creating a service, email template, and obtain your Public Key (previously called User ID). In the template you can reference variables like `user_name`, `user_email`, `message`, etc.

### Recommended env variables

Add these to your environment (Vite expects `VITE_` prefixed vars) or a secure secrets manager:

- `VITE_EMAILJS_SERVICE_ID` — your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` — your EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` — your EmailJS public key

Example `.env` (root of project):

```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_xxx
```

### Where to integrate

- Add the EmailJS send call in the submit handler inside the form container — typically `src/components/multi-step-form.tsx` or the final step component in `src/components/steps.tsx`.
- Use the `emailjs` SDK (install with `npm install @emailjs/browser`) and call `emailjs.send` or `emailjs.sendForm` with your service/template/public key.

### Minimal usage example (client-side)

```ts
import emailjs from '@emailjs/browser'

const sendForm = async (formData) => {
	await emailjs.send(
		import.meta.env.VITE_EMAILJS_SERVICE_ID,
		import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
		{
			user_name: formData.name,
			user_email: formData.email,
			message: formData.message,
			// add other fields as needed
		},
		import.meta.env.VITE_EMAILJS_PUBLIC_KEY
	)
}
```

### Behavior expected in this project

- Admin receives an email with the form fields submitted by the user (via the configured EmailJS template).
- The user receives a thank-you message from the admin (implemented as part of the template or a separate EmailJS send to the user's email). Optionally you can send two separate emails: one to the admin and one to the user.

### Security note

- EmailJS public keys are fine for client-side usage, but do not put any sensitive server-only secrets in frontend code. For higher security or server-side control, proxy the request through a backend that stores secrets.

## Contributing

Contributions are welcome. Open PRs or issues for bugs and feature requests.

## License

This project does not include a license file. Add one if you plan to publish the code.
# React + TypeScript + Vite

