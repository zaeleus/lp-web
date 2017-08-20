import { IArtistCredit } from "./ArtistCredit";
import { ISong } from "./Song";

export interface IContribution {
    id: string;
    artistCredit: IArtistCredit;
    song: ISong;
    kind: string;
}
