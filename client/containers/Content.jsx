import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Content extends Component {
    render() {
        const style = {
            'margin-top': '30px'
        }

        return (
            <div id="Content" style={ style }>
                { this.props.children }
            </div>
        )
    }
}

export default Content;
