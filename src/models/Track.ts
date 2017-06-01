import { IArtistCredit } from "./ArtistCredit";
import { ISong } from "./Song";
import { ITrackName } from "./TrackName";

export interface ITrack {
    position: number;
    duration: number;
    artistCredit: IArtistCredit;
    names: ITrackName[];
    song: ISong;
}
