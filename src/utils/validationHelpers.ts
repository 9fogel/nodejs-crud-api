import { validate as uuidValidate } from 'uuid';

export const isIdValid = (id: string) => {
  return uuidValidate(id);
};
