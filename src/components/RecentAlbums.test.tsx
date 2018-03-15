import { shallow } from "enzyme";
import * as React from "react";

import { IAlbum } from "../queries/GetRecentAlbums";
import RecentAlbums from "./RecentAlbums";

const ALBUMS: IAlbum[] = [{
    id: "1",

    names: [{
        id: "1",
        isDefault: true,
        isOriginal: true,
        name: "To. Heart",
    }],

    artistCredit: {
        id: "1",
        names: [{
            id: "1",
            isDefault: true,
            isOriginal: true,
            name: "fromis_9",
            position: 1,
            separator: "",

            artist: {
                id: "1",
            },
        }],
    },

    defaultRelease: {
        country: "KR",
        id: "1",
        releasedOn: "2018-01-24",

        artworkUrls: {
            thumbnail: "/store/1t.jpg",
        },
    },
}, {
    id: "2",

    names: [{
        id: "1",
        isDefault: false,
        isOriginal: true,
        name: "주인공",
    }, {
        id: "1",
        isDefault: true,
        isOriginal: false,
        name: "Juingong",
    }],

    artistCredit: {
        id: "2",
        names: [{
            id: "2",
            isDefault: true,
            isOriginal: true,
            name: "선미",
            position: 1,
            separator: "",

            artist: {
                id: "2",
            },
        }, {
            id: "3",
            isDefault: true,
            isOriginal: true,
            name: "Sunmi",
            position: 1,
            separator: "",

            artist: {
                id: "2",
            },
        }],
    },

    defaultRelease: {
        country: "KR",
        id: "2",
        releasedOn: "2018-01-18",

        artworkUrls: {
            thumbnail: "/store/2t.jpg",
        },
    },
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
