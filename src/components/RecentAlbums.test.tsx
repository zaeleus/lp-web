import { shallow } from "enzyme";
import * as React from "react";

import IAlbum, { AlbumKind } from "../models/Album";
import RecentAlbums from "./RecentAlbums";

const ALBUMS: IAlbum[] = [{
    artistCredit: {
        id: "1",
        names: [{
            default: true,
            id: "1",
            locale: "ko",
            name: "fromis_9",
            original: true,
        }],
    },
    defaultRelease: {
        artworkUrls: {
            original: "/store/1o.jpg",
            thumbnail: "/store/1t.jpg",
        },
        country: "KR",
        id: "1",
        releasedOn: "2018-01-24",
    },
    id: "1",
    kind: AlbumKind.EP,
    names: [{
        default: true,
        id: "1",
        locale: "ko",
        name: "To. Heart",
        original: true,
    }],
}, {
    artistCredit: {
        id: "2",
        names: [{
            default: true,
            id: "2",
            locale: "ko",
            name: "선미",
            original: true,
        }, {
            default: true,
            id: "3",
            locale: "ko-Latn",
            name: "Sunmi",
            original: true,
        }],
    },
    defaultRelease: {
        artworkUrls: {
            original: "/store/2o.jpg",
            thumbnail: "/store/2t.jpg",
        },
        country: "KR",
        id: "2",
        releasedOn: "2018-01-18",
    },
    id: "2",
    kind: AlbumKind.Single,
    names: [{
        default: false,
        id: "1",
        locale: "ko",
        name: "주인공",
        original: true,
    }, {
        default: true,
        id: "1",
        locale: "ko-Latn",
        name: "Juingong",
        original: false,
    }],
}];

describe("RecentAlbums", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<RecentAlbums albums={ALBUMS} />);
    });

    test("renders all entries", () => {
        expect(wrapper.children().length).toBe(2);
    });

    test("renders the first entry", () => {
        let names;

        const entry = wrapper.childAt(0);

        const a = entry.find("Link img").first();
        expect(a.prop("src")).toBe("/store/1t.jpg");

        const releasedOn = entry.find(".released-on").first().text();
        expect(releasedOn).toBe("2018-01-24");

        names = entry.find(".name Name");
        expect(names.length).toBe(2);
        expect(names.at(0).props().original).toBe(true);
        expect(names.at(1).props().original).toBe(undefined);

        names = entry.find(".artist ArtistCredit");
        expect(names.length).toBe(2);
        expect(names.at(0).props().original).toBe(true);
        expect(names.at(1).props().original).toBe(undefined);
    });

    test("renders the second entry", () => {
        let names;

        const entry = wrapper.childAt(1);

        const a = entry.find("Link img").first();
        expect(a.prop("src")).toBe("/store/2t.jpg");

        const releasedOn = entry.find(".released-on").first().text();
        expect(releasedOn).toBe("2018-01-18");

        names = entry.find(".name Name");
        expect(names.length).toBe(2);
        expect(names.at(0).props().original).toBe(true);
        expect(names.at(1).props().original).toBe(undefined);

        names = entry.find(".artist ArtistCredit");
        expect(names.length).toBe(2);
        expect(names.at(0).props().original).toBe(true);
        expect(names.at(1).props().original).toBe(undefined);
    });
});
