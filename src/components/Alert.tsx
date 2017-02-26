import * as React from "react";

import "./Alert.css";

const Alert: React.StatelessComponent<{}> = ({ children }) => (
    <div className="alert">{children}</div>
);

export default Alert;
