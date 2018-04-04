import { shallow } from "enzyme";
import * as React from "react";

import Format from "./Format";

it("returns the format of the only medium", () => {
    const media = [{ kind: "CD" }];
    const wrapper = shallow(<Format media={media} />);
    expect(wrapper.text()).toEqual("CD");
});

it("returns the formats joined by a '+'", () => {
    const media = [{ kind: "CD" }, { kind: "DVD" }];
    const wrapper = shallow(<Format media={media} />);
    expect(wrapper.text()).toEqual("CD+DVD");
});
