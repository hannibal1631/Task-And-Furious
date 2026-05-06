import { v4 as uuid4 } from "uuid";

export const generateToken = (): string => {
  return uuid4().replace(/-/g, "");
};
