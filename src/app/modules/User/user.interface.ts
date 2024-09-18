
export type TUserName = {
    firstName: string;
    lastName: string;
  };

  export type TUser = {
    name: TUserName,
    email: string,
    phone: string,
    role?: 'user' | 'admin';
    address: string;

  }