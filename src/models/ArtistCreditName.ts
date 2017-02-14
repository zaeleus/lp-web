import { IArtist } from "./Artist";

export interface IArtistCreditName {
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
    artist: IArtist;
}
