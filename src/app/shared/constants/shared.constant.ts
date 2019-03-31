
export const emailKey = 'email';
export const passwordKey = 'password';
export const rePasswordKey = 'repeatPassword';
export const emailError = (value: string) => {
  return `* Email ${value} is already taken.`;
};
export const passwordError = '* Password must have at least one non letter or digit character and minimum of 8 characters.';
export const rePasswordError = "* Password doesn't match.";
