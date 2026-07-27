export const publicRoutes = {
  auth: {
    signIn: () => 
      `/auth/sign-in`,
    verify: () => 
      `/auth/verify`,
    signOut: () => 
      `/auth/after-sign-out`,
  },
  home: () => `/`,
} as const;
