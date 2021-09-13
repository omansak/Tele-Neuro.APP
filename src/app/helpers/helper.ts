export class Helper {
    public static ToCurrencyNumber(value: any, currency: string = "₺", fixedCount: number = 2, locale: string = 'tr'): string {
        return Number(parseFloat(value).toFixed(fixedCount)).toLocaleString(locale, {
            minimumFractionDigits: fixedCount
        }) + currency;
    }

    public static Join(array: Array<string>, seperator: string = ''): String {
        let stringBuilder: string[] = [];
        array?.forEach(i => {
            if (i) {
                stringBuilder.push(i);
                stringBuilder.push(seperator);
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
        let randomstring = 'o';
        for (let i = 0; i < length - 1; i++) {
            const rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
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

    public static FormatBytes(bytes: any, decimals = 2): string {
        if (bytes === 0) return '0 Byte';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
