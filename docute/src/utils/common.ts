export const debounce = (fn: (...args: any) => void, time: number = 30) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, time)
    }
}

export const replaceHTMLClass = (str: string, className: string = 'doc-title') => {
    for (let level = 1; level < 7; level++) {
        str = str.replaceAll(`<h${level}>`, `<h${level} class="${className}${level}">`)
    }

    return str;
}