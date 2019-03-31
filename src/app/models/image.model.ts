export interface ProfileImage {
  id?: string;
  title?: string;
  description?: string;
  isPublic?: string;
  type?: string;
  file: any;
  fileName?: any;
}

export interface ImageResponse {
  id: string;
  fileName: string;
}
