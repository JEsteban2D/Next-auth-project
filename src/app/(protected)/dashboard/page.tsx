import React from 'react'
import { auth } from '../../../../auth';
import LogoutButton from '@/app/components/logout-button/LogoutButton';

export default async function DashboardPage() {
const session = await auth();

  if (!session) {
    return <div> Not Authenticated</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton/>
    </div>
  );
}
