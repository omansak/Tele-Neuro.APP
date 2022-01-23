export class Helper {
    public static ToCurrencyNumber(value: any, currency: string = "₺", fixedCount: number = 2, locale: string = 'tr'): string {
        return Number(parseFloat(value).toFixed(fixedCount)).toLocaleString(locale, {
            minimumFractionDigits: fixedCount
        }) + currency;
    }

    public static Join(array: Array<string>, separator: string = ''): string {
        let stringBuilder: string[] = [];
        array?.forEach(i => {
            if (i) {
                stringBuilder.push(i);
                stringBuilder.push(separator);
            }
        })
        stringBuilder.pop();
        return stringBuilder.join('');
    }

    public static Round(value: number, precision: number) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    public static RandomString(length = 10): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let randomString = 'o';
        for (let i = 0; i < length - 1; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(randomNumber, randomNumber + 1);
        }
        return randomString;
    }

    public static ObjectKeyLength(o: any): number {
        return Object.keys(o).length;
    }

    public static ObjectKeyNotNullLength(o: any): number {
        let count = 0;
        Object.keys(o).forEach(i => {
            if (o[i]) {
                count++;
            }
        })
        return count;
    }

    public static ObjectsEqual(o1: any, o2: any): boolean {
        if (o2 === null && o1 !== null) return false;
        return o1 !== null && typeof o1 === 'object' && Object.keys(o1).length > 0 ?
            Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every(p => Helper.ObjectsEqual(o1[p], o2[p]))
            : (o1 !== null && Array.isArray(o1) && Array.isArray(o2) && !o1.length &&
                !o2.length) ? true : o1 === o2;
    }

    public static get IsInIframe(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    public static FormatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Byte';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    public static FormatSeconds(seconds: number, decimals = 2): string {
        if (Math.round(seconds) < 1) return '0 Sn';
        const k = 60;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Sn', 'Dk', 'Sa'];
        const i = Math.floor(Math.log(seconds) / Math.log(k));
        return parseFloat((seconds / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    public static UpDivision(x: number, y: number): number {
        if (y == 0)
            return 0;
        let z: number = x / y;
        return z > Math.round(z) ? Math.round((z + 1)) : Math.round(z);
    }

    public static Clone<T>(source: T): T {
        return Array.isArray(source)
            ? source.map(item => Helper.Clone(item))
            : source instanceof Date
                ? new Date(source.getTime())
                : source && typeof source === 'object'
                    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
                        Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
                        o[prop] = Helper.Clone((source as { [key: string]: any })[prop]);
                        return o;
                    }, Object.create(Object.getPrototypeOf(source)))
                    : source as T;
    }

    public static GroupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
        return list.reduce((previous, currentItem) => {
            const group = getKey(currentItem);
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        }, {} as Record<K, T[]>);
    }

    public static ChunkArray(array: Array<any>, chunkSize: number): Array<Array<any>> {
        return Array.from(Array(Math.ceil(array.length / chunkSize)), (_, i) => array.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
}
