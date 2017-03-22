import { IAlbum } from "./Album";
import { IMedium } from "./Medium";
import { IReleaseUrl } from "./ReleaseUrl";

export interface IRelease {
    id: number;
    kind: string;
    releasedOn: string;
    country: string;
    catalogNumber: string;
    disambiguation: string;
    artworkUrls: any;
    media: IMedium[];
    album: IAlbum;
    siblings: IRelease[];
    urls: IReleaseUrl[];
}
