export interface AddressItem {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface GetAddressesResponseType {
  results: number;
  status: string;
  data: AddressItem[];
}

export interface MutateAddressResponseType {
  status: string;
  message: string;
  data: AddressItem[];
}

export interface AddressesStateType {
  addresses: AddressItem[];
  isLoading: boolean;
  error: string | null;
}