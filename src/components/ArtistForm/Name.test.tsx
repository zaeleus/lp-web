import { shallow } from "enzyme";
import * as React from "react";

import { IArtistNameState } from "./index";
import Name, { IProps } from "./Name";

const NAME: IArtistNameState = {
    id: "2",

    _delete: false,

    isDefault: true,
    isOriginal: false,
    locale: "ko-Latn",
    name: "Bolbbalgan4",
};

describe("ArtistForm/Name", () => {
    describe("fields", () => {
        test("name", () => {
            const onNameChange = jest.fn();

            const wrapper = shallow<IProps>(
                <Name
                    id={1}
                    name={NAME}
                    onNameChange={onNameChange}
                    onLocaleChange={jest.fn()}
                    onIsOriginalChange={jest.fn()}
                    onIsDefaultChange={jest.fn()}
                    removeName={jest.fn()}
                />,
            );

            const input = wrapper.find(".name input");
            expect(input.props().value).toBe("Bolbbalgan4");
            input.simulate("change", { currentTarget: { value: "볼빨간사춘기" }});
            expect(onNameChange).toBeCalledWith(1, "볼빨간사춘기");
        });

        test("locale", () => {
            const onLocaleChange = jest.fn();

            const wrapper = shallow<IProps>(
                <Name
                    id={1}
                    name={NAME}
                    onNameChange={jest.fn()}
                    onLocaleChange={onLocaleChange}
                    onIsOriginalChange={jest.fn()}
                    onIsDefaultChange={jest.fn()}
                    removeName={jest.fn()}
                />,
            );

            const input = wrapper.find(".locale input");
            expect(input.props().value).toBe("ko-Latn");
            input.simulate("change", { currentTarget: { value: "ko" }});
            expect(onLocaleChange).toBeCalledWith(1, "ko");
        });

        test("is original", () => {
            const onIsOriginalChange = jest.fn();

            const wrapper = shallow<IProps>(
                <Name
                    id={1}
                    name={NAME}
                    onNameChange={jest.fn()}
                    onLocaleChange={jest.fn()}
                    onIsOriginalChange={onIsOriginalChange}
                    onIsDefaultChange={jest.fn()}
                    removeName={jest.fn()}
                />,
            );

            const input = wrapper.find(".is-original input");
            expect(input.props().checked).toBe(false);
            input.simulate("change", { currentTarget: { checked: true }});
            expect(onIsOriginalChange).toBeCalledWith(1, true);
        });

        test("is default", () => {
            const onIsDefaultChange = jest.fn();

            const wrapper = shallow<IProps>(
                <Name
                    id={1}
                    name={NAME}
                    onNameChange={jest.fn()}
                    onLocaleChange={jest.fn()}
                    onIsOriginalChange={jest.fn()}
                    onIsDefaultChange={onIsDefaultChange}
                    removeName={jest.fn()}
                />,
            );

            const input = wrapper.find(".is-default input");
            expect(input.props().checked).toBe(true);
            input.simulate("change", { currentTarget: { checked: true }});
            expect(onIsDefaultChange).toBeCalledWith(1, true);
        });
    });
});
