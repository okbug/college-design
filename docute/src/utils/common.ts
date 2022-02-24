export const debounce = (fn: (...args: any) => void, time: number = 30) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, time)
    }
}