import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

/* Redux Logic */
const REQUESTING_QUOTE = 'REQUESTING_QUOTE';
const QUOTE_RECEIVED = 'QUOTE_RECEIVED';
const requestingQuote = () => {
  return {
    type: REQUESTING_QUOTE
  }
}

const quoteReceived = (data) => {
  return {
    type: QUOTE_RECEIVED,
    quote: data
  }
}

const handleAsync = () => {
  return function(dispatch) {
    dispatch(requestingQuote());
    // API CALL HERE
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "e5df4a06cemsh105469991af827ep1825d9jsnde4b2bb2d65b"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      let data =  {author: response.originator.name, quote: response.content};
      dispatch(quoteReceived(data));
    })
    .catch(err => {
      console.error(err);
    });
  }
}

const defaultQuote = {
  quote: '-' ,
  author: ''
}

const defaultState = {
  fetchingData: false,
  quote: defaultQuote
}
const requestReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_QUOTE: 
      return {
        fetchingData: true,
        quote: {}
      }
    case QUOTE_RECEIVED:
      return {
        fetchingData: false,
        quote: action.quote
      }
    default:
      return state;
  }
}
const store = createStore(requestReducer, applyMiddleware(thunk));

export { handleAsync, store };