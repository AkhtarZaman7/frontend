export const APP_NAME = 'NOORO';
export const DEFAULT_COLOR = '#000000';

export const TRANSITIONS = {
  DEFAULT: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
  SPRING: {
    type: 'spring',
    bounce: 0.2,
  },
} as const;

export const ROUTES = {
  HOME: '/',
  NEW_TASK: '/tasks/new',
  EDIT_TASK: (id: string) => `/tasks/${id}/edit`,
} as const; 