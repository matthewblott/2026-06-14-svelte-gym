import type { PageServerData, PageServerLoad } from "./$types";

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  return { workoutId };
};

