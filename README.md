# Coffee Shop Landing Page

A modern, scroll-based, immersive landing page for a specialty coffee shop website inspired by emergenceprojects.com.

## Features

- Interactive 3D coffee cup that animates on scroll using Three.js
- Scroll-triggered animations with GSAP and Framer Motion
- Parallax effects and smooth transitions
- Responsive design with Tailwind CSS
- Modern, minimalist aesthetic with warm color palette

## Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **3D Rendering**: Three.js with React Three Fiber and Drei
- **Animations**: GSAP, Framer Motion
- **Scroll Interactions**: React Intersection Observer

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coffee-shop.git
cd coffee-shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
coffee-shop/
├── public/              # Static assets
│   └── images/          # Image assets
├── src/
│   ├── assets/          # Project assets
│   ├── components/      # Reusable components
│   │   └── 3D/          # 3D components
│   ├── sections/        # Page sections
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── .github/             # GitHub specific files
├── package.json         # Dependencies and scripts
└── tailwind.config.js   # Tailwind configuration
```

## Adding Images

For this project, you'll need to add your own images to the `/public/images` directory:

- coffee-cup.glb (3D model)
- coffee-beans.jpg
- coffee-bag.jpg
- coffee-pattern.png
- coffee-placeholder.jpg
- wood-texture.jpg

## Customization

- Colors and typography can be adjusted in the `tailwind.config.js` file
- To modify animations, check the respective section components and the 3D model files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from [emergenceprojects.com](https://emergenceprojects.com)
- 3D models and textures from various sources (add specific credits as needed)
