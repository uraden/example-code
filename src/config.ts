import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'ru', 'uz'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    ru: '/pathnames',
    en: '/en/pathnames',
    uz: '/uz/pathnames'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;