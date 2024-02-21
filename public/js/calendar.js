new Calendar('.calendar');

document.querySelector('.calendar').addEventListener('clickDay', function (e) {
  var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  Swal.fire({
    title: "Editar registro",
    html: `
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <div class="mb-3">
              <label for="dateName" class="form-label">Nombre*</label>
              <input type="text" id="dateName" class="form-control" placeholder="DEFECTO">
            </div>
            <div class="mb-3">
              <label for="dateColor" class="form-label">Color</label>
              <input type="color" class="form-control form-control-color" id="dateColor">
            </div>
            <div class="mb-3">
              <label for="recurring">Recurrente</label>
              <input id="recurring" type="checkbox">
            </div>
          `,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: '#28a745',
    cancelButtonText: "Cerrar",
    cancelButtonColor: '#dc3545',
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      try {
        const date = e.date;
        const name = $('#dateName').val();
        const color = $('#dateColor').val();
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear() ;
        const recurring = $('#recurring').val();

        $.ajax({
          url: '/guardar-datos', 
          method: 'POST',
          data: {
            "_token": $("meta[name='csrf-token']").attr("content"),
            name: name,
            color: color,
            day: day,
            month: month,
            year: year,
            recurring: recurring
          }, success: function (response) {
            Swal.fire("¡Datos guardados correctamente!");
          },
          error: function (xhr, status, error) {
            Swal.fire("Error al guardar los datos. Por favor, inténtalo de nuevo.");
          }
        });
      } catch (error) {
        Swal.showValidationMessage(`
              Request failed: ${error}
            `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Día guardado");
    }
  });

});

// $('.calendar').CalendarContextMenuItem(){

// }