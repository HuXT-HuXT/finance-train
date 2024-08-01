// created 2:57:09
'use client';

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

export const SheetProvider = () => {
  // this part solves hydration problem 2:59:30
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  )
}

// next step (~3:00:00) - npm i zustand, then create \features\accounts\hooks\use-new-accounts.ts