const btn = document.getElementById('downloadImage'); 

 $(document).ready(function () {
    $("body").delegate( "#downloadImage", "click", function() {
      event.preventDefault();
      
    var url= $(this).attr('data'); 
      downloadImage(url);
    })

})
function downloadImage(url) { 
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
toDataURL(url)
  .then(dataUrl => {
    console.log(dataUrl);
    const linkSource = 'data:image/png'+';base64'+dataUrl;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = mainKeywordVal ? mainKeywordVal + '.jpg' : '123ContentImage.png';
    downloadLink.click();
  })
  
}

