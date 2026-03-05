export const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t
}

export const clamp = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max)
}
