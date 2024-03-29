import { array, email, minLength, object, string } from "valibot";

export const SignUpSchema = object({
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
  username: string("Your name must be string.", [
    minLength(4, "Name must be of 4 or more character"),
    minLength(1, "Please enter your name"),
  ]),
  /*  animeList: array(string("Please Provide 3 Animes You Like."), [
    minLength(2, "Please choose three anime"),
  ]), */
});

export const LoginSchema = object({
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(7, "Your password must have 8 characters or more."),
  ]),
});
