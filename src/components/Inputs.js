import React from 'react'
import { useClickOutside } from '../hooks/useClickOutside';
import Icon from './icons/Icon';
import styled from 'styled-components';

const inputProps = (props) => {
    return ({
        className: props.inputClassName,
        type: props.type,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        onInput: props.onInput,
        onClick: props.onClick,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onKeyUp: props.onKeyUp,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        readOnly: props.readOnly,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    })
}

export const ClassicInput = (props) => {
    const { useRef, value, defaultValue, className, cross, onClean } = props
    return (
        <InputClassic className={`${className ? 'classic-input ' + className : 'classic-input'}`}>
            <input
                ref={useRef}
                {...inputProps(props)}
            />
            {cross &&
                ((value || defaultValue) &&
                    (value?.length > 0 || defaultValue?.length > 0)) && (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" className="cross" />
                    </div>
                )}
        </InputClassic>
    )
}

const InputClassic = styled.div`
    position      : relative;
    display       : flex;
    align-items   : center;
    z-index       : 10;
    border        : 1px solid transparent;
    border-radius : var(--rounded-sm);
    box-shadow    : var(--shadow-tiny);

    input {
        display       : block;
        height        : 44px;
        padding       : 8px 12px;
        color         : var(--input-text);
        background    : var(--input);
        border-radius : var(--rounded-sm);
        border        : none;
        outline       : none;
        z-index       : 10;

        &::placeholder {
            color       : var(--placeholder);
            font-weight : 600;
        }

        &:focus {
            border : 1px solid var(--primary);
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 10px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--text-tertiary);
        }

        &:hover {
            background : var(--content-light);
        }
    }

    &.succes {
        input {
            background : rgba(var(--green-rgb), 0.07);
        }
    }
    &.err {
        input {
            background : rgba(var(--red-rgb), 0.1);
        }
    }
`

/**
 * 
 */

export const DropdownInput = (props) => {
    const { value, className, onClean, cross } = props
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef()
    useClickOutside(ref, () => setOpen(false))

    return (
        <InputDropdown ref={ref} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`}>
            <input
                {...inputProps(props)}
                onClick={() => setOpen(!open)}
            />
            {cross &&
                value &&
                value.length > 0 ? (
                <Icon name="Cross" className="cross" onClick={onClean} />
            ) : (
                <Icon name="CaretDown" />
            )}
            {open &&
                <div className="dropdown-input-choices custom-scrollbar" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
        </InputDropdown>
    )
}

const InputDropdown = styled.div`
    position      : relative;
    height        : 44px;
    width         : 100%;
    max-width     : 300px;
    background    : var(--input);
    border        : 1px solid transparent;
    border-radius : var(--rounded-sm);
    box-shadow    : var(--shadow-tiny);
    z-index       : 2;
    cursor        : pointer;

    input {
        padding            : 10px;
        color              : var(--input-text);
        background         : var(--input);
        border-radius      : var(--rounded-sm);
        outline            : none;
        border             : none;
        cursor             : pointer;
        width              : 85%;
        height             : 100%;
        text-overflow      : ellipsis;
        overflow           : hidden;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
        caret-color        : transparent;

        &::placeholder {
            color : var(--placeholder);
        }
    }

    svg {
        position : absolute;
        height   : 16px;
        width    : 16px;
        bottom   : 12px;
        right    : 10px;
        color    : var(--text-secondary);
        z-index  : 100;
    }

    .dropdown-input-choices {
        position      : absolute;
        left          : 0;
        width         : 100%;
        max-height    : 300px;
        overflow-y    : auto;
        margin-top    : 5px;
        background    : var(--input);
        box-shadow    : var(--shadow-two);
        border-radius : var(--rounded-sm);

        div,
        a {
            display : block;
            padding : 8px 12px;
            color   : var(--input-text);
            cursor  : pointer;

            &:hover {
                background-color : var(--content-light);
            }
        }
    }
`

/**
 * 
 */

export const Textarea = (props) => {
    const { className } = props
    return (
        <TextareaInput
            className={`${className ? "textarea " + className : "textarea"}`}
            {...inputProps(props)}
        />
    )
}

const TextareaInput = styled.textarea`
    display       : block;
    min-height    : 50px;
    height        : 200px;
    max-height    : 300px;
    overflow-y    : auto;
    padding       : 14px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);
    border        : 1px solid transparent;
    outline       : none;
    box-shadow    : var(--shadow-tiny);

    &::placeholder {
        color       : var(--placeholder);
        font-weight : 600;
    }

    &:focus {
        border : 1px solid var(--primary);
    }

    &:focus-visible {
        outline : none;
    }

    &::-webkit-scrollbar {
        width : 10px;
    }
    &::-webkit-scrollbar-track {
        background : transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 3px solid var(--content-light);
        border-radius    : 10px;
    }

    &::-webkit-scrollbar-corner {
        background : transparent;
    }

    &.succes {
        background : rgba(var(--green-rgb), 0.07);
    }
    &.err {
        background : rgba(var(--red-rgb), 0.1);
    }
`