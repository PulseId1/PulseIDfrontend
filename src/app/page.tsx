import { APP_NAME, APP_DESCRIPTION, LAUNCH_DATE } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-xl space-y-4">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Phase 1 Complete — Foundation &amp; Architecture
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {APP_NAME}
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {APP_DESCRIPTION}
        </p>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
          Target Launch: {LAUNCH_DATE}
        </p>
      </div>
    </main>
  );
}
