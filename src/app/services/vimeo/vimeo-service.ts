import { Injectable } from "@angular/core";
import { VimeoEmbedObject } from "src/app/models/utility/vimeo-thumbnail";

@Injectable()
export class VimeoService {
    private static ThumbnailCache: { [key: string]: VimeoEmbedObject; } = {};

    public async getVimeoVideoThumbnail(id: string): Promise<VimeoEmbedObject> {
        if (!VimeoService.ThumbnailCache[id]) {
            await fetch('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + id)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        VimeoService.ThumbnailCache[id] = <VimeoEmbedObject>data;
                    }
                });
        }
        return VimeoService.ThumbnailCache[id];
    }
}