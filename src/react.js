import * as React from "react";

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: { backgroundImage: 'linear-gradient(30deg, #1a2a6c, #b21f1f, #fdbb2d)' }
    }
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleThemeChange = (theme) => {
    this.setState({
      currentTheme: theme
    });
  }

  handleRequest = () => {
    this.props.requestNewQuote();
  }

  render() {
    const themeList = [
      { backgroundImage: 'linear-gradient(30deg, #1a2a6c, #b21f1f, #fdbb2d)' },
      { backgroundImage: 'linear-gradient(30deg, #22c1c3, #fdbb2d)'},
      { backgroundImage: 'linear-gradient(30deg, #ff9966, #ff5e62)'},
      { backgroundImage: 'linear-gradient(30deg, #c9d6ff, #e2e2e2)'},
      { backgroundImage: 'linear-gradient(30deg, #283c86, #45a247)'},
      { backgroundImage: 'linear-gradient(-30deg, #EB5757, #000000)'},
    ];
    const themeListElement = themeList.map((x, index) => <button type="button" className="btn theme-btn" key={index} style={x} onClick={()=> this.handleThemeChange(x)}></button>)
    const quoteContainer = <div><p id="text" className="h5 text-justify quote-container"><q>{this.props.quote.quote}</q></p><p id="author" className="h6 text-right"> - <i>{this.props.quote.author}</i></p></div>
    const spinner = <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
    console.log(this.state.currentTheme);
    const style = this.state.currentTheme;
    return (
      <div className="bg-gradient" style={style}>
        <div className="dot-bg big" />
        <div className="dot-bg small" />
        <div className="theme-container">
          {themeListElement}
        </div>
        <div className="d-flex align-items-center" style={{ height: '100vh' }}>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                <div id="quote-box" className="card p-3">
                  <div className="card-body">
                    {!this.props.fetchingData && quoteContainer}
                    {this.props.fetchingData && spinner}
                    <div className="d-flex justify-content-between pt-3">
                      <button className="btn btn-outline-dark" id="new-quote" onClick={this.handleRequest}>New Quote</button>
                      <a href={"https://twitter.com/intent/tweet?text=" + this.props.quote.quote + " - " + this.props.quote.author} target="_blank" rel="noreferrer" className="btn btn-info" style={{ marginLeft: '1rem' }} id="tweet-quote"><i className="fa-brands fa-twitter text-white"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { Presentational };