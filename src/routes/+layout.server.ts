import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    isHotwireNative: locals.isHotwireNative,
    isAndroid: locals.isAndroid
  };
};
