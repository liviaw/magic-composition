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

let videoValidExt = ["mp4", ".mov", "wmv", "flv"];
export const isVideo = (fileName: string) => {

    if (fileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < videoValidExt.length; j++) {
            var sCurExtension = videoValidExt[j];
            if (fileName.substr(fileName.length - sCurExtension.length, fileName.length).toLowerCase() === sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        return blnValid;
    }
}
var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];    
export const isImage = (fileName: string) => {

    if (fileName.length > 0) {
        let blnValid:boolean = false;
        for (let j = 0; j < _validFileExtensions.length; j++) {
            let sCurExtension = _validFileExtensions[j];
            if (fileName.substr(fileName.length - sCurExtension.length, fileName.length).toLowerCase() === sCurExtension.toLowerCase()) {
                // alert(sCurExtension + " huh " + fileName.substr(fileName.length - sCurExtension.length, fileName.length).toLowerCase());
                // alert(typeof sCurExtension + typeof fileName.substr(fileName.length - sCurExtension.length, fileName.length).toLowerCase());
                blnValid = true;
                break;
            }
        }
        return blnValid;
        
        if (blnValid === false) {
            alert("hi " + blnValid);
            // alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            return false;
        }
    }
}
// function Validate(oForm) {
//     var arrInputs = oForm.getElementsByTagName("input");
//     for (var i = 0; i < arrInputs.length; i++) {
//         var oInput = arrInputs[i];
//         if (oInput.type == "file") {
//             var sFileName = oInput.value;
//             if (sFileName.length > 0) {
//                 var blnValid = false;
//                 for (var j = 0; j < _validFileExtensions.length; j++) {
//                     var sCurExtension = _validFileExtensions[j];
//                     if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
//                         blnValid = true;
//                         break;
//                     }
//                 }
                
//                 if (!blnValid) {
//                     alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
//                     return false;
//                 }
//             }
//         }
//     }
  
//     return true;
// }

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);