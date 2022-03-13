import { Provider, connect } from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { handleAsync, store } from './redux.js';
import { Presentational } from './react.js';

/* React-Redux */
const mapStateToProps = (state) => {
  const fetchingData = state.fetchingData;
  const quote = state.quote;
  return {
    fetchingData: fetchingData,
    quote: quote
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestNewQuote: () => {
      dispatch(handleAsync());
    }
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));