# NextCommerce

A modern e-commerce application built with Next.js, featuring a responsive design, dark/light mode, and ready for Supabase integration.

## Features

- 🎨 Modern UI with responsive design
- 🌓 Light/Dark/System theme modes
- 🛒 Product listing and details
- 🔍 Category filtering
- 🛍️ Shopping cart functionality
- 👤 User account management
- 📱 Mobile-friendly interface
- 🔄 Ready for Supabase backend integration

## Tech Stack

- **Framework**: Next.js 15+
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Theme**: next-themes
- **Future Backend**: Supabase

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-commerce.git
   cd next-commerce
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
next-commerce/
├── src/
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI components
│   └── lib/                  # Utility functions and data
│       ├── data/             # Dummy data
│       └── utils.ts          # Helper functions
├── public/                   # Static assets
└── ...config files
```

## Future Improvements

- Supabase integration for authentication and database
- Product search functionality
- Wishlist management
- Order processing
- Payment integration
- Admin dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) for the demo images
