import { shallow } from "enzyme";
import * as React from "react";

import Age from "./Age";

test("calculates the duration between to dates in years", () => {
    let wrapper = shallow(<Age from="1989-05-07" to="2015-09-16" />);
    expect(wrapper.text()).toEqual("26");

    wrapper = shallow(<Age from="1991-09-14" to="2019-09-12" />);
    expect(wrapper.text()).toEqual("27");

    wrapper = shallow(<Age from="1992-07-31" to="2020-08-01" />);
    expect(wrapper.text()).toEqual("28");
});
