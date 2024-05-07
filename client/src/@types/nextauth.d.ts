import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  code: string;
  electronicIdentification?: string;
  isAdmin?: boolean;
  type: string;
  /**
   * Field to check whether a user has a subscription
   */
  subscribed?: boolean;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
    jwt: string;
  }
}
