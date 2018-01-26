export class ImageViewModel {
    constructor(coverImage: string, coverIsBase64: boolean){
        this.coverImage = coverImage;
        this.imageIsBase64 = coverIsBase64;
    }
    coverImage: string;
    imageIsBase64: boolean;
}
