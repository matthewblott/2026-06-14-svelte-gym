export const publicRoutes = {
  auth: {
    signIn: () => 
      `/auth/sign-in`,
    verify: () => 
      `/auth/verify`,
    afterSignOut: () => 
      `/auth/after-sign-out`,
  },
  home: () => `/`,
} as const;
