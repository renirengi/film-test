export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  personalData?: IUserPersonalData;
}

export interface IUserPersonalData {
  phoneNumber: string;
  state: string;
  zipCode: string;
  city: string;
  address: string;
  goods?: IGoods;

}

export interface IGoods {
   wanted: number[];
   buying: number[];
   deliver: number[];
}
