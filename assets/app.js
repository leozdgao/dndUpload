// IE9+ event
document.addEventListener('DOMContentLoaded', function(e) {
    var box = document.getElementById('box');
    var message = document.getElementById('message');

    // let drop work
    box.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    // effect
    var counter = 0;
    box.addEventListener('dragenter', function(e) {
        counter++;
        box.classList.add('active');
    });
    box.addEventListener('dragleave', function(e) {
        counter--;
        if(!counter) box.classList.remove('active');
    });

    // handle drop
    box.addEventListener('drop', function(e) {
        e.preventDefault();

        if(window.FileReader) {
            var reader = new FileReader();
            var xhr = new XMLHttpRequest();
            var dt = e.dataTransfer;

            if(dt.files.length > 0) {

                var formData = new FormData();
                [].forEach.call(dt.files, function(file) {
                    formData.append('file', file, file.name);
                });

                xhr.open('POST', '/upload'); // async default
                xhr.upload.onprogress = function(e) {
                    // update progress bar
                    console.log(e);
                };
                xhr.onload = function(e) {
                    console.log(e);
                };
                xhr.send(formData);
            }   
        }
        else {
            message.textContent = "Your browser doesn't support this functionality.";
        }
    });
});
