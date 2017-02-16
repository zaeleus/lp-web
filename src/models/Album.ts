import { IAlbumName } from "./AlbumName";

export enum AlbumKind {
    Single,
    EP,
    LP,
}

export interface IAlbum {
    id: number;
    kind: AlbumKind;
    names: IAlbumName[];
}
