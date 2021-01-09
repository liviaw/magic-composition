export const saveToLocal = () => {
    var reader: FileReader = new FileReader();
    reader.onload = function (e) {
        console.log(reader.result + '->' + typeof reader.result)
        const thisImage: string | ArrayBuffer | null = reader.result;
        if (typeof thisImage === "string") {
            localStorage.setItem("imgData", thisImage);
        }
    };
    // reader.readAsDataURL(this.files[0]);

}

let imageFormat = new RegExp('image/*');
let videoFormat = new RegExp('video/*');
export const isImage = (file: File) => {
    return imageFormat.test(file.type)
}

export const isVideo = (file: File) => {
    return videoFormat.test(file.type)
}

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);