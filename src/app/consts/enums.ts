export enum StatusType {
    Success = "Success",
    Error = "Error",
    Warning = "Warning",
    Waiting = "Waiting",
    NotYetStarted = "NotYetStarted"
}
export enum FileType {
    Image = "image",
    Video = "video",
    Audio = "audio",
    Text = "text",
    Unknown = "unknown"
}

export const ConvertNumberToFileType = (value: number): FileType => {
    switch (value) {
        case 1:
            return FileType.Image;
        case 3:
            return FileType.Video;
        default:
            return FileType.Unknown;
    }
}