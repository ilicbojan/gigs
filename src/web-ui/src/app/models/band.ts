export interface IBandsListVm {
  bands: IBand[];
}

export interface IBand {
  id: number;
  name: string;
  members: string;
  genre: string;
  email: string;
  phone: string;
}
