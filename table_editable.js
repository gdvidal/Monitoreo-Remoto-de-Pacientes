const $tableID = $('#table');
 const $BTN = $('#export-btn');
 const $EXPORT = $('#export');

 const newTr = `
 </tr>
 <!-- This is our clonable table line -->
 <tr class="hide">
 <th scope="row" contenteditable="true">-</th>
 <td  class="text-center" contenteditable="true">Click para Editar</td>
 <td  class="text-center" contenteditable="true">Click para Editar</td>
 <td  class="text-center" contenteditable="true">Click para Editar</td>
 <td  class="text-center" >
     <a href="aaaaaa.html" class="btn btn-secondary"><span
         class="btn-label"><i class="fas fa-file-medical-alt"></i> Crear Monitoreo</span></a>
 </td>

 <td  class="text-center">
     <span class="table-remove"><button class="btn btn-rounded btn-secondary " type="button"  id="list_files"><span
         class="btn-label"><i class="fas fa-trash-alt"></i></span>
     </button></span>
 </td>
 </tr>`;

 $('.table-add').on('click', 'i', () => {

   const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

   if ($tableID.find('tbody tr').length === 0) {

     $('tbody').append(newTr);
   }

   $tableID.find('table').append(newTr);
 });

 $tableID.on('click', '.table-remove', function () {

   $(this).parents('tr').detach();
 });

 $tableID.on('click', '.table-up', function () {

   const $row = $(this).parents('tr');

   if ($row.index() === 0) {
     return;
   }

   $row.prev().before($row.get(0));
 });

 $tableID.on('click', '.table-down', function () {

   const $row = $(this).parents('tr');
   $row.next().after($row.get(0));
 });

 // A few jQuery helpers for exporting only
 jQuery.fn.pop = [].pop;
 jQuery.fn.shift = [].shift;

 $BTN.on('click', () => {

   const $rows = $tableID.find('tr:not(:hidden)');
   const headers = [];
   const data = [];

   // Get the headers (add special header logic here)
   $($rows.shift()).find('th:not(:empty)').each(function () {

     headers.push($(this).text().toLowerCase());
   });

   // Turn all existing rows into a loopable array
   $rows.each(function () {
     const $td = $(this).find('td');
     const h = {};

     // Use the headers from earlier to name our hash keys
     headers.forEach((header, i) => {

       h[header] = $td.eq(i).text();
     });

     data.push(h);
   });

   // Output the result
   $EXPORT.text(JSON.stringify(data));
 });