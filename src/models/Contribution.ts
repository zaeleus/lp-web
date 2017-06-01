import { IArtistCredit } from "./ArtistCredit";
import { ISong } from "./Song";

export interface IContribution {
    id: number;
    artistCredit: IArtistCredit;
    song: ISong;
    kind: string;
}
