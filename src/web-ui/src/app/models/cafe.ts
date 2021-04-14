export interface ICafesListVm {
  cafes: ICafe[];
}

export interface ICafe {
  id: number;
  name: string;
  city: string;
  address: string;
  email: string;
  phone: string;
}
