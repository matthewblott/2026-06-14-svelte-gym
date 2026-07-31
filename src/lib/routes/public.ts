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
  info: () => `/info`,
  privacy: () => `/privacy`,
  terms: () => `/terms`,
} as const;
