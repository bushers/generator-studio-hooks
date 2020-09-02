import * as React from 'react';

export interface <%= uCamelCName %>Props {
    className?: string;
}

export interface <%= uCamelCName %>State {

}

export class <%= uCamelCName %> extends React.Component<<%= uCamelCName %>Props, <%= uCamelCName %>State> {
    el:HTMLDivElement;
    constructor(p:<%= uCamelCName %>Props) {
        super(p);
    }

    render() {
        const { props, state } = this,
            cls = this.props.className || "";

        return (
            <div className={"<%= kebabCName %> " + cls} ref={e=> this.el= e}>

            </div>
        );
    }
}
