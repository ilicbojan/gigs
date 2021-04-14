export interface IGigsListVm {
  gigs: IGig[];
}

export interface IGig {
  id: number;
  date: Date;
  time: string;
  bandId: number;
  cafeId: number;
  band: IBand;
  cafe: ICafe;
}

interface IBand {
  id: number;
  name: string;
  genre: string;
}

interface ICafe {
  id: number;
  name: string;
  city: string;
  address: string;
}
