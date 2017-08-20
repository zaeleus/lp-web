import { IArtist } from "./Artist";

export interface IArtistCreditName {
    id: string;
    position: number;
    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
    artist: IArtist;
    separator: string;
}
