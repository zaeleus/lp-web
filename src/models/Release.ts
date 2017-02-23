import { IReleaseUrl } from "./ReleaseUrl";

export interface IRelease {
    id: number;
    releasedOn: string;
    urls: IReleaseUrl[];
}
