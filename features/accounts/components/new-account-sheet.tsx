// created ate 2:55:30; npx shadcn-ui@latest add form; npx shadcn-ui@latest add input

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { AccountForm } from '@/features/accounts/components/account-form';
import { insertAccountSchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  // added at 3:02:25
  const { isOpen, onClose } = useNewAccount();
  // added at 3:26:16
  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

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
        {/* added at 3:15:00 */}
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

// next step (2:57:04) create \providers\sheet-provider.tsx
// next step, after adding const { isOpen, onClose } = useNewAccount(); (3:03:18) - go to (dashboard)\page.tsx
// next step, creating form (3:21:25) - go to features\accounts\api and create use-create-accounts.ts