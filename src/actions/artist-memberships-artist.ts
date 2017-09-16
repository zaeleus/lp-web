import { ISetArtistAction } from "./artist-memberships-form";
import { IRemoveMembershipAction } from "./memberships";

export type Action = ISetArtistAction | IRemoveMembershipAction;
