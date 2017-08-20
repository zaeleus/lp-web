import { IArtistCreditName } from "./ArtistCreditName";

export interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}
