
import { genSalt, hash, compare } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassoword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);


  return await hash(password, saltGenerated);
};
const verifyPassoword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassoword,
  verifyPassoword
};