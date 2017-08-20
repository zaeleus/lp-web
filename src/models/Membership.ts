import { IArtist } from "./Artist";
import { IArtistCredit } from "./ArtistCredit";

export interface IMembership {
    id: string;
    group: IArtist;
    artistCredit: IArtistCredit;
}
