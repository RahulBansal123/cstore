import React from 'react';

class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({
        checked: this.props.checked,
      });
    }
  }

  _onChange(e) {
    const value = e.target.checked;

    this.setState({
      checked: value,
    });

    if (this.props.toggleCheckboxChange) {
      this.props.toggleCheckboxChange(value);
    }
  }

  render() {
    const { className, style, id, label } = this.props;
    const { checked } = this.state;

    const classNames = `switch-checkbox${`${className && ` ${className}`}`}`;

    return (
      <div className={classNames} style={style}>
        <input
          id={id}
          type={'checkbox'}
          className="switch-checkbox-input"
          checked={checked}
          onChange={(e) => this._onChange(e)}
        />
        <label htmlFor={id} className="switch-label">
          {label && <span className="switch-label-text">{label} </span>}
          <span className="switch-label-toggle"></span>
        </label>
      </div>
    );
  }
}

Switch.defaultProps = {
  className: '',
};

export default Switch;
