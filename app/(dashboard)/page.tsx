'use client';

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  // added at 3:03:40
  const { onOpen } = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </div>
  )
}
