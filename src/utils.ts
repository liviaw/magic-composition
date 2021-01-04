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

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);