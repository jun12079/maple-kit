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

interface NavMenuProps {
  className?: string;
}

export const NavMenu = (props: NavMenuProps) => (
  <NavigationMenu {...props} viewport={false}>
    <NavigationMenuList className="gap-1 space-x-0 text-sm">
      {menu.map((group) => {
        if (group.items && group.items.length > 0) {
          return (
            <NavigationMenuItem key={group.title}>
              <NavigationMenuTrigger className="bg-muted">{group.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.url}
                          prefetch={false}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <Image 
                                src={item.icon} 
                                alt={item.title}
                                width={20} 
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
          );
        }

        return (
          <NavigationMenuItem key={group.title}>
            <Button variant="ghost" asChild>
              <Link href={group.url} prefetch={false}>{group.title}</Link>
            </Button>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  </NavigationMenu>
);
