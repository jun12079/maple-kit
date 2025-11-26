import Image from "next/image";
import Link from "next/link";
import { logo } from "./config";

export const Logo = () => (
  <Link href={logo.url} className="flex items-center space-x-2">
    <Image
      src={logo.src}
      alt={logo.alt}
      width={32}
    />
    <span className="font-heading text-xl font-semibold">
      {logo.title}
    </span>
  </Link>
);
