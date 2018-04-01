import * as React from "react";

import ReleaseForm from "../components/ReleaseForm";

const NewRelease: React.StatelessComponent = () => (
    <div id="content">
        <div className="full">
            <h2>New Release</h2>
            <ReleaseForm />
        </div>
    </div>
);

export default NewRelease;
