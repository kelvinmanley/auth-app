import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  User,
} from "firebase/auth";

const createUser = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const signIn = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const changePassword = (user: User, newPassword: string) =>
  updatePassword(user, newPassword);

const logOut = () => auth.signOut();

export { createUser, signIn, changePassword, logOut };
