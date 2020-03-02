$(() => {
  $(document).on('click', '.modal-btn', (event) => {

    var id = ($(event.currentTarget).data("idurl"));

    $.get('/qrcode/' + id, (qrcode) => {
      console.log(qrcode);
      //ediction d'un élement attr
      $('#qrcode').attr('src', qrcode);
    });


  })
})

$('#myModal').on('shown.bs.modal', function () {
  //console.log(this);

  $('#myInput').trigger('focus');


})