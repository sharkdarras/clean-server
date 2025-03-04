export enum MimeType {
  // Text-based MIME types
  PlainText = "text/plain",
  Html = "text/html",
  Css = "text/css",
  JavaScript = "text/javascript",
  Csv = "text/csv",

  // Application-based MIME types
  Json = "application/json",
  Xml = "application/xml",
  Pdf = "application/pdf",
  Zip = "application/zip",
  FormUrlEncoded = "application/x-www-form-urlencoded",
  OctetStream = "application/octet-stream",

  // Image-based MIME types
  Jpeg = "image/jpeg",
  Png = "image/png",
  Gif = "image/gif",
  Webp = "image/webp",
  Bmp = "image/bmp",

  // Audio-based MIME types
  Mp3 = "audio/mpeg",
  Wav = "audio/wav",
  Ogg = "audio/ogg",

  // Video-based MIME types
  Mp4 = "video/mp4",
  Webm = "video/webm",
  Mpeg = "video/mpeg",

  // Multipart MIME types (common in file uploads)
  FormData = "multipart/form-data",
}
