
const uploadbox = document.querySelector(".upload-box");
const fileInput = uploadbox.querySelector("input");
const prevviewing = uploadbox.querySelector("img");
const widthInput = document.querySelector(".column-width input");
const heightInput = document.querySelector(".column-height input");
const qualityInput = document.querySelector(".column-quality input");
const ratioInput = document.querySelector(".column-ratio input");
const downloadBtn = document.querySelector(".download-btn")
let ogratio;

const loadfile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    prevviewing.src = URL.createObjectURL(file);
    prevviewing.addEventListener("load", () => {
        widthInput.value = prevviewing.naturalWidth;
        heightInput.value = prevviewing.naturalHeight;
        ogratio = prevviewing.naturalWidth / prevviewing.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
};

widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogratio : heightInput.value;
    heightInput.value = height;
});


heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value * ogratio : widthInput.value;
    widthInput.value = width;
});




const resizing = () =>{
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality  = qualityInput.checked ? 0.7 : 1.0

    canvas.width=widthInput.value;
    canvas.height =heightInput.value;

    ctx.drawImage(prevviewing,0,0,canvas.width,canvas.height);

    a.href = canvas.toDataURL("image/jpeg",imgQuality);
    a.download = new Date().getTime();
    a.click();
}   

downloadBtn.addEventListener("click",resizing)
fileInput.addEventListener("change", loadfile);
uploadbox.addEventListener("click", () => {
    fileInput.click();
});
