import React from 'react';

const throttle = require('lodash.throttle');

export class InfiniteScroll extends React.Component {

  constructor(props) {
    super(props)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.resizeHandler = this.resizeHandler.bind(this)
  }

  scrollHandler = () => {}

  resizeHandler = () => {}

  componentDidMount() {
    this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle);
    this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle);

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  componentDidUpdate() {
    this.scrollHandler();
  }

  checkWindowScroll = () => {

    //console.log("Window height " + window.innerHeight + " Sentinel boundingRectTop " + this.sentinel.getBoundingClientRect().top)
    if (
      this.props.hasMore &&
      this.sentinel.getBoundingClientRect().top - window.innerHeight <
      this.props.threshold
    ) {
      this.props.onLoadMore();
    }
  }

  render() {
    const sentinel = <div ref={i => this.sentinel = i} />;

    if(this.props.render) {
      return this.props.render({
        sentinel,
        children: this.props.children
      });
    }

    if(this.props.component) {
      const Container = this.props.component;
      return (
        <Container sentinel={sentinel}>
          {this.props.children}
        </Container>
      );
    }

    return (
      <div>
        {this.props.children}
        {sentinel}
      </div>
    );
  }
}