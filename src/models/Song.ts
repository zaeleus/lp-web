import { IArtistCredit } from "./ArtistCredit";
import { IContribution } from "./Contribution";
import { ISongName } from "./SongName";
import { ISongUrl } from "./SongUrl";

export interface ISong {
    id: number;
    artistCredit: IArtistCredit;
    contributions: IContribution[];
    names: ISongName[];
    urls: ISongUrl[];
}
