// 除了 hover 时， popup 都是使用 click 结束 close 的
// hover
export function getHoverEvents(setIsOpen) {
    const onMouseEnter = () => {
        setIsOpen(() => true);
    };
    const onMouseLeave = () => {
        setIsOpen(() => false);
    };
    return [
        { onMouseEnter, onMouseLeave },
        { onMouseEnter, onMouseLeave },
    ];
}
// click
export function getClickEvents(setIsOpen) {
    const onClick = () => {
        setIsOpen(state => !state);
    };
    return [{ onClick }, {}];
}
// focus
export function getFocusEvents(setIsOpen) {
    const onFocus = () => {
        setIsOpen(() => true);
    };
    const onBlur = () => {
        setIsOpen(() => false);
    };
    return [{ onBlur, onFocus }, {}];
}
// contextmenu
export function getContextMenuEvents(setIsOpen) {
    const onContextMenu = (e) => {
        e.preventDefault();
        setIsOpen(state => !state);
    };
    return [{ onContextMenu }, {}];
}
