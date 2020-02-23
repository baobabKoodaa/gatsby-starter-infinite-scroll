import React, { Component } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'

class DynamicIcon extends Component {
    components = {
        instagram: FaInstagram,
        facebook: FaFacebook
    };
    render() {
        const TagName = this.components[this.props.tag || 'default'];
        return <TagName />
    }
}
export default DynamicIcon;