
// Set the date we're counting down to
var countDownDate = new Date("jun 27, 2018 16:17:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";

        $("#success").html('<div class="alert alert success">Basic details saved successfully.<div>');
      $('#basicdetails').val('');
      $('.btn.btn-res.btn-info')
        .removeClass('disabled')
        .prop('disabled', false);

    }
    else{
        
        $("#success").html('<div class="alert alert success">Basic details saved successfully.<div>');
      $('#basicdetails').val('');
      $('.btn.btn-vote.btn-info')
        .removeClass('disabled')
        .prop('disabled', false);
    }
}, 1000);

 
  