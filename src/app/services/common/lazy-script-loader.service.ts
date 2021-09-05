import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LazyLoaderService {
    private static LoadedLibraries: { [url: string]: ReplaySubject<void> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: Document) { }

    loadScript(url: string, async: boolean = false, defer: boolean = false): Observable<void> {
        if (LazyLoaderService.LoadedLibraries[url]) {
            return LazyLoaderService.LoadedLibraries[url].asObservable();
        }
        LazyLoaderService.LoadedLibraries[url] = new ReplaySubject();
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = async;
        script.defer = defer;
        script.onload = () => {
            LazyLoaderService.LoadedLibraries[url].next();
            LazyLoaderService.LoadedLibraries[url].complete();
        };
        this.document.body.appendChild(script);
        return LazyLoaderService.LoadedLibraries[url].asObservable();
    }

    loadStyle(url: string): Observable<void> {
        if (LazyLoaderService.LoadedLibraries[url]) {
            return LazyLoaderService.LoadedLibraries[url].asObservable();
        }
        LazyLoaderService.LoadedLibraries[url] = new ReplaySubject();
        const style = this.document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = url;
        style.onload = () => {
            LazyLoaderService.LoadedLibraries[url].next();
            LazyLoaderService.LoadedLibraries[url].complete();
        };
        document.head.appendChild(style);
        return LazyLoaderService.LoadedLibraries[url].asObservable();
    }
}