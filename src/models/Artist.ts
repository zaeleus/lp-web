import { IAlbum } from "./Album";
import { IArtistName } from "./ArtistName";
import { IArtistUrl } from "./ArtistUrl";
import { IMembership } from "./Membership";

export interface IArtist {
    id: string;
    kind: string;
    country: string;
    startedOn: string;
    endedOn: string;
    albums: IAlbum[];
    names: IArtistName[];
    groupships: IMembership[];
    memberships: IMembership[];
    urls: IArtistUrl[];
}
