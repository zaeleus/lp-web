// See <https://reactjs.org/blog/2017/09/26/react-v16.0.html>.
global.requestAnimationFrame = (callback: (...args: any[]) => void): number => {
    setTimeout(callback, 0);
    return 1;
};

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
