import { IAlbumName } from "./AlbumName";
import { IArtistCredit } from "./ArtistCredit";
import { IRelease } from "./Release";

export enum AlbumKind {
    Single,
    EP,
    LP,
}

export interface IAlbum {
    id: number;
    kind: AlbumKind;
    names: IAlbumName[];
    defaultRelease: IRelease;
    artistCredit: IArtistCredit;
}
