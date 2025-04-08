# Car Finder Application

A modern, responsive web application for browsing and managing car listings, built with React, TypeScript, and Vite.

# Live : https://heavycardhundho.netlify.app
## 🚀 Features

- **Car Listings**: Browse through a comprehensive collection of cars
- **Advanced Filtering**: Filter cars by:
  - Brand
  - Price range
  - Fuel type
  - Search query
- **Sorting**: Sort cars by price (ascending/descending)
- **Wishlist Management**: Save favorite cars to a wishlist
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all device sizes
- **Image Handling**: Fallback images and lazy loading for optimal performance
- **Pagination**: Browse through multiple pages of car listings

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: 
  - TailwindCSS 4
  - Custom animations
  - Responsive design
- **Form Handling**: React Hook Form 7
- **Validation**: Zod
- **Routing**: React Router DOM 7
- **Development Tools**:
  - ESLint
  - TypeScript ESLint
  - Prettier

## 📁 Project Structure

```
car-finder/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CarCard.tsx
│   │   ├── Filters.tsx
│   │   └── Pagination.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useWishlist.ts
│   ├── services/           # API and business logic
│   │   └── carService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── car.ts
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-finder.git
cd car-finder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

### TypeScript Configuration

The project includes two TypeScript configuration files:
- `tsconfig.app.json`: Application-specific configuration
- `tsconfig.node.json`: Node.js-specific configuration

### ESLint Configuration

ESLint is configured with:
- React-specific rules
- TypeScript support
- Strict type checking

## 🎨 Styling

The project uses TailwindCSS for styling with:
- Custom theme configuration
- Dark mode support
- Custom animations
- Responsive design utilities

## 🔍 Features in Detail

### Car Filtering
- Text search across brand and model
- Brand selection dropdown
- Price range filters
- Fuel type selection

### Wishlist
- Persistent storage using localStorage
- Add/remove cars from wishlist
- Dedicated wishlist view

### Dark Mode
- System preference detection
- Manual toggle option
- Persistent user preference

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Car images from Unsplash
- Icons and design inspiration from various sources
