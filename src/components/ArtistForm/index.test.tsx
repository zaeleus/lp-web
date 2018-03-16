import { mount, shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import { IArtist } from "../../queries/artist/FindArtistForEdit";
import ArtistForm, { IProps, IState } from "./index";

const ARTIST: IArtist = {
    id: "1",

    country: "KR",
    kind: "GROUP",
    startedOn: "2014",

    names: [{
        id: "1",

        isDefault: false,
        isOriginal: true,
        locale: "ko",
        name: "볼빨간사춘기",
    }, {
        id: "2",

        isDefault: true,
        isOriginal: false,
        locale: "ko-Latn",
        name: "Bolbbalgan4",
    }],
};

const ON_SUBMIT = jest.fn();

describe("ArtistForm", () => {
    test("copies the input artist to the form state", () => {
        const wrapper = shallow<IProps, IState>(
            <ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />,
        );

        const expected = {
            artist: {
                id: "1",

                country: "KR",
                disambiguation: undefined,
                endedOn: undefined,
                kind: "GROUP",
                startedOn: "2014",
            },
            names: [{
                id: "1",

                _delete: false,

                isDefault: false,
                isOriginal: true,
                locale: "ko",
                name: "볼빨간사춘기",
            }, {
                id: "2",

                _delete: false,

                isDefault: true,
                isOriginal: false,
                locale: "ko-Latn",
                name: "Bolbbalgan4",
            }],
        };

        expect(wrapper.state()).toEqual(expected);
    });

    describe("on submit", () => {
        test("calls the onSubmit callback with a generated payload", () => {
            expect.assertions(1);

            const onSubmit = jest.fn();

            const wrapper = shallow<IProps, IState>(
                <ArtistForm artist={ARTIST} onSubmit={onSubmit} />,
            );

            wrapper.find("form").simulate("submit", {
                preventDefault: jest.fn(),
            });

            const payload = {
                variables: {
                    input: {
                        id: "1",

                        country: "KR",
                        kind: "GROUP",
                        startedOn: "2014",

                        names: [{
                            id: "1",

                            isDefault: false,
                            isOriginal: true,
                            locale: "ko",
                            name: "볼빨간사춘기",
                        }, {
                            id: "2",

                            isDefault: true,
                            isOriginal: false,
                            locale: "ko-Latn",
                            name: "Bolbbalgan4",
                        }],
                    },
                },
            };

            expect(onSubmit).toBeCalledWith(payload);
        });
    });

    describe("inputs", () => {
        let wrapper: ShallowWrapper<IProps, IState>;

        beforeEach(() => {
            wrapper = shallow(<ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />);
        });

        test("kind", () => {
            const input = wrapper.find(".kind select");
            expect(input.props().value).toBe("GROUP");
            input.simulate("change", { currentTarget: { value: "PERSON" }});
            expect(wrapper.state("artist").kind).toBe("PERSON");
        });

        test("country", () => {
            const input = wrapper.find(".country input");
            expect(input.props().value).toBe("KR");
            input.simulate("change", { currentTarget: { value: "US" }});
            expect(wrapper.state("artist").country).toBe("US");
        });

        test("started on", () => {
            const input = wrapper.find(".started-on input");
            expect(input.props().value).toBe("2014");
            input.simulate("change", { currentTarget: { value: "2012-02" }});
            expect(wrapper.state("artist").startedOn).toBe("2012-02");
        });

        test("ended on", () => {
            const input = wrapper.find(".ended-on input");
            expect(input.props().value).toBe("");
            input.simulate("change", { currentTarget: { value: "2038-01-19" }});
            expect(wrapper.state("artist").endedOn).toBe("2038-01-19");
        });

        test("disambiguation", () => {
            const input = wrapper.find(".disambiguation input");
            expect(input.props().value).toBe("");
            input.simulate("change", { currentTarget: { value: "group" }});
            expect(wrapper.state("artist").disambiguation).toBe("group");
        });
    });

    describe("names", () => {
        describe("clicking the add button", () => {
            test("adds a new name", () => {
                const wrapper = shallow<IProps, IState>(
                    <ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />,
                );

                expect(wrapper.state("names").length).toBe(2);

                const button = wrapper.find(".names label a");
                button.simulate("click", { preventDefault: jest.fn() });

                const expected = {
                    id: "",

                    _delete: false,

                    isDefault: false,
                    isOriginal: false,
                    locale: "",
                    name: "",
                };

                const names = wrapper.state("names");
                expect(names.length).toBe(3);
                expect(names[names.length - 1]).toEqual(expected);
            });
        });

        describe("clicking a remove button", () => {
            test("sets the _delete flag for the name with the given id", () => {
                const wrapper = mount<IProps, IState>(
                    <ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />,
                );

                expect(wrapper.state("names").length).toBe(2);

                const i = 1;

                const row = wrapper.find(".names Names Name").at(i);
                const button = row.find(".actions a");
                button.simulate("click");

                const names = wrapper.state("names");
                expect(names.length).toBe(2);
                expect(names[i]._delete).toBe(true);
            });
        });

        describe("setting a name to be the original", () => {
            test("sets the name as the original and all other names as not", () => {
                const wrapper = mount<IProps, IState>(
                    <ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />,
                );

                const row = wrapper.find(".names Names Name").at(1);
                const input = row.find(".is-original input");
                input.simulate("change");

                const names = wrapper.state("names");
                expect(names[0].isOriginal).toBe(false);
                expect(names[1].isOriginal).toBe(true);
            });
        });

        describe("setting a name to be the default", () => {
            test("sets the name as the default and all other names as not", () => {
                const wrapper = mount<IProps, IState>(
                    <ArtistForm artist={ARTIST} onSubmit={ON_SUBMIT} />,
                );

                const row = wrapper.find(".names Names Name").at(0);
                const input = row.find(".is-default input");
                input.simulate("change");

                const names = wrapper.state("names");
                expect(names[0].isDefault).toBe(true);
                expect(names[1].isDefault).toBe(false);
            });
        });
    });
});
