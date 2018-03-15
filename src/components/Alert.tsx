import * as classNames from "classnames";
import * as React from "react";

import "./Alert.css";

type AlertKinds = "error";

interface IProps {
    kind?: AlertKinds;
}

const Alert: React.StatelessComponent<IProps> = ({ children, kind }) => (
    <div className={classNames("alert", kind)}>{children}</div>
);

export default Alert;
