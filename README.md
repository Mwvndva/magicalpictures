# 🎥 Magical Pictures - Professional Videography Studio

A modern, responsive website for a professional videography business, built with cutting-edge web technologies to showcase stunning visual content and provide an exceptional user experience.

![Magical Pictures Banner](./public/banner.jpg)

## ✨ Features

- **Stunning Visuals**
  - High-quality video backgrounds and image galleries
  - Smooth scroll-based animations
  - Interactive portfolio showcase with video previews

- **User Experience**
  - Fully responsive design for all devices
  - Intuitive navigation with smooth scrolling
  - Interactive elements with hover effects
  - Custom cursor sparkle effects

- **Business Features**
  - Online booking system
  - Contact form with validation
  - Social media integration
  - Service showcase with pricing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later) or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/magical-lens-pictures-site.git
   cd magical-lens-pictures-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   The application will be available at `http://localhost:5173`

## 🛠️ Build & Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deployment
This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── lib/              # Utility functions and constants
├── styles/           # Global styles and Tailwind config
└── App.tsx          # Main application component
```

## 🎨 Customization

### Content Updates
- **Text Content**: Edit the respective component files in `src/components/`
- **Images**: Replace images in the `public/` directory
- **Videos**: Update video paths in the relevant components

### Styling
- **Theme Colors**: Modify `tailwind.config.ts` for brand colors
- **Animations**: Adjust Framer Motion animations in component files
- **Responsive Design**: Update breakpoints in `tailwind.config.ts`

### Configuration
- Site metadata can be found in `src/lib/constants.ts`
- API endpoints and environment variables should be configured in `.env`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

---

💡 **Tip**: For the best development experience, we recommend using [VS Code](https://code.visualstudio.com/) with the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)