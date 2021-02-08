export default function debounce(fn, delay) {
    let timer
    let context = this
    return function (...arg) {
        if(timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
            return fn.apply(context, arg)
        }, delay)
    }
}