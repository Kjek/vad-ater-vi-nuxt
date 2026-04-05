export interface CreateAccount {
  username: string;
  password: string;
  secret: string;
}

export type CreateAccountPasskey = Omit<CreateAccount, 'password'>;
