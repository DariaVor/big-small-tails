export type UserType = {
  id: number;
  username: string;
  email: string;
  roleId: number;
};

export type UserRegisterType = Omit<UserType, 'id'> & { password: string };
export type UserLoginType = Omit<UserRegisterType, 'username'>;

export type UserFromBackendType = { accessToken: string; user: UserType };

export type UserStateType =
  | { status: 'fetching' }
  | { status: 'guest' }
  | ({ status: 'logged' } & UserType);
