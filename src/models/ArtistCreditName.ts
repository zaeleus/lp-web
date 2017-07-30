import { IArtist } from "./Artist";

export interface IArtistCreditName {
    position: number;
    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
    artist: IArtist;
    separator: string;
}
