/**
 * @file 用于提供 react helper 直接用 js 写 UI
 * @author Caiyu, Liang, Chengxing, Jun Wu
 */

var React = require('react');
var createElement = React.createElement.bind(React);
var reactHyper;

;(function (global) {
    /* global __DEVELOPMENT__ */

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
    reactHyper = function (tagOrComp, classNameOrProps, props /* , ...ReactElements */) {

        // for development env, we validate the call to the hyper helper function
        if (global.__DEVELOPMENT__ || (typeof __DEVELOPMENT__ !== 'undefined' && __DEVELOPMENT__)) {
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
            var args;
            if (arguments.length > 3) {
                args = [tagOrComp, props].concat(Array.prototype.slice.call(arguments, 3));
            }
            else {
                args = [tagOrComp, props];
            }
            return createElement.apply(null, args);
        }
    };

    /**
     * These are shortcuts for commonly used html tags, e.g. `h.div({props}, ...)` equals to `h('div', {props}, ...)`
     *
     * @def: .tag: (classNameOrProps, props, ...ReactElements) => ReactElement
     */
    [
       // doc meta
        'link', 'meta', 'style', 'title',

        // section root
        'body',

        // content section
        'address', 'article', 'aside', 'footer', 'header',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'hgroup',
        'nav', 'section',

        // text content
        'blockquote', 'dd', 'dir', 'dt', 'div', 'dl',
        'figcaption', 'figure', 'hr',
        'ul', 'ol', 'li',
        'p',
        'main',
        'pre',

        // inline text
        'span',
        'a', 'abbr',
        'bdi', 'bdo', 'br',
        'cite', 'code', 'data', 'dfn', 'em',
        'b', 'i', 's',
        'kdb',
        'mark', 'q',
        'rp', 'rt', 'rtc',
        'samp',
        'small',
        'strong', 'sub', 'time',
        'tt', 'u', 'var', 'wbr',

        // image and multimedia
        'area', 'audio', 'img', 'map', 'track', 'video',

        // embedded content
        'applet', 'embed', 'iframe', 'noembed', 'object', 'param', 'picture', 'source',

        // scripting
        'canvas', 'noscript', 'script',

        // demarcating edits
        'del', 'ins',

        // table
        'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',

        // forms
        'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup',
        'option', 'output', 'progress', 'select', 'textarea',

        // interactive elements
        'details', 'dialog', 'menu', 'menuitem', 'summary',

        // web components
        'content', 'elements', 'shadow', 'slot', 'template'
    ].forEach(function (tag) {
        reactHyper[tag] = reactHyper.bind(null, tag);
    });
})(
    typeof window !== 'undefined' ? window :
        typeof global !== 'undefined' ? global : {}
);

/**
 * Just a way to please some babel loader ;)
 *
 * @def: .default: reactHyper
 */
reactHyper.default = reactHyper;

module.exports = reactHyper;