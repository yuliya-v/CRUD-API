import { User } from "../models/UsersModel";

export const isNewDataValid = (data: Omit<User, 'id'>) => {
  if (typeof data.username !== 'string'
    || !data.username.trim().length
    || typeof data.age !== 'number'
    || !(data.hobbies instanceof Array)
    || !(data.hobbies.every(el => typeof el === 'string'))
  ) return false;
  return true;
};