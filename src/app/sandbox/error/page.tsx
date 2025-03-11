// app/throw-error/page.tsx
export default function ThrowErrorPage() {
  // Secara sengaja melempar error saat render
  throw new Error('Intentional error for testing internal server error page.');
  // return tidak akan pernah tercapai
  return <div>This wont render.</div>;
}
