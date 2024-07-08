import React from 'react';
import './SquareButton.css';

function SquareButton({ type, id, style, onClick, onChange, btnHeight, btnWidth, marginTop, fontSize, disabled, children }) {
    return (
        <div>
            <button
                type={type}
                style={{
                    ...style,
                    height: btnHeight,
                    width: btnWidth,
                    marginTop: marginTop,
                    fontSize: fontSize
                }}
                id={id}
                className="buttons"
                onClick={onClick}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    );
}

export default SquareButton;