import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { menu } from "./config";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-background dark:border-foreground/10">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          {/* 無障礙描述 */}
          <SheetDescription className="sr-only">
            網站導航選單，包含各頁面的連結和功能選項
          </SheetDescription>
        </SheetHeader>

        <div className="mt-1 text-base space-y-4">
          <div className="flex flex-col gap-0">
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col"
            >
              {menu.map((item) => {
                if (item.items) {
                  return (
                    <AccordionItem key={item.title} value={item.title} className="border-b border-border">
                      <AccordionTrigger className="text-md px-3 py-4 font-semibold hover:no-underline">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-4">
                        {item.items.map((subItem) => (
                          <Link key={subItem.title} href={subItem.url} className="flex items-center gap-2 py-2 ml-4">
                            {subItem.icon && (
                              <Image 
                                src={subItem.icon} 
                                alt={subItem.title}
                                width={20} 
                                height="auto" 
                                className="mr-2" 
                              />
                            )}
                            {subItem.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
                return (
                  <div key={item.title} className="border-b border-border">
                    <Link href={item.url} className="flex items-center px-3 py-4 text-md font-semibold">
                      {item.title}
                    </Link>
                  </div>
                );
              })}
            </Accordion>

            <div className="flex items-center justify-between px-3 py-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
