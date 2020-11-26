export default function (target: {}, ...restTarget: Array<object>) {
    for (let i = 0; i < restTarget.length; i++) {
        let source = restTarget[i]
        for (let key in source) {
            target[key] = source[key]
        }
    }
    return target
}
