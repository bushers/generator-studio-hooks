import * as React from 'react';

export interface <%= uCamelCName %>Props {
    className?: string;
}

const <%= uCamelCName %>: React.FC<<%= uCamelCName %>Props> = (props) => {
    const cls = props.className || "";

    return (
        <div className={"<%= kebabCName %> " + cls}>

        </div>
    );
};

export default <%= uCamelCName %>;
