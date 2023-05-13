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



        $('.users-delete-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: "Are you sure Delete?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, delete it!",
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-delete-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Deleted',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...'  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.users-make-admin').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: "Are you sure To Promote to Admin",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, Promote!",
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-admin-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Promoted to Admin',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...'  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });






        // Business


        

        $('.business-btn-submitbtn').click(function () {
            var  newname= $("#name").val();
            var  newemail= $("#email").val();
            var  newphone= $("#phone").val();
            var  newid= $("#id").val();
            var  newinstagram= $("#instagram").val();
            var  newtwitter= $("#twitter").val();
            var  newfacebook= $("#facebook").val();

            if(newemail !=null && newemail!=""){


            $.ajax({
                url: '/business-update-user',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      name : newname,
                      email : newemail,
                      phone : newphone,
                      id : newid,
                      instagram : newinstagram,
                      twitter : newtwitter,
                      facebook : newfacebook
                }),
                success: function(response) {
                    if(response){
                      Swal.fire({
                          icon: 'success',
                          title: 'User Updated',
                          confirmButtonColor: "#5664d2",
                          html: '',
                          allowOutsideClick: false

                      }).then((result) => {
                          if (result.isConfirmed) {
                              location.reload();
                          }
                      });
                    }else{
                      Swal.fire({
                          icon: 'warning',
                          title: 'Something Went Wrong',
                          confirmButtonColor: "#5664d2",
                          html: 'Please Try Again Later!...'  
                      }).then((result) => {
                          if (result.isConfirmed) {
                              location.reload();
                          }
                      });
                    }
                  }
              });

            }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Email Is Required',
                    confirmButtonColor: "#5664d2",
                    html: 'Please Try Again'  
                })

            }



        });

        $('.business-delete-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: "Are you sure Delete?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, delete it!",
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-delete-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Deleted',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...'  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.business-make-admin').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: "Are you sure To Promote to Admin",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, Promote!",
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-admin-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Promoted to Admin',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...'  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.business-reject-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Rejection',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-reject-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Marked As Rejected',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.business-makepending-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Pending',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-makepending-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Marked As Pending',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.business-makenew-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For New',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-makenew-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Marked As New',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.business-verify-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Vrification',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/business-verify-user',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'User Marked As Verified',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

 











        // Category


        $('.category-btn-submitbtn').click(function () {
            var  newname= $("#category_name").val();
            var  newid= $("#id").val();
        
            if(newname !=null && newname!=""){
        
        
            $.ajax({
                url: '/category-update',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      name : newname,
                      id : newid,
                }),
                success: function(response) {
                    if(response){
                      Swal.fire({
                          icon: 'success',
                          title: 'Category Updated',
                          confirmButtonColor: "#5664d2",
                          html: '',
                          allowOutsideClick: false
        
                      }).then((result) => {
                          if (result.isConfirmed) {
                              location.reload();
                          }
                      });
                    }else{
                      Swal.fire({
                          icon: 'warning',
                          title: 'Something Went Wrong',
                          confirmButtonColor: "#5664d2",
                          html: 'Please Try Again Later!...'  
                      }).then((result) => {
                          if (result.isConfirmed) {
                              location.reload();
                          }
                      });
                    }
                  }
              });
        
            }else{
        
                Swal.fire({
                    icon: 'error',
                    title: 'Category Name Is Required',
                    confirmButtonColor: "#5664d2",
                    html: 'Please Try Again'  
                })
        
            }
        
        
        
        });
        
        $('.category-delete-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: "Are you sure Delete?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, delete it!",
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/category-delete',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Deleted',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
        
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...'  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });

        $('.category-reject-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Rejection',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/category-reject',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Marked As Rejected',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });
        
        $('.category-makepending-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Pending',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/category-makepending',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Marked As Pending',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });
        
        $('.category-makenew-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For New',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/category-makenew',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Marked As New',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });
        
        $('.category-verify-alert').click(function () {
            var userId = $(this).data('my-variable');
            Swal.fire({
                title: 'Message For Vrification',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#ff3d60",
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 1000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                if(email.isConfirmed){
                    $.ajax({
                        url: '/category-verify',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                              id : userId,
                              comment:email.value
                        }),
                        success: function(response) {
                          if(response){
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Marked As Verified',
                                confirmButtonColor: "#5664d2",
                                html: 'Message Sent',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }else{
                            Swal.fire({
                                icon: 'warning',
                                title: 'Something Went Wrong',
                                confirmButtonColor: "#5664d2",
                                html: 'Please Try Again Later!...',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                          }
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Operation Cancelled',
                        confirmButtonColor: "#5664d2",
                        html: 'cancelled'
                    })
                }     
            })
        });
        









        // Countries




        
$('.country-btn-submitbtn').click(function () {
    var  newname= $("#country_name").val();
    var  newid= $("#id").val();

    if(newname !=null && newname!=""){


    $.ajax({
        url: '/country-update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
              name : newname,
              id : newid,
        }),
        success: function(response) {
            if(response){
              Swal.fire({
                  icon: 'success',
                  title: 'country Updated',
                  confirmButtonColor: "#5664d2",
                  html: '',
                  allowOutsideClick: false

              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }else{
              Swal.fire({
                  icon: 'warning',
                  title: 'Something Went Wrong',
                  confirmButtonColor: "#5664d2",
                  html: 'Please Try Again Later!...'  
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }
          }
      });

    }else{

        Swal.fire({
            icon: 'error',
            title: 'country Name Is Required',
            confirmButtonColor: "#5664d2",
            html: 'Please Try Again'  
        })

    }



});

$('.country-delete-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'country Deleted',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.country-reject-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Rejection',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-reject',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'country Marked As Rejected',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.country-makepending-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Pending',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-makepending',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'country Marked As Pending',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.country-makenew-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For New',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-makenew',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'country Marked As New',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.country-verify-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Vrification',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-verify',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'country Marked As Verified',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});



$('.country-feature-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure to Make Featured?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-feature',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'Marked Featured',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});


$('.country-unfeature-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure to Make Unfeatured?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/country-unfeature',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'Marked Uneatured',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});





// Ribbons




$('.ribbon-btn-submitbtn').click(function () {
    var  newname= $("#name").val();
    var  newcolor= $("#color").val();
    var  newid= $("#id").val();

    if(newname !=null && newname!=""){


    $.ajax({
        url: '/ribbon-update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
              name : newname,
              color : newcolor,
              id : newid,
        }),
        success: function(response) {
            if(response){
              Swal.fire({
                  icon: 'success',
                  title: 'ribbon Updated',
                  confirmButtonColor: "#5664d2",
                  html: '',
                  allowOutsideClick: false

              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }else{
              Swal.fire({
                  icon: 'warning',
                  title: 'Something Went Wrong',
                  confirmButtonColor: "#5664d2",
                  html: 'Please Try Again Later!...'  
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }
          }
      });

    }else{

        Swal.fire({
            icon: 'error',
            title: 'ribbon Name Is Required',
            confirmButtonColor: "#5664d2",
            html: 'Please Try Again'  
        })

    }



});

$('.ribbon-delete-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/ribbon-delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'ribbon Deleted',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.ribbon-reject-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Rejection',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/ribbon-reject',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'ribbon Marked As Rejected',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.ribbon-makepending-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Pending',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/ribbon-makepending',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'ribbon Marked As Pending',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.ribbon-makenew-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For New',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/ribbon-makenew',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'ribbon Marked As New',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});

$('.ribbon-verify-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: 'Message For Vrification',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#5664d2",
        cancelButtonColor: "#ff3d60",
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (email === 'taken@example.com') {
                        reject('This email is already taken.')
                    } else {
                        resolve()
                    }
                }, 1000)
            })
        },
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/ribbon-verify',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId,
                      comment:email.value
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'ribbon Marked As Verified',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});







// Blog Categories


$('.blogcategory-btn-submitbtn').click(function () {
    var  newname= $("#blogcategory_name").val();
    var  newid= $("#id").val();

    if(newname !=null && newname!=""){


    $.ajax({
        url: '/BlogCategory-update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
              name : newname,
              id : newid,
        }),
        success: function(response) {
            if(response){
              Swal.fire({
                  icon: 'success',
                  title: 'BlogCategory Updated',
                  confirmButtonColor: "#5664d2",
                  html: '',
                  allowOutsideClick: false

              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }else{
              Swal.fire({
                  icon: 'warning',
                  title: 'Something Went Wrong',
                  confirmButtonColor: "#5664d2",
                  html: 'Please Try Again Later!...'  
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }
          }
      });

    }else{

        Swal.fire({
            icon: 'error',
            title: 'BlogCategory Name Is Required',
            confirmButtonColor: "#5664d2",
            html: 'Please Try Again'  
        })

    }



});

$('.BlogCategory-delete-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/BlogCategory-delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'BlogCategory Deleted',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});




// Blog Categories


$('.blogs-btn-submitbtn').click(function () {
    var newid=$("#id").val();
    var newname=$("#name").val();
    var newshort_description=$("#short_description").val();
    var newlong_description=$("#long_description").val();
    var newblogcategory=$("#blogcategory").val();


    if(newblogcategory!=0){


    $.ajax({
        url: '/blog-update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            id : newid,
            name : newname,
            short_description : newshort_description,
            long_description : newlong_description,
            blogcategory : newblogcategory
        }),
        success: function(response) {
            if(response){
              Swal.fire({
                  icon: 'success',
                  title: 'BlogCategory Updated',
                  confirmButtonColor: "#5664d2",
                  html: '',
                  allowOutsideClick: false

              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }else{
              Swal.fire({
                  icon: 'warning',
                  title: 'Something Went Wrong',
                  confirmButtonColor: "#5664d2",
                  html: 'Please Try Again Later!...'  
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }
          }
      });

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Please select blogcategory',
            confirmButtonColor: "#5664d2",
            html: 'Please Try Again'  
        })
    }



});

$('.blogs-delete-alert').click(function () {
    var userId = $(this).data('my-variable');
    Swal.fire({
        title: "Are you sure Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    }).then(function (email) {
        if(email.isConfirmed){
            $.ajax({
                url: '/blog-delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                      id : userId
                }),
                success: function(response) {
                  if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'BlogCategory Deleted',
                        confirmButtonColor: "#5664d2",
                        html: 'Message Sent',
                        allowOutsideClick: false

                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Something Went Wrong',
                        confirmButtonColor: "#5664d2",
                        html: 'Please Try Again Later!...'  
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
                }
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Operation Cancelled',
                confirmButtonColor: "#5664d2",
                html: 'cancelled'
            })
        }     
    })
});










        

        
        //chaining modal alert
        $('#chaining-alert').click(function () {
            Swal.mixin({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                confirmButtonColor: "#5664d2",
                cancelButtonColor: "#74788d",
                progressSteps: ['1', '2', '3']
              }).queue([
                {
                  title: 'Question 1',
                  text: 'Chaining swal2 modals is easy'
                },
                'Question 2',
                'Question 3'
              ]).then( function (result) {
                if (result.value) {
                  Swal.fire({
                    title: 'All done!',
                    html:
                      'Your answers: <pre><code>' +
                        JSON.stringify(result.value) +
                      '</code></pre>',
                    confirmButtonText: 'Lovely!'
                  })
                }
              })
        });

        //Danger
        $('#dynamic-alert').click(function () {
            swal.queue([{
                title: 'Your public IP',
                confirmButtonColor: "#5664d2",
                confirmButtonText: 'Show my public IP',
                text: 'Your public IP will be received ' +
                'via AJAX request',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        $.get('https://api.ipify.org?format=json')
                            .done(function (data) {
                                swal.insertQueueStep(data.ip)
                                resolve()
                            })
                    })
                }
            }]).catch(swal.noop)
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