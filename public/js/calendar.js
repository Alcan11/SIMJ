setData();

new Calendar('.calendar', {
  style:'background',
    	startYear: currentYear,
    	language: 'es',
    	minDate:new Date(currentYear,0,1),
    	maxDate:new Date(currentYear,11,31),
    	dataSource:dataSource
});

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
        const month = date.getMonth();
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
  });

});

function setData() {
  const dataSource = [];

  fetch('/holidays')
      .then(response => response.json())
      .then(data => {
          data.forEach((holiday, index) => {
              const holidayData = {
                  id: index,
                  name: holiday.name,
                  location: holiday.location,
                  startDate: new Date(holiday.year, holiday.month, holiday.day),
                  endDate: new Date(holiday.year, holiday.month, holiday.day)
              };
              dataSource.push(holidayData);
          });
      })
      .catch(error => {
          console.error('Error al obtener los días festivos:', error);
      });
  console.log(dataSource);
};
 