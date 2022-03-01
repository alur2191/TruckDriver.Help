import { useState } from 'react'
const Tooltip = (props) => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onClick={active ? hideTip : showTip}
            style={{ position: 'relative' }}
        >
            {/* Wrapping */}
            {props.children}
            {active && (
                <div className="tooltip-tip disableHighlighting">
                    {/* Content */}
                    <span>{props.content}</span>
                </div>
            )
            }
        </div >
    );
};

export default Tooltip;
