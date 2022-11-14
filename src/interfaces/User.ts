export default interface User {
  uid: string;
  image: string;
  name: string;
  phone: string;
  email: string;
  addresses?: Address[];
  userType: string;
  password?: string;
}

export interface Address {
  addrId: string;
  title: string;
  address: string;
  category: string;
}
