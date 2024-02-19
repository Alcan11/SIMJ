new Calendar('.calendar');
document.querySelector('.calendar').addEventListener('clickDay', function(e) {
    Swal.fire({
        title: "Editar registro",
        html: `
            <div class="mb-3">
              <label for="dateName" class="form-label">Nombre*</label>
              <input type="text" id="dateName" class="form-control" placeholder="DEFECTO">
            </div>
            <div class="mb-3">
              <label for="dateColor" class="form-label">Color</label>
              <input type="color" class="form-control form-control-color" id="dateColo">
            </div>
            <div class="mb-3">
              <label for="festive">Recurrente</label>
              <input id="festive" type="checkbox">
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