import React, { Component } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'

// Wrapper for injecting specific icons by name and agnostic project refs to icon library.
class DynamicIcon extends Component {
    components = {
        instagram: FaInstagram,
        facebook: FaFacebook
    };
    render() {
        const Icon = this.components[this.props.tag || 'unknown'];
        return <Icon />
    }
}
export default DynamicIcon;