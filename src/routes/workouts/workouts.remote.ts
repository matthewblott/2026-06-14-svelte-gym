import { form, query } from '$app/server';
import { db } from '$lib/server/db'
import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import type { Workout } from '$lib/schema'

// export const getWorkouts = query(() => {
//   const sql = 'select * from workouts';
//   return db.query(sql).all() as Workout[];
// });
//
// export const getWorkoutById = query(v.number(), (id) => {
//   const sql = 'select * from workouts where id = $id';
//   return db.query(sql).get({ $id: id }) as Workout
// });
//
// export const createWorkout = form(v.object({
//   name: v.string()
// }),
// ({ name }) => {
//   const sql = 'insert into workouts (name) values ($name)';
//   db.query(sql).run({ $name: name });
//   redirect(303, '/workouts'); 
// });
