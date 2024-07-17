'use client';

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
// added at 1:33:20/ npm install react-use
import { useMedia } from 'react-use';

import { NavButton } from "@/components/nav-button";
// added at 1:32:30 for mobile version/ npx shadcn-ui@latest add sheet
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from "@/components/ui/button";

const routes = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/settings',
    label: 'Settings',
  },
];

export const Navigation = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia('(max-width: 1024px)', false)

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button>

          </Button>
        </SheetTrigger>
      </Sheet>
    )
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};