import Link from "next/link";
import { logo } from "./config";

export const Logo = () => (
  <Link href={logo.url} prefetch={false} className="flex flex-row items-center">
    <img
      src={logo.src.src}
      alt={logo.alt}
      width={40}
      height={40}
    />
    <span className="text-xl font-semibold flex items-center h-[40px]">
      {logo.title}
    </span>
  </Link>
);
