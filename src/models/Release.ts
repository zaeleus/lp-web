import { IAlbum } from "./Album";
import { IMedium } from "./Medium";
import { IReleaseUrl } from "./ReleaseUrl";

export interface IRelease {
    id: number;
    releasedOn: string;
    media: IMedium[];
    album: IAlbum;
    urls: IReleaseUrl[];
}
