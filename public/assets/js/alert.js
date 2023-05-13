

    
    
    function erroralert(message){
        toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 1000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr.error(message, 'Error');
    }

    function infoalert(message){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 1000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }
            toastr["info"](message, "Message")
    }

    function warningalert(message){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 1000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }
            toastr["warning"](message, "Warning!")
    }


    function successalert(message){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 1000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }
            toastr["success"](message, "Success!")
    }

    // try{

    var firebaseConfig = {
        apiKey: "AIzaSyDm3wPO6QhN0ezPF6hNprGw4C68Lef31fY",
        authDomain: "test-f98fd.firebaseapp.com",
        projectId: "test-f98fd",
        storageBucket: "test-f98fd.appspot.com",
        messagingSenderId: "533575527457",
        appId: "1:533575527457:web:0131ad8ed9712049304760"
      };
      
      firebase.initializeApp(firebaseConfig);
      
      function handleFileUpload(file, fileName) {
        return new Promise(function (resolve, reject) {
          var fileSize = file.size / 1024 / 1024;
          if (fileSize > 5) {
            erroralert("File size exceeds the limit of 5 MB.");
            return;
          }
      
          var storageRef = firebase.storage().ref();
          var fileRef = storageRef.child(fileName + '/' + file.name);
          var uploadTask = fileRef.put(file);
      
          uploadTask.on(
            'state_changed',
            null,
            null,
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  document.getElementById(fileName).value = downloadURL;
                  resolve(downloadURL);
                })
                .catch(function (error) {
                  reject(error);
                });
            }
          );
        });
      }
      
      
      
      function handleImageUpload(file, fileName) {
        return new Promise(function (resolve, reject) {
          if (!file.type.startsWith('image/')) {
            erroralert("Only image files are allowed.");
            return;
          }
      
          var fileSize = file.size / 1024 / 1024;
          if (fileSize > 5) {
            erroralert("Image size exceeds the limit of 5 MB.");
            return;
          }
      
          var storageRef = firebase.storage().ref();
          var fileRef = storageRef.child(fileName + '/' + file.name);
          var uploadTask = fileRef.put(file);
      
          uploadTask.on(
            'state_changed',
            null,
            null,
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  document.getElementById(fileName).value = downloadURL;
                  resolve(downloadURL);
                })
                .catch(function (error) {
                  reject(error);
                });
            }
          );
        });
      }
      
    // }catch{}
      
      