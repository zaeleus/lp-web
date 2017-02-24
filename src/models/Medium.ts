import { ITrack } from "./Track";

export interface IMedium {
    kind: string;
    position: number;
    tracks: ITrack[];
}
