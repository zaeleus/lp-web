import { IAlbum } from "./Album";
import { IArtistName } from "./ArtistName";
import { IMembership } from "./Membership";

export interface IArtist {
    id: number;
    country: string;
    albums: IAlbum[];
    names: IArtistName[];
    memberships: IMembership[];
}
