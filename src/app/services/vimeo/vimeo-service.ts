import { Injectable } from "@angular/core";
import { VimeoThumbnail } from "src/app/models/utility/vimeo-thumbnail";

@Injectable()
export class VimeoService {
    private static ThumbnailCache: { [key: string]: VimeoThumbnail; } = {};

    public async getVimeoVideoThumbnail(id: string): Promise<VimeoThumbnail> {
        if (!VimeoService.ThumbnailCache[id]) {
            await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
                .then(response => response.json())
                .then(data => {
                    if (data && data[0]) {
                        VimeoService.ThumbnailCache[id] = <VimeoThumbnail>data[0];
                    }
                });
        }
        return VimeoService.ThumbnailCache[id];
    }
}