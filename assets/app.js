// IE9+ event, IE10+ XMLHttpRequest 2.0
document.addEventListener('DOMContentLoaded', function(e) {
    var box = document.getElementById('box');
    var message = document.getElementById('message');
    var listgroup = document.querySelector('.list-group');
    var em = document.querySelector('.list-group .empty');

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
        counter = 0;
        box.classList.remove('active');

        var dt = e.dataTransfer;

        if(dt.files.length > 0) {
            if(!/hide/.test(em.className)) {
                em.classList.add('hide');
                listgroup.classList.add('borderred');
            } 

            // upload every files
            [].forEach.call(dt.files, function(file) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append('file', file, file.name);

                // append list-item
                var item = document.createElement('li');
                item.className = 'item';
                var entry = document.createElement('div');
                entry.className = 'clearfix';
                var filename = document.createElement('span');
                filename.className = 'filename';
                filename.textContent = file.name;
                var message = document.createElement('span');
                message.className = 'status';
                entry.appendChild(message);
                entry.appendChild(filename);
                item.appendChild(entry);
                var progressEle = document.createElement('div');
                progressEle.className = 'progress';
                item.appendChild(progressEle);

                listgroup.insertBefore(item, listgroup.childNodes[0]);

                // init progress bar
                var progress = new Progress(progressEle);

                xhr.open('POST', '/upload'); // async default
                xhr.upload.onprogress = function(e) {
                    // update progress bar
                    var per = ( e.loaded / e.total ) * 100;
                    progress.value = per;
                };
                xhr.onload = function(e) {
                    progress.value = 100; // ensure the progress fulfilled
                    message.classList.add('success');
                    message.textContent = 'Uploaded!';
                };
                xhr.onerror = function(e) {
                    message.classList.add('danger');
                    message.textContent = 'Failed.';
                };
                xhr.send(formData);
            });
        };
    });
});
