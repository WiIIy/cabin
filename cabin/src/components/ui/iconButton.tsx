import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
interface ImageButtonProps {
  src: string;
  alt: string;
  text: string;
  className?: string;
  id?: string;
}

export const ButtonWithIcon :React.FC<ImageButtonProps> = ({ src, alt, text, className, id}) => {
  return (
    <Button variant="link" size="lg" className={`flex-col text-(length:--font-size-normal) content-between ${className}`} id={id}>
       <Image src={src} className=" " width={100} height={100} alt={alt}></Image> {text}
    </Button>
  )
}
