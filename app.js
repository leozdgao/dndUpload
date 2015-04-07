// IE9+ event
document.addEventListener('DOMContentLoaded', function(e) {
    var box = document.getElementById('box');
    var message = document.getElementById('message');
    box.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    box.addEventListener('drop', function(e) {
        e.preventDefault();

        if(window.FileReader) {
            var reader = new FileReader();
            var xhr = new XMLHttpRequest();
            var dt = e.dataTransfer;
            var file = dt.files[0];

            if(file) {

                // xhr.send(file); // send blob?

                reader.readAsArrayBuffer(file);
                reader.onload = function() {
                    var buffer = this.result;
                    // upload
                    xhr.open('POST', '/upload'); // async default
                    xhr.setRequestHeader();
                    xhr.send(buffer);
                };
                reader.onerror = function() {
                    message.textContent = 'File ' + file.name + ' loading failed.';
                };
            }   
        }
        else {
            message.textContent = "Your browser doesn't support this functionality."
        }
    });
});
