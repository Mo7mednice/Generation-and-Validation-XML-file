$(document).ready(function () {
  $("#validateDTD").click(function () {
    var fileInput = $("#xmlFileInput1")[0];
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload_dtd", true);
        xhr.setRequestHeader("Content-Type", "application/xml");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              downloadFile(response.dtdContent, "validation.dtd");
            }
          }
        };
        xhr.responseType = "blob";
        xhr.send(new Blob([e.target.result]));
      };
      reader.readAsText(file);
    }
  });

  $("#validateXSD").click(function () {
    var fileInput = $("#xmlFileInput2")[0];
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload_xsd", true);
        xhr.setRequestHeader("Content-Type", "application/xml");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              downloadFile(response.xsd_Content, "validation.xsd");
            }
          }
        };
        xhr.responseType = "blob";
        xhr.send(new Blob([e.target.result]));
      };
      reader.readAsText(file);
    }
  });
});

function downloadFile(content, fileName) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
