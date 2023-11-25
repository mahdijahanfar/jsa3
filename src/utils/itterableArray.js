export const itterableArray = (from, to) => {
    from = Number(from)
    to = Number(to)
    if (typeof (from) === 'number' && typeof (to) === 'number') {
        const arr = []
        for (let index = 0; index <= Math.abs(from - to); index++) {
            if (from <= to) {
                arr.push((index + from).toString())
            } else {
                arr.push((from - index).toString())
            }

        }
        return arr
    }



}