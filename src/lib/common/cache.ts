export class MapArrayCache<K, V extends unknown[]> {
    private cache = new Map<K, V>();

    add(key: K, value: V[number]): void {
        if (!this.cache.has(key)) {
            this.cache.set(key, [] as unknown as V);
        }
        this.cache.get(key)!.push(value);
    }

    get(key: K): V | undefined {
        return this.cache.get(key);
    }
}