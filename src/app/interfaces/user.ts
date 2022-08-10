export interface IUser {
  id: number;
  email: string;
  password: string;
  personalData?: IUserPersonalData;
}

export interface IUserPersonalData {
  name: string;
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
