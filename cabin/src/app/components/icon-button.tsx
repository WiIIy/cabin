import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ImageButtonProps {
  src: string; // The source URL for the image. Required.
  alt: string; // The alt text for the image, important for accessibility. Required.
  href: string; // The URL the button should navigate to. Required.
  className?: string;
  imageClassName?: string; 
  children?: React.ReactNode; // Optional children to render inside the button (e.g., text overlay).
}

/**
 * ImageButton Component
 * A reusable React component that displays an image as a clickable button,
 * navigating to a specified link. It leverages Next.js's Image and Link
 * components for optimized image loading and client-side routing.
 *
 * @param {ImageButtonProps} props - The component's props, typed with ImageButtonProps.
 */
export const ImageButton: React.FC<ImageButtonProps> = ({ src, alt, href, className = "", imageClassName = "", children }) => {
  // Ensure required props are provided (though TypeScript already enforces this at compile time,
  // this runtime check can be useful for debugging or if props are dynamic).
  if (!src || !alt || !href) {
    console.error("ImageButton: 'src', 'alt', and 'href' props are required.");
    return null; // Or render a fallback UI
  }

  return (
    // The Link component wraps the image, making the entire image clickable.
    // It will render an <a> tag by default.
    <Link
      href={href}
      className={`
        relative block overflow-hidden rounded-lg shadow-md
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-offset-2 hover:ring-accent-light
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light
        ${className}
      `}
    >
      {/* Next.js Image component for optimized images */}
      <Image
        src={src}
        alt={alt}
        layout="responsive" // Ensures the image scales within its parent
        width={500} // Provide a default width (aspect ratio will be maintained by layout="responsive")
        height={300} // Provide a default height
        objectFit="cover" // Ensures the image covers the area without distortion
        className={`w-full h-full ${imageClassName}`} // Apply image-specific classes
      />
      {/* Optional children for text overlay or other content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-30 text-white text-lg font-bold opacity-0 transition-opacity duration-300 hover:opacity-100">
          {children}
        </div>
      )}
    </Link>
  );
};

export default ImageButton;