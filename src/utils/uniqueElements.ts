export const uniqueElements = <T>(objects: T[], uniqueBy: (keyof T)[], keepFirst = true) => {
    return Array.from(
        objects.reduce((map, e) => {
            let key = uniqueBy.map(key => [e[key], typeof e[key]]).flat().join('-')
            if (keepFirst && map.has(key)) return map
            return map.set(key, e)
        }, new Map()).values()
    )
}
