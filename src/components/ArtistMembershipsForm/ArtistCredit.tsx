import * as React from "react";

import { FormConsumer, IArtistCreditState, IContextProps } from "./Context";

interface IProps {
    artistCredit: IArtistCreditState;
}

type ConsumerProps = IContextProps & IProps;

const Consumer: React.StatelessComponent<ConsumerProps> = ({
    artistCredit,
    state,
}) => {
    const { artistCreditNames } = state;
    const names = artistCredit.nameIds.map((id) => artistCreditNames[id]);

    const defaultName = names
        .filter((n) => n.isDefault)
        .map((n) => n.name)
        .join();

    const originalName = names
        .filter((n) => n.isOriginal)
        .map((n) => n.name)
        .join();

    return (
        <div className="names">
            <div>{originalName}</div>
            <div>{defaultName}</div>
        </div>
    );
};

const ArtistCredit: React.StatelessComponent<IProps> = (props) => (
    <FormConsumer>
        {(value) => <Consumer {...props} {...value!} />}
    </FormConsumer>
);

export default ArtistCredit;
