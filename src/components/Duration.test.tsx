import { shallow } from "enzyme";
import * as React from "react";

import Duration from "./Duration";

it("formats the duration from seconds to m:ss", () => {
    const wrapper = shallow(<Duration duration={273} />);
    expect(wrapper.text()).toEqual("4:33");
});

it("zero-pads the seconds column when it's less than 10", () => {
    const wrapper = shallow(<Duration duration={242} />);
    expect(wrapper.text()).toEqual("4:02");
});

it("returns x:xx if no duration is given", () => {
    const wrapper = shallow(<Duration />);
    expect(wrapper.text()).toEqual("x:xx");
});
