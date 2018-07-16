$(document).ready(function () {
    moment.updateLocale('en', null);
    var socket = io.connect('http://localhost:8070');

    socket.on('status', function (data) {
        var opcion = data.message;
        switch (opcion) {
            case 'conectado':
                calendarioInit();
                break;
            case 'add':
                calendarioUpdate();
                break;
            case 'update':
                calendarioUpdate();
                break;
            case 'delete':
                calendarioUpdate();
                break;
        }
    });

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek'
        },
        //hiddenDays: [ 0 ], //Excluir ciertos días de la semana para que no se muestren.
        height: 'auto', //Establece la altura de todo el calendario, incluidos el encabezado y el pie de página.
        minTime: "08:00", //Determina el primer intervalo de tiempo que se mostrará para cada día.
        maxTime: "21:00", //Determina el último intervalo de tiempo que se mostrará para cada día. Especificado como una hora de finalización exclusiva.
        slotLabelFormat: 'H:mm', //Determina el texto que se mostrará dentro de un intervalo de tiempo.
        slotEventOverlap: false, //Determina si los eventos temporizados en la vista de agenda se superponen visualmente.
        selectOverlap: false, //Determina si el usuario puede seleccionar períodos de tiempo que están ocupados por eventos.
        allDaySlot: false, //Determina si el espacio "todo el día" se muestra en la parte superior del calendario.
        locale: 'es', //Personaliza el idioma y las opciones de localización para el calendario.
        defaultView: 'agendaWeek', //La vista inicial cuando se carga el calendario.
        defaultDate: new Date(), //La fecha inicial que se muestra cuando el calendario se carga por primera vez.
        navLinks: false, //Determina si se puede hacer clic en los nombres de los días y las semanas.
        selectable: true, //Permite a un usuario resaltar varios días o ranuras de tiempo haciendo clic y arrastrando.
        editable: true, //Determina si los eventos en el calendario se pueden modificar.
        eventLimit: true, //Limita la cantidad de eventos que se muestran en un día. El resto aparecerá en un popover.
        //weekNumbers: false, //Determina si los números de semana se deben mostrar en el calendario.
        themeSystem: 'bootstrap3', //Renders el calendario con un sistema de tema dado.
        // events: [],
        // eventRender: function(event, element) { 
          
        //     var time = element.find(".fc-time").html();
        //     element.html(`<div class="row">
        //                     <div class="col-lg-12">
        //                         ${ time }
        //                         <a onclick="test(${ event.id });">
        //                             <i class="fa fa-pencil fa-1x" aria-hidden="true" style="color: #fff;"></i>
        //                         </a>
        //                         <a onclick="deleteEvent(${ event.id });">
        //                             <i class="fa fa-trash fa-1x" aria-hidden="true" style="color: #fff;"></i>
        //                         </a>
        //                     </div>
        //                   </div>
        //                   <div class="row">
        //                     <div class="col-lg-12">
        //                         ${ event.title }
        //                     </div>
        //                   </div>`); // '<div><a onclick="test();"><i class="fa fa-adjust fa-2x" aria-hidden="true"></i></a></div>'
        // },
        select: function (start, end) {
            $('#calendar').fullCalendar('unselect');
            modalEventSubmit('#myModal', '#formAdd', function (form) {
                var formData = new FormData(form);
                addEvent(formData, start, end);
            });
        },
        eventClick: function (calEvent, jsEvent, view) {
            $('#txtEventoMod').val(calEvent.title);
            
            modalEvent('#myModalEvent', '#formEvent', '#btnEliminar', function (form) {
                //Modificar
                var formData = new FormData(form);
                updateEvent(calEvent.id, formData, calEvent.start, calEvent.end);
            }, function (button) {
                //Eliminar
                $('#myModalDelete').modal('show');
                $('#btnEliminarConfimar').on('click',function () {
                    deleteEvent(calEvent.id);
                    $('#myModalDelete').modal('hide');
                });
                $('#myModalDelete').on('hide.bs.modal', function () {
                    $('input[type="text"]').val('');
                    $('#myModalDelete').off('shown.bs.modal');
                    $('#btnEliminarConfimar').off('click');
                    $('#myModalDelete').off('hide.bs.modal');
                });
            });
        }
    });

    function modalEventSubmit(modal, form, event) {
        $(modal).on('shown.bs.modal', function () { // wire up the OK button to dismiss the modal when shown
            $(form).on('submit', function (ev) {
                event(this);
                $(modal).modal('hide');
                return false;
            });
        });

        $(modal).on('hide.bs.modal', function () { // remove the event listeners when the dialog is dismissed
            $('input[type="text"]').val('');
            $(modal).off('shown.bs.modal');
            $(form).off('submit');
            $(modal).off('hide.bs.modal');
        });

        $(modal).modal({ // wire up the actual modal functionality and show the dialog
            'backdrop': 'static',
            'keyboard': true,
            'show': true // ensure the modal is shown immediately
        });
    }

    function modalEvent(modal, form, button, callbackSubmit, callbackClick) {
        $(modal).on('shown.bs.modal', function () { // wire up the OK button to dismiss the modal when shown
            $(form).on('submit', function (ev) {
                callbackSubmit(this);
                $(modal).modal('hide');
                return false;
            });
            $(button).on('click', function (ev) {
                callbackClick(this);
                $(modal).modal('hide');
                return false;
            });
        });

        $(modal).on('hide.bs.modal', function () { // remove the event listeners when the dialog is dismissed
            $('input[type="text"]').val('');
            $(modal).off('shown.bs.modal');
            $(form).off('submit');
            $(button).off('click');
            $(modal).off('hide.bs.modal');
        });

        $(modal).modal({ // wire up the actual modal functionality and show the dialog
            'backdrop': 'static',
            'keyboard': true,
            'show': true // ensure the modal is shown immediately
        });
    }

    function calendarioInit() {
        $.ajax({
            url: 'http://localhost:3000/eventos',
            type: 'get',
            data: {},
            success: function (res) {
                $('#calendar').fullCalendar('addEventSource', res.data);
            }
        });
    }

    function calendarioUpdate() {
        $.ajax({
            url: 'http://localhost:3000/eventos',
            type: 'get',
            data: {},
            success: function (res) {
                $('#calendar').fullCalendar('removeEvents')
                $('#calendar').fullCalendar('addEventSource', res.data);
            }
        });
    }

    function addEvent(formData, start, end) {
        $.ajax({
            url: 'http://localhost:3000/eventos',
            type: 'post',
            data: { title: formData.get('evento'), start: moment(start).format(), end: moment(end).format() },
            success: function (res) {
                if (res.affectedRows == 1) {
                    socket.emit('send', 'add');
                }
            }
        });
    }

    function updateEvent(id, formData, start, end) {
        $.ajax({
            url: 'http://localhost:3000/eventos',
            type: 'put',
            data: { id: id, title: formData.get('evento'), start: moment(start).format(), end: moment(end).format() },
            success: function (res) {
                if (res.affectedRows == 1) {
                    socket.emit('send', 'update');
                }
            }
        });
    }

    function deleteEvent(id) {
        $.ajax({
            url: 'http://localhost:3000/eventos',
            type: 'delete',
            data: { id: id },
            success: function (res) {
                if (res.affectedRows == 1) {
                    socket.emit('send', 'delete');
                }
            }
        });
    }

    // function quitarEvent() {
    //     $('#calendar').fullCalendar('removeEvents', idOrFilter);
    // }
});