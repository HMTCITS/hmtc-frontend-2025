'use client';

import React from 'react';

import ClientContent from './ClientContent';

/**
 * Render the client content for the hidden page.
 *
 * NOTE: middleware performs the authoritative schedule gating for this route.
 * This page intentionally does not perform an additional server-side fetch to
 * avoid duplicate requests and to rely on middleware for access control.
 */
export default function Page() {
  return <ClientContent />;
}
