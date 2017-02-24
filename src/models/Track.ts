import { IArtistCredit } from "./ArtistCredit";
import { ITrackName } from "./TrackName";

export interface ITrack {
    position: number;
    duration: number;
    artistCredit: IArtistCredit;
    names: ITrackName[];
}
