import * as React from "react";

const ReleaseForm: React.StatelessComponent<{}> = () => {
    return (
        <form className="release-form">
            <div className="group">
                <label>Name</label>
                <input type="text" />
            </div>

            <div className="group">
                <label>Country</label>
                <input type="text" placeholder="XX" />
            </div>

            <div className="group">
                <label>Release Date</label>
                <input type="text" placeholder="YYYY-MM-DD" />
            </div>

            <div className="group">
                <label>Catalog Number</label>
                <input type="text" />
            </div>

            <div className="group">
                <label>Disambiguation</label>
                <input type="text" />
            </div>

            <div className="group">
                <input type="submit" value="Save" />
            </div>
        </form>
    );
};

export default ReleaseForm;
