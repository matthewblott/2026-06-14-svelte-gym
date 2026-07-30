export const publicRoutes = {
  auth: {
    index: () =>
      `/auth`,
    signIn: () => 
      `/auth/sign-in`,
    verify: () => 
      `/auth/verify`,
  },
  home: () => `/`,
} as const;
