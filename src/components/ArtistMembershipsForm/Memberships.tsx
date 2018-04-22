import * as React from "react";

import { FormConsumer, IContextProps } from "./Context";
import Membership from "./Membership";

interface IProps {
    membershipIds: string[];
}

type ConsumerProps = IContextProps & IProps;

const Consumer: React.StatelessComponent<ConsumerProps> = ({ membershipIds, state }) => {
    const { memberships } = state;

    const items = membershipIds
        .map((id) => memberships[id])
        .filter((membership) => !membership._delete)
        .map((membership) => (
            <Membership key={membership.id} membership={membership} />
        ));

    return <ul className="memberships">{items}</ul>;
};

const Memberships: React.StatelessComponent<IProps> = (props) => (
    <FormConsumer>
        {(value) => <Consumer {...props} {...value!} />}
    </FormConsumer>
);

export default Memberships;
