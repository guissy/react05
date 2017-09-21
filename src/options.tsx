import * as React from 'react';

export default class Options extends React.PureComponent<OptionsProps, any> {
  constructor(props: OptionsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <div className="grid">
          <div className="unit whole center-on-mobiles">
            <div className="heading">
              <h1>Extension Boilerplate</h1>
              <p className="lead">A foundation for creating cross-browser extensions</p>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="grid">
            <div className="unit whole center-on-mobiles">
              <div className="option">
                <h5>Popup color</h5>
                <div className="radio-group">
                  <label><input className="js-radio white" type="radio" name="radio" value="white"/>White</label>
                  <label><input className="js-radio beige" type="radio" name="radio" value="beige"/>Beige</label>
                  <label>
                    <input className="js-radio lavender" type="radio" name="radio" value="lavender"/>Lavender
                  </label>
                </div>
              </div>

              <div className="option">
                <em className="text-muted">...display your extensions' options here...</em>
              </div>

            </div>
          </div>
        </section>

        <footer className="main-footer">
          <div className="grid">
            <div className="unit whole center-on-mobiles">
              <p className="text-center text-muted">
                &copy; Extension Boilerplate
              </p>
            </div>
          </div>

        </footer>
      </div>
    );
  }
}

interface OptionsProps {

}
