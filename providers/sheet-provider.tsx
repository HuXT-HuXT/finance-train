// created 2:57:09
'use client';

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
// added at 4:37:22
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";

export const SheetProvider = () => {
  // this part solves hydration problem 2:59:30
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  )
}

// next step (~3:00:00) - npm i zustand, then create \features\accounts\hooks\use-new-accounts.ts
// next step after adding EditAccountSheet (4:37:49) - edit app\(dashboard)\accounts\columns.tsx