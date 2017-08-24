/**
 * @file 用于提供 react helper 直接用 js 写 UI
 * @author Caiyu, Liang, Chengxing, Jun Wu
 */

var React = require('react');
var createElement = React.createElement.bind(React);

/* global __DEVELOPMENT__ */

// mute the __DEVELOPMENT__ if it's not actually set
if (typeof window.__DEVELOPMENT__) {
    window.__DEVELOPMENT__ = undefined;
}
/**
 *
 * @start-def: reactHyper: (tagOrComp, classNameOrProps, props, ...content) => ReactElement
 *  ///
 *  This is for matching the first argument of React.createElement
 *
 *      e.g. 'div', 'span' | YouReactComponent
 *  ///
 *  tagOrComp: string | ReactClass
 *
 *  // Could be string for a shortcut of props.className or the actual props object
 *  classNameOrProps: string | {...props}
 *
 *  // if .classNameOrProps is set as string, this should be an object representing the props for createElement
 *  // otherwise, you can start placing ReactElement here.
 *  props: {} | ReactElement
 */
var reactHyper = function (tagOrComp, classNameOrProps, props /* , ...ReactElements */) {

    // for development env, we validate the call to the hyper helper function
    if (__DEVELOPMENT__) {
        if ((classNameOrProps && classNameOrProps.$$typeof)
            || (typeof classNameOrProps === 'string'
            && (props && props.$$typeof || (typeof props !== 'object' && props)))
        ) {
            console.error('[ERROR] helper is not called in a right way. Usage: `h.div(\'class-name\', {props}, ...)` \n' +
                'OR `h.div({props}, ...)` \n' +
                'OR `h(YourComponent, \'classname\', {props}, ...)`\n' +
                'OR `h(YourComponent, {props}, ...) \n' +
                'NOTE: the `{props}` is always required', tagOrComp);
        }
    }

    if (typeof classNameOrProps === 'object') {
        return createElement.apply(null, arguments);
    }
    else {
        props = props || {};
        props.className = props.className || classNameOrProps;
        var args = [tagOrComp, props].concat(Array.prototype.slice.apply(arguments, 3));
        return createElement.apply(null, args);
    }
};

/**
 * These are shortcuts for commonly used html tags, e.g. `h.div({props}, ...)` equals to `h('div', {props}, ...)`
 *
 * @def: .tag: (classNameOrProps, props, ...ReactElements) => ReactElement
 */
[
    // common
    'div',
    'span',
    'a',
    'img',
    'pre',

    // headings
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',

    // table related
    'table',
    'thead',
    'tbody',
    'th',
    'tr',
    'td',

    // semantic tags
    'aside',
    'header',
    'footer',
    'section',
    'article',

    // inline styles
    'em',
    'strong',

    // not recommended
    'i',
    'b',

    // form related
    'label',
    'input',
    'button',
    'textarea',
    'p',
    'select',
    'option',
    'form',

    // list related
    'ul',
    'ol',
    'li',

    // media related
    'video',
    'audio',

    // others
    'iframe',
    'colgroup',
    'col',
    'area'
].forEach(function (tag) {
    reactHyper[tag] = reactHyper.bind(null, tag);
});

/**
 * Just a way to please some babel loader ;)
 *
 * @def: .default: reactHyper
 */
reactHyper.default = reactHyper;

module.exports = reactHyper;