import React from "react"

/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const GlobalStateContext = React.createContext({
    cursor: 0, /* Which page infinite scroll should fetch next. */
    useInfiniteScroll: true, /* Toggle between pagination and inf. scroll for this demo & fallback in case of error. */
    isInitializing: () => { return true },
    updateState: () => {},
    hasMore: () => {},
    loadMore: () => {},
    toggle: () => {},
});

export class GlobalState extends React.Component {

    constructor(props) {
        super(props)

        console.log("*** Constructing Global State ***")

        this.toggle = this.toggle.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.hasMore = this.hasMore.bind(this)
        this.updateState = this.updateState.bind(this)
        this.isInitializing = this.isInitializing.bind(this)
        
        /* State also contains metadata for items, e.g. state["page81"] (only contains keys for _received_ metadata) */
        this.state = {
            cursor: 0,
            useInfiniteScroll: true,
            isInitializing: this.isInitializing,
            updateState: this.updateState,
            hasMore: this.hasMore,
            loadMore: this.loadMore,
            toggle: this.toggle
        }
    }

    isInitializing = () => {
        return (this.state.cursor === 0)
    }

    updateState = (mergeableStateObject) => {
        this.setState(mergeableStateObject)
    }

    loadMore = () => {
        console.log("Fetching metadata for page " + this.state.cursor)
        const pageNum = this.state.cursor
        this.setState(state => ({ cursor: state.cursor+1 })) // TODO: make sure this is guaranteed to set state before another loadMore may be able to fire!
        fetch(`${__PATH_PREFIX__}/paginationJson/index${pageNum}.json`)
          .then(res => res.json())
          .then(
            res => {
              this.setState({
                  ["page"+pageNum]: res
              })
            },
            error => {
              this.setState({
                useInfiniteScroll: false // Fallback to Pagination on error.
              })
            }
        )
    }

    hasMore = (pageContext) => {
        if (!this.state.useInfiniteScroll) return false
        if (this.isInitializing()) return true
        return this.state.cursor <= pageContext.countPages
    }

    /** This exists to demo toggling. You will not need this in production. */
    toggle(useInfiniteScroll, pageContext) {
        if (useInfiniteScroll) {
            /* Toggle back to infinite scroll, adjust scroll position. Otherwise we might load 1000s of items at once. */
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo(0, scrollTop-1);
            this.setState({
                useInfiniteScroll: true
            })
        } else {
            /* Toggle back to pagination, reset items and cursor. */
            const state = {}
            for (var i=this.state.cursor-1; i>=0; i--) {
                state['page'+i] = undefined
            }
            state['page'+pageContext.currentPage] = pageContext.pageImages
            state['cursor'] = pageContext.currentPage+1
            state['useInfiniteScroll'] = false
            this.setState(state)
        }
    }

    render() {
        return (
            <GlobalStateContext.Provider value={this.state}>
                {this.props.children}
            </GlobalStateContext.Provider>
        )
    }

}