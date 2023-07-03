import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

export const isIdValid = (id: string): boolean => {
  return uuidValidate(id);
};

export const isBodyValid = (res: ServerResponse, body: string): boolean | void => {
  try {
    const bodyObj = JSON.parse(body);
    const isUsernameValid = typeof bodyObj.username === 'string';
    const isAgeValid = typeof bodyObj.age === 'number' && bodyObj.age > 0;

    const areHobbiesValid = Array.isArray(bodyObj.hobbies);

    const isHobbyString = () => {
      if (bodyObj.hobbies.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return bodyObj.hobbies.every((item: any) => typeof item === 'string');
      } else {
        return true;
      }
    };
    const isEnoughFields = Object.keys(bodyObj).length === 3;

    return isUsernameValid && isAgeValid && areHobbiesValid && isHobbyString() && isEnoughFields;
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Sorry, body doesn't contain required fields or their format is incorrect` }));
  }
};
