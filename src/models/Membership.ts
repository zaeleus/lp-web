import { IArtist } from "./Artist";
import { IArtistCredit } from "./ArtistCredit";

export interface IMembership {
    group: IArtist;
    artistCredit: IArtistCredit;
}
