// Utility — cn merges class strings (minimal, no tailwind-merge needed for this project)
export function cn(...classes: (string | undefined | null | false | 0)[]) {
  return classes.filter(Boolean).join(' ')
}
