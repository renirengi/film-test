export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  personalData?: IUserPersonalData;
}

export interface IUserPersonalData {
  phoneNumber: string;
  country: string;
  zipCode: string;
  city: string;
  house: number,
  building?: number|string;
  apartment?: number;
  goods?: IGoods;

}

export interface IGoods {
   wanted: number[];
   buying: number[];
   deliver: number[];
}
