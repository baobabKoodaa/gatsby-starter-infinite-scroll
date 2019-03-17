import React from "react"

/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const GlobalStateContext = React.createContext({
    items: null,
    isLoading: true,
    cursor: 0, /* Which page infinite scroll should fetch next. */
    useInfiniteScroll: true, /* Toggle between pagination and inf. scroll for this demo & fallback in case of error. */
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

        this.state = {
            items: null,
            isLoading: true,
            cursor: 0,
            useInfiniteScroll: true,
            updateState: this.updateState,
            hasMore: this.hasMore,
            loadMore: this.loadMore,
            toggle: this.toggle
        }
    }

    componentDidUpdate() {
        console.log("Showing " + this.state.items.length + " images.")
    }

    updateState = (mergeableStateObject) => {
        this.setState(mergeableStateObject)
    }

    loadMore = () => {
        this.setState({ isLoading: true, error: undefined })
        console.log("Loading more...")
        fetch(`/paginationJson/index${this.state.cursor}.json`)
          .then(res => res.json())
          .then(
            res => {
              this.setState(state => ({
                items: [...state.items, ...res], // Add resulting post items to state.items
                cursor: state.cursor+1, // Update which page should be fetched next
                isLoading: false // Loading is complete so a new load can be triggered.
              }))
            },
            error => {
              this.setState({
                isLoading: false,
                error,
                useInfiniteScroll: false // Fallback to Pagination on error.
              })
            }
        )
    }

    hasMore = (pageContext) => {
        return (this.state.cursor <= pageContext.countPages && this.state.useInfiniteScroll)
    }

    /** This exists to demo toggling. You will not need this in production. */
    toggle(useInfiniteScroll, pageContext) {
        if (useInfiniteScroll) {
            /* When we toggle back to infinite scroll, adjust scroll position. Otherwise we might load 1000s of items at once. */
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo(0, scrollTop-1);
            this.setState({
                useInfiniteScroll: true
            })
        } else {
            /* When we toggle back to pagination, reset items and cursor. */
            this.setState({
                useInfiniteScroll: false,
                items: pageContext.pageImages,
                cursor: pageContext.currentPage+1,
            })
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