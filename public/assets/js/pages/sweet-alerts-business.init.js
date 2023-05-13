/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Sweetalert Js File
*/

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    SweetAlert.prototype.init = function () {

        //Basic
        $('#sa-basic').on('click', function () {
            Swal.fire(
                {
                    title: 'Any fool can use a computer',
                    confirmButtonColor: '#5664d2',
                }
            )
        });

        //A title with a text under
        $('#sa-title').click(function () {
            Swal.fire(
                {
                    title: "The Internet?",
                    text: 'That thing is still around?',
                    icon: 'question',
                    confirmButtonColor: '#5664d2'
                }
            )
        });

        //Success Message
        $('#sa-success').click(function () {
            Swal.fire(
                {
                    title: 'Good job!',
                    text: 'You clicked the button!',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#5664d2',
                    cancelButtonColor: "#ff3d60"
                }
            )
        });

        //Warning Message
        $('#sa-warning').click(function () {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, delete it!"
              }).then(function (result) {
                if (result.value) {
                  Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            });
        });

        //Parameter
        $('#sa-params').click(function () {
			Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success mt-2',
                cancelButtonClass: 'btn btn-danger ms-2 mt-2',
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                      title: 'Deleted!',
                      text: 'Your file has been deleted.',
                      icon: 'success'
                    })
                  } else if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire({
                      title: 'Cancelled',
                      text: 'Your imaginary file is safe :)',
                      icon: 'error'
                    })
                  }
            });
        });

        //Custom Image
        $('#sa-image').click(function () {
            Swal.fire({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: 'assets/images/logo-dark.png',
                imageHeight: 20,
                confirmButtonColor: "#5664d2",
                animation: false
            })
        });
		
        //Auto Close Timer
        $('#sa-close').click(function () {
            var timerInterval;
            Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <strong></strong> seconds.',
            timer: 2000,
            confirmButtonColor: "#5664d2",
            onBeforeOpen:function () {
                Swal.showLoading()
                timerInterval = setInterval(function() {
                Swal.getContent().querySelector('strong')
                    .textContent = Swal.getTimerLeft()
                }, 100)
            },
            onClose: function () {
                clearInterval(timerInterval)
            }
            }).then(function (result) {
            if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.timer
            ) {
                console.log('I was closed by the timer')
            }
            })
        });



        //custom html alert
        $('#custom-html-alert').click(function () {
            Swal.fire({
                title: '<i>HTML</i> <u>example</u>',
                icon: 'info',
                html: 'You can use <b>bold text</b>, ' +
                '<a href="//themesdesign.in/">links</a> ' +
                'and other HTML tags',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger ml-1',
                confirmButtonColor: "#47bd9a",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: '<i class="fas fa-thumbs-up me-1"></i> Great!',
                cancelButtonText: '<i class="fas fa-thumbs-down"></i>'
            })
        });

        //position
        $('#sa-position').click(function () {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        });

        //Custom width padding
        $('#custom-padding-width-alert').click(function () {
            Swal.fire({
                title: 'Custom width, padding, background.',
                width: 600,
                padding: 100,
                confirmButtonColor: "#5664d2",
                background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
            })
        });

        //Ajax



        // Users

        function alertmessage(id,message,hint){
            Swal.fire({
                icon: 'error',
                title: message,
                confirmButtonColor: "#5664d2",
                html: hint  
            }).then((result) => {
                if (result.isConfirmed) {
                    $(id).focus()
                }
            });
        }



        $('#next1').click(function () {

            var company_name = document.getElementById("company_name").value;
            var company_website = document.getElementById("website").value;
            var company_email = document.getElementById("company_email").value;
            var company_phone = document.getElementById("company_phone").value;
            var overview = document.getElementsByClassName("overview")[0].value;
            var keywords = document.getElementsByClassName("keywords")[0].value;
            var logo = document.getElementById("logoimage").src;
            var countries = Array.from(document.getElementById('countries').selectedOptions).map(option => option.value);
            var categories = Array.from(document.getElementById('categories').selectedOptions).map(option => option.value);

            if(!company_name)   alertmessage("#company_name","Company Name Can not Be Empty","Please Enter Company Name")
            else if(!company_email)   alertmessage("#company_email","Company Email Can not Be Empty","Please Enter Company Email")
            else if(!company_website)   alertmessage("#website","Company Website Can not Be Empty","Please Enter Company Website")
            else if(!company_phone)   alertmessage("#company_phone","Company Phone Can not Be Empty","Please Enter Your Company's Contact Number")
            else if(!overview)   alertmessage(".overview","Company Overview Can not Be Empty","Please Enter Company's Overview")
            else if(!keywords)   alertmessage(".keywords","Company Keywords Can not Be Empty","Please Add Alteast one keyword, Seprate keywords with ','")
            else if(countries.length==0)   alertmessage("#countries","Country is empty","Please Enter The Countries Details Which you Deal in")
            else if(categories.length==0)   alertmessage("#categories","Categories Can not Be Empty","Please Select Categories Which You Deal in")
            else{
                $.ajax({
                    url: '/step1',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                    company_name:company_name,
                    company_website:company_website,
                    company_email:company_email,
                    company_phone:company_phone,
                    overview:overview,
                    keywords:keywords,
                    logo:logo,
                    countries:countries,
                    categories:categories 
                }),
                    success: function(response) {
                      console.log(response)
                    }
                });
            }


            

        });

        console.log("connected")

        
        $('#next2').click(function () {

            const elements = document.querySelectorAll('.uploadedimage');
            const images = [];
            for (let i = 0; i < elements.length; i++) {
                images.push(elements[i].src);
            }
            console.log(images)
            if(imagecount()>=4){
                $.ajax({
                    url: '/step2',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        images: images,
                        company_id: 30
                    }),
                    success: function(response) {
                        console.log(response)
                        if(response.status==true){
                            location.reload()
                        }
                    }
                });
            }else{
                infoalert("Please Select Min 4 Images")
            }
        });
        
        






        // STEP 3
        

        
        $('#next3').click(function () {

            var current_location = document.getElementById("current_location").value;
            var gst = document.getElementById("gst").value;
            var udyam = document.getElementById("udyam").value;
            var city = document.getElementById("city").value;
            var state = document.getElementById("state").value;
            var pincode = document.getElementById("pincode").value;
            var address = document.getElementById("address").value;

            console.log(state)

                 if(!gst)   alertmessage("#gst","GST Number is Empty","Please Enter GST Number")
            else if(!city)   alertmessage("#city","City is Empty","Please Enter Your City")
            else if(!state)   alertmessage("#state","State is Empty","Please Enter Your State")
            else if(!pincode)   alertmessage("#pincode","Pincode Is Empty","Please Enter Pincode")
            else if(!address)   alertmessage("#address","Address is Empty","Please Enter Your Complete Address")
            else{
                $.ajax({
                    url: '/step3',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        current_location: current_location,
                        gst: gst,
                        udyam: udyam,
                        city: city,
                        state: state,
                        pincode: pincode,
                        address : address
                }),
                    success: function(response) {
                      console.log(response)
                    }
                });
            }
        });

        
        $('#next4').click(function () {
            var youtube = document.getElementById("youtube").value;
            var facebook = document.getElementById("facebook").value;
            var instagram = document.getElementById("instagram").value;
            var google = document.getElementById("google").value;

            const openingHours = [
                { day: 1, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 2, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 3, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 4, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 5, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 6, open: true, from: '09:00:00', to: '18:00:00' },
                { day: 7, open: true, from: '09:00:00', to: '18:00:00' },
              ];

              openingHours.forEach((day, index) => {
                const open = $(`input[name=status${index + 1}]:checked`).val() === 'on';
                const from = $(`#from${index + 1}`).val();
                const to = $(`#to${index + 1}`).val();
                day.open = open;
                day.from = from;
                day.to = to;
              });

              if(!youtube) {alertmessage("#youtube","Youtube Link Not Provided","Please Enter Youtube Link")}
              else{

                $.ajax({
                    url: '/step4',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        instagram:instagram,
                        facebook:facebook,
                        youtube:youtube,
                        google:google,
                        openingHours:openingHours
                    }),
                    success: function(response) {
                      console.log(response)
                    }
                });
            }
            
        });


 







// Step 5




var firebaseConfig = {
    apiKey: "AIzaSyDm3wPO6QhN0ezPF6hNprGw4C68Lef31fY",
    authDomain: "test-f98fd.firebaseapp.com",
    projectId: "test-f98fd",
    storageBucket: "test-f98fd.appspot.com",
    messagingSenderId: "533575527457",
    appId: "1:533575527457:web:0131ad8ed9712049304760"
};


// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
// const storageRef = storage.ref();

// const addOwnerBtn = document.getElementById("addBusiness");
// addOwnerBtn.addEventListener("click", ()=>{
//     const newEmail = document.getElementById("newEmail").value;
//     const newPhone = document.getElementById("newPhone").value;

//     if(!newEmail)    erroralert("Please Enter Email ID")
//     else if(!newPhone)    erroralert("Please Enter Phone")
//     else    Addowner()
// });
function Addowner() {
    const newEmail = document.getElementById("newEmail").value;
    const newPhone = document.getElementById("newPhone").value;

    $.ajax({
        url: '/step5_addowner',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            newEmail:newEmail,
            newPhone:newPhone
        }),
        success: function(response) {
          if(response=="already") erroralert("Seems Like This User Is Already a Part Of This Business")
          if(response==false) erroralert("No User Found For This Email id And Number")
          if(response==true){location.reload()}
        }
    });
    
}

    
$('#next5').click(function () {


      if(!youtube) {alertmessage("#youtube","Youtube Link Not Provided","Please Enter Youtube Link")}
      else{

        $.ajax({
            url: '/step4',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                instagram:instagram,
                facebook:facebook,
                youtube:youtube,
                google:google,
                openingHours:openingHours
            }),
            success: function(response) {
              console.log(response)
            }
        });
    }
    
});













        



    },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.SweetAlert.init()
    }(window.jQuery);