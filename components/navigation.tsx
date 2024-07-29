'use client';

import { useState } from "react";
import { Menu } from "lucide-react";
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
          <Button
            variant='outline'
            size='sm'
            className="font-normal bg-white/10 hover:bg-white/20 text-white hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition"
          >
            {/* tailwind: size-4 = h-4 w-4 */}
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
              key={route.href}
              variant={route.href === pathname ? 'secondary' : 'ghost'}
              onClick={() => onClick(route.href)}
              className="w-full justify-start"
            >
              {route.label}
            </Button>
            ))}            
          </nav>
        </SheetContent>
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