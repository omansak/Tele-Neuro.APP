import { Base64 } from './base64';

export class LocalStorageHelper {

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setBooleanItem(key: string, value: boolean): void {
        localStorage.setItem(key, String(value));
    }

    getBooleanItem(key: string): boolean | null {
        return localStorage.getItem(key) == null ? null : !!localStorage.getItem(key);
    }

    setNumberItem(key: string, value: number): void {
        localStorage.setItem(key, value.toString());
    }

    getNumberItem(key: string): number {
        return parseInt(localStorage.getItem(key) ?? "0");
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    setObject(key: string, obj: any) {
        this.setItem(key, new Base64().encode(JSON.stringify(obj)) ?? "");
    }

    getJson(key: string): any {
        let item = this.getItem(key);
        if (item)
            return new Base64().decode(item);
        else
            return null;
    }

    getJsonObject(key: string): any {
        let item = this.getJson(key);
        if (item)
            return JSON.parse(item);
        else
            return null;
    }

    getObject<T>(cls: { new(): T }, key: string): T | null {
        let item = this.getJsonObject(key)
        if (item)
            return Object.assign(new cls(), item);
        else
            return null;
    }
}