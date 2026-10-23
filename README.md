# Asif-Dev Portfolio

Professional portfolio website for **Asif Khan**, a frontend developer and
UI/UX designer based in Islamabad, Pakistan.

The site presents selected projects, services, work process, client
testimonials, contact details, an Islamabad location map, and an AI assistant
that answers questions about Asif's skills and experience.

## Live Website

- Portfolio: [asifkhan.dev](https://asifkhan.dev/)
- AI assistant: [asif-chatbot.vercel.app](https://asif-chatbot.vercel.app/)

## Highlights

- Responsive portfolio experience for mobile, tablet, and desktop
- Project showcase with live website links
- Accessible semantic content structure and descriptive image text
- SEO metadata, Open Graph/Twitter sharing metadata, sitemap, and robots file
- Responsive Islamabad Google Maps section
- Contact form and WhatsApp contact actions
- AI assistant powered by the Groq API
- Downloadable CV

## Technology

- React 19
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- Framer Motion
- Swiper
- Font Awesome and React Icons
- Express
- Groq API
- Vercel

## Getting Started

### Requirements

- Node.js 18 or newer
- npm
- A Groq API key for the AI assistant

### Installation

```bash
git clone https://github.com/asifkhan-io/My-Portfolio.git
cd My-Portfolio
npm install
```

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Never commit `.env` or `.env.local` files. They are ignored by Git.

### Development

```bash
npm run dev
```

This starts the Vite frontend and the Express API server together.

### Other scripts

```bash
npm run dev:web   # Start only the Vite frontend
npm run server    # Start only the Express API server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Project Structure

```text
src/
├── components/
│   ├── AI-assistant/       # AI chat interface
│   ├── common/             # Navigation, footer, map, and shared UI
│   ├── contact/            # Contact form and contact details
│   ├── portfolio/          # Project data and project cards
│   └── ...
├── pages/                  # Page-level components
├── layouts/                # Shared application layouts
└── assets/                 # Images and visual assets

api/                        # Vercel serverless API handlers
lib/                        # Shared Groq chat logic
public/                     # Static files, CV, sitemap, and robots.txt
```

## Deployment

The project is configured for Vercel. Add the following environment variables
to the Vercel project before deploying:

- `GROQ_API_KEY`
- `GROQ_MODEL` (optional)
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Build the project locally before deployment:

```bash
npm run build
```

## Contact

- Email: [asifk.code@gmail.com](mailto:asifk.code@gmail.com)
- WhatsApp: [+92 335 9763990](https://wa.me/923359763990)
- Location: Islamabad, Pakistan

## License

This project is maintained by Asif Khan. Contact the author before reusing
portfolio content, branding, or personal assets.
