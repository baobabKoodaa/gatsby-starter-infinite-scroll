/* This file is forked from https://github.com/jaredpalmer/react-simple-infinite-scroll
   Authors: Jared Palmer, Pablo Garcia
   Modified by Baobab Koodaa.
*/

import * as React from 'react';

const throttle = require('lodash.throttle');

export interface InfiniteScrollProps {
  /**
   * Does the resource have more entities
   */
  hasMore: boolean;

  /**
   * Should show loading
   */
  isLoading: boolean;

  /**
   * Callback to load more entities
   */
  onLoadMore: () => void;

  /**
   * Scroll threshold
   */
  threshold?: number;

  /**
   * Throttle rate
   */
  throttle?: number;

  /** Children */
  children?: any;

  /**
   * Callback for convenient inline rendering and wrapping
   */
  render?: (a: object) => any;

  /**
   * A React component to act as wrapper
   */
  component?: any;
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, {}> {
  public static defaultProps: Pick<InfiniteScrollProps, 'threshold' | 'throttle'> = {
    threshold: 100,
    throttle: 64,
  };
  private sentinel: HTMLDivElement;
  private scrollHandler: () => void;
  private resizeHandler: () => void;

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
    // This fixes edge case where initial content is not enough to enable scrolling on a large screen.
    this.checkWindowScroll();
  }

  checkWindowScroll = () => {
    if (this.props.isLoading) {
      return;
    }

    if (
      this.props.hasMore &&
      this.sentinel.getBoundingClientRect().top - window.innerHeight <
      this.props.threshold!
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

export default React.createFactory(InfiniteScroll);