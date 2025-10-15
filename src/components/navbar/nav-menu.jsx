"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { menu } from "@/components/navbar/config";

export const NavMenu = (props) => (
  <NavigationMenu {...props} viewport={false}>
    <NavigationMenuList className="gap-1 space-x-0 text-sm">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-muted">{menu[0].title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            {menu[0].items.map((item) => (
              <li key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href={item.url}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <Image 
                          src={item.icon} 
                          alt={item.title}
                          width={20} 
                          height="auto" 
                          className="flex-shrink-0" 
                        />
                      )}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold leading-none whitespace-nowrap">{item.title}</p>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-muted">{menu[1].title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            {menu[1].items.map((menuItem) => (
              <li key={menuItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href={menuItem.url}
                  >
                    <div className="flex items-center gap-3">
                      {menuItem.icon && (
                        <Image 
                          src={menuItem.icon} 
                          alt={menuItem.title}
                          width={20} 
                          height="auto" 
                          className="flex-shrink-0" 
                        />
                      )}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold leading-none whitespace-nowrap">{menuItem.title}</p>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button variant="ghost" asChild>
          <Link href="/faq">常見問題</Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);


