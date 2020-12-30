import React, {Component} from 'react';


class Button extends Component {
    render() {
      const {
        onClick= null,
        className = '',
        children,
      } = this.props;
      return (
        <button
          onClick={onClick}
          className={className}
          type="button"
          style={{outline:"none"}}
        >
        {children}
        </button>
      );
    }
  } 

  export default Button;