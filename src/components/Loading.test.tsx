import { shallow } from "enzyme";
import * as React from "react";

import Loading from "./Loading";

describe("Loading", () => {
    test("shows the text 'Loading...'", () => {
        const wrapper = shallow(<Loading />);
        expect(wrapper.text()).toBe("Loading...");
    });
});
