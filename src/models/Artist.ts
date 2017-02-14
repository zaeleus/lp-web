import { IArtistName } from "./ArtistName";
import { IMembership } from "./Membership";

export interface IArtist {
    id: number;
    country: string;
    names: IArtistName[];
    memberships: IMembership[];
}
