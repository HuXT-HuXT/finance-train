// created ate 2:55:30; npx shadcn-ui@latest add form; npx shadcn-ui@latest add input

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

export const NewAccountSheet = () => {
  // added at 3:02:25
  const { isOpen, onClose } = useNewAccount();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>
            New Account
          </SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

// next step (2:57:04) create \providers\sheet-provider.tsx
// next step, after adding const { isOpen, onClose } = useNewAccount(); (3:03:18) - go to (dashboard)\page.tsx