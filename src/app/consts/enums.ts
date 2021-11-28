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

export enum LogLevel {
    Important = 5,
    Error = 4,
    Warning = 3,
    Info = 2,
    Trace = 1,
    Access = 0,
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