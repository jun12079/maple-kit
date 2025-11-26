import { Logo } from "@/components/navbar/logo";
import { NavMenu } from "@/components/navbar/nav-menu";
import { NavigationSheet } from "@/components/navbar/navigation-sheet";
import { ModeToggle } from "@/components/navbar/mode-toggle";

const Header = () => {
  return (
    <nav className="h-16 border-b shadow-sm bg-muted">
      <div className="h-full flex items-center justify-between mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
