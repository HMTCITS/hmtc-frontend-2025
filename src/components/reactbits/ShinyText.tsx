import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  // Use CSS variable for duration so globals helper can pick it up
  const style: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    // let the helper class animate using --shine-duration
    ['--shine-duration' as any]: `${speed}s`,
  };

  return (
    <div
      className={`inline-block bg-clip-text ${disabled ? '' : 'animate-shine'} ${className}`}
      style={style}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
