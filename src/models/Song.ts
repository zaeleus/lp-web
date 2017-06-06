import { IArtistCredit } from "./ArtistCredit";
import { IContribution } from "./Contribution";
import { IRelease } from "./Release";
import { ISongName } from "./SongName";
import { ISongUrl } from "./SongUrl";

export interface ISong {
    id: number;
    appearsOn: IRelease[];
    artistCredit: IArtistCredit;
    contributions: IContribution[];
    names: ISongName[];
    urls: ISongUrl[];
}
