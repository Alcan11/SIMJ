new Calendar('.calendar');
document.querySelector('.calendar').addEventListener('clickDay', function(e) {
    Swal.fire({
        title: "Editar registro",
        html: `
            <input type="color" class="form-control form-control-color" id="color">
            <input id="festive" type="checkbox">
            <label for="festive">Recurrente</label>
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
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