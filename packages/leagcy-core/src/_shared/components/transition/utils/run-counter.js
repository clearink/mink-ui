export default function runCounter(counter, callback) {
    let count = 0;
    return (...args) => { ++count >= counter && callback(...args); };
}
