let polRow4 = `<option value="30">30</option>
<option value="35">35</option>
<option value="40">40</option>
<option value="45">45</option>
<option value="50">50</option>`;


let polRow5=`<option value="10">10</option>`;

let obesankaVal=`<option value="0">0</option>`

let twoHeadCols = [
  `<input placeholder='Ključ1-Marko' type='text' id='txt_1'/>`,
  "Količina",
];
let twoBodyCols = [
  `<input type='checkbox'>`,
  `<select>
<option value='1'>1
<option value='2'>2
<option value='3'>2
<option value='4'>4
<option value='5'>5
<option value='6'>6
<option value='7'>7
<option value='8'>8
<option value='9'>9
<option value='10'>10
</select>`,
];

let data = [];
let headTemplate = [];
let bodyTemplate = [];

if (localStorage.getItem("myData") === null) {
  data.push(headTemplate);
  data.push(bodyTemplate);
  data.push(bodyTemplate);
  data.push(bodyTemplate);

  headTemplate = [
    "Št.",
    "Naziv Vrat",
    "Vrsta cilindra",
    "Notranje mere cilindra",
    "Zunanje mere cilindra",
    `<input placeholder='Ključ1-Marko' type='text' id='txt_1' />`,
    "Količina",
    `<input placeholder='Ključ1-Marko'type='text' id='txt_1'/>`,
    "Količina",
  ];

  bodyTemplate = [
    `<input class='chekBox' type='checkbox'>`,
    `<input placeholder='npr. Vhodna Vrata' id='txt_1'  />`,
    `<select onchange="get(this.value)"  class="selectTag">
    <option value='ključ - ključ' data-imagesrc="images/img1.png" > ključ - ključ </option>
  <option value='ključ z gumbom' data-imagesrc="images/img2.png">ključ z gumbom</option>
  <option value='polcilider'data-imagesrc="images/img3.png">polcilider</option>
  <option value='obešanka'data-imagesrc="images/img4.png">obešanka</option>
  </select>`,
    `<select class="col4">
  <option value='26'>26
  <option value='30'>30
  <option value='35'>35
  <option value='40'>40
  <option value='45'>45
  <option value='50'>50
  <option value='55'>55
  <option value='60'>60
  <option value='65'>65
  <option value='70'>70
  <option value='75'>75
  <option value='80'>80
  </select>`,
    `<select id="selectCol5" class="col5">
    <option value='26'>26
    <option value='30'>30
    <option value='35'>35
  <option value='40'>40
  <option value='45'>45
  <option value='50'>50
  <option value='55'>55
  <option value='60'>60
  <option value='65'>65
  <option value='70'>70
  <option value='75'>75
  <option value='80'>80
  </select>`,
    `<input type='checkbox'>`,
    `<select>
  <option value='1'>1
  <option value='2'>2
  <option value='3'>2
  <option value='4'>4
  <option value='5'>5
  <option value='6'>6
  <option value='7'>7
  <option value='8'>8
  <option value='9'>9
  <option value='10'>10
  </select>`,
    `<input type='checkbox'>`,
    `<select>
  <option value='1'>1
  <option value='2'>2
  <option value='3'>2
  <option value='4'>4
  <option value='5'>5
  <option value='6'>6
  <option value='7'>7
  <option value='8'>8
  <option value='9'>9
  <option value='10'>10
  </select>`,
  ];
} else {
  let retrievedData = localStorage.getItem("myData");
  data = JSON.parse(retrievedData);
  bodyTemplate = localStorage.getItem("bodyTemplate");
  bodyTemplate = JSON.parse(bodyTemplate);
  headTemplate = localStorage.getItem("headTemplate");
  headTemplate = JSON.parse(headTemplate);
}

// Table Head
function tHead() {
  var headData = data[0];
  let rows = document.createElement("tr");
  document.querySelector("#my_table thead").appendChild(rows);

  for (let index = 0; index < headTemplate.length; index++) {
    var head = document.createElement("th");
    document.querySelector("#my_table thead tr").appendChild(head);
    const elem = headTemplate[index];
    head.innerHTML = elem;
    console.log(head);
    if (localStorage.getItem("myData") !== null) {
      const element = headData[index];
      if (head.children[0]) {
        head.children[0].value = element;
      }
    }
  }
}
tHead();

// Table Body
function tBody() {
  let tbodyD = [...data];
  tbodyD.shift();

  for (let outerIndex = 0; outerIndex < tbodyD.length; outerIndex++) {
    const element = tbodyD[outerIndex];
    let bodyRows = document.createElement("tr");
    bodyRows.id = `row_${outerIndex + 1}`;
    document.querySelector("#my_table tbody").appendChild(bodyRows);
    for (let index = 0; index < bodyTemplate.length; index++) {
      let bRow = document.createElement("td");
      bodyRows.appendChild(bRow);
      const ele = bodyTemplate[index];
      bRow.innerHTML = ele;
      if (index == 2) {
        bRow.id = `ct${outerIndex}`;
        bRow.onchange = (event) => get(`cv${outerIndex}`, event);
      } else if (index == 4) {
        bRow.id = `cv${outerIndex}`;
      }

      console.log(bRow);
      if (localStorage.getItem("myData") !== null) {
        if (element[2] == true) {
          bRow.children[0].children[0].children[0].value = element[2];
        }
        bRow.children[0].value = element[index];
        if (element[index] == "Yes") {
          bRow.children[0].checked = true;
        } else {
          bRow.children[0].checked = false;
        }
      }
    }
    $(`#${bodyRows.id} .selectTag`).ddslick({
      onSelected: function (selectedData) {
        //callback function: do something with selectedData;
        if ((selectedData.selectedData.value == "polcilider")) {   
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=polRow4;
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=polRow5;
      
        }
        else if((selectedData.selectedData.value == "obešanka")){
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=obesankaVal;
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=obesankaVal;
        }
        else if((selectedData.selectedData.value !== "polcilider")&&(selectedData.selectedData.value !== "obešanka")){
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=bodyTemplate[3];
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=bodyTemplate[4];
        }
      },
    });
  }
}

tBody();

// Add Columns
function addColumn() {
  var allRows = document.querySelectorAll("#my_table tr");
  for (var i = 0; i < allRows.length; i++) {
    if (i === 0) {
      let text = document.createElement("th");
      let tx = (text.innerHTML = twoHeadCols[0]);

      let checkbox = document.createElement("th");
      let cv = (checkbox.innerHTML = twoHeadCols[1]);
      allRows[i].append(text);
      allRows[i].append(checkbox);
      data[i].push(tx);
      data[i].push(cv);
    } else {
      let text = document.createElement("td");
      let tx = (text.innerHTML = twoBodyCols[0]);

      let checkbox = document.createElement("td");
      let ch = (checkbox.innerHTML = twoBodyCols[1]);
      allRows[i].append(text);
      allRows[i].append(checkbox);
      data[i].push(tx);
      data[i].push(ch);
    }
  }
  headTemplate = headTemplate.concat(twoHeadCols);
  bodyTemplate = bodyTemplate.concat(twoBodyCols);
  showSuccessMsg("Stolpec je zdaj dodan");
  console.log(bodyTemplate);
  console.log(data);

  var obj=document.querySelector('.pageSize');
obj.scrollBy(5000,0);
}

// Delete Columns
function deleteColumn() {
  var allRows = document.getElementById("my_table").rows;
  let deletedVar = false;
  for (var i = 0; i < allRows.length; i++) {
    if (allRows[i].cells.length > 5) {
      allRows[i].deleteCell(-1); //delete the cell
      allRows[i].deleteCell(-1);
      if (!deletedVar) {
        bodyTemplate.pop();
        bodyTemplate.pop();
        deletedVar = true;
        showSuccessMsg("Zadnji stolpec je izbrisan");
      }
      console.log(bodyTemplate);
    } else {
      iziToast.error({
        title: "Error",
        message: "You Cannot Delete more Columns",
      });
      return;
    }
  }
  data.map((item) => {
    if (item.length > 5) {
      let bodyTemplate = item.splice(item.length - 2, 2);
      return bodyTemplate;
    } else {
      return item;
    }
  });

  console.log(data);
}

// Add Rows
function addRow() {
  let rowData = [...bodyTemplate];
  // let rowData = [...data[data.length-1]];

  let bodyRows1 = document.createElement("tr");
  document.querySelector("#my_table tbody").appendChild(bodyRows1);
  for (let i = 0; i < rowData.length; i++) {
    const bData = rowData[i];
    let bRow1 = document.createElement("td");
    document.querySelector("#my_table tbody tr:last-child").appendChild(bRow1);
    bRow1.innerHTML = bData;
    let bRows = document.querySelectorAll("tbody tr");
    for (let outerIndex = 0; outerIndex < bRows.length; outerIndex++) {
      if (i == 2) {
        bRow1.id = `ct${outerIndex}`;
        bRow1.onchange = (event) => get(`cv${outerIndex}`, event);
      } else if (i == 4) {
        bRow1.id = `cv${outerIndex}`;
      }
    }
    // $(".selectTag").ddslick();

  }
  let outer=data.length-1;
    bodyRows1.id = `row_${outer + 1}`;
    $(`#${bodyRows1.id} .selectTag`).ddslick({
      onSelected: function (selectedData) {
        //callback function: do something with selectedData;
        if ((selectedData.selectedData.value == "polcilider")) {   
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=polRow4;
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=polRow5;
          
        }
        else if((selectedData.selectedData.value == "obešanka")){
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=obesankaVal;
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=obesankaVal;
        }
        else if((selectedData.selectedData.value !== "polcilider")&&(selectedData.selectedData.value !== "obešanka")){
          selectedData.selectedItem[0].closest("tr").querySelector("select").innerHTML=bodyTemplate[3];
          selectedData.selectedItem[0].closest("tr").querySelector(".col5").innerHTML=bodyTemplate[4];
        }
      },
    });

  data.push(rowData);
  console.log(data);

  console.log(bodyTemplate);

  iziToast.info({
    title: "Dodana vrstica",
    message: "dodana je bila ena vrstica",
  });
}

function deleteSelectedRows() {
  var table = document.getElementById("my_table"); //html table
  var rowCount = table.rows.length; //no. of rows in table
  if (rowCount > "2") {
    for (var i = 0; i < rowCount; i++) {
      //loops for all row in table
      var row = table.rows[i]; //return a particular row
      var chkbox = row.cells[0].childNodes[0]; //get check box onject
      if (null != chkbox && true == chkbox.checked) {
        //wheather check box is selected
        table.deleteRow(i); //delete the selected row
        rowCount--; //decrease rowcount by 1
        i--;
        data.length--;
        showSuccessMsg("Vrstica je bila izbrisana");
      }
    }
    console.log(data);
  } else {
    iziToast.error({
      title: "Napaka",
      message: "Obstajati mora vsaj ena vrstica",
    });
  }
}

function deleteAllRows() {
  var table = document.getElementById("my_table");
  var rowCount = table.rows.length;
  if(rowCount>2){
    for(let x=rowCount;x>2;x--){
      table.deleteRow(x-1);
      rowCount--;
      data.length--;
      console.log(data);
    }
    showSuccessMsg("Vse vrstice so izbrisane");
  } 

 else {
    iziToast.error({
      title: "Napaka",
      message: "Obstajati mora vsaj ena vrstica",
    });
  }
}

// Reset btn
function reset() {
  document.getElementById("reset").reset();
}

// Export Data
function createCSV(array) {
  var keys = Object.keys(array[0]); //Collects Table Headers
  var result = ""; //CSV Contents
  array.forEach(function (item) {
    //Goes Through Each Array Object
    keys.forEach(function (key) {
      //Goes Through Each Object value
      result += item[key] + ","; //Comma Seperates Each Key Value in a Row
    });
    result += "\n"; //Creates New Row
  });
  return result;
}
function exportFile(data) {
  csv = "data:text/csv;charset=utf-8," + createCSV(data); //Creates CSV File Format
  excel = encodeURI(csv); //Links to CSV
  link = document.createElement("a");
  link.setAttribute("href", excel); //Links to CSV File
  link.setAttribute("download", "Povpraševanje iz obrazca.csv"); //Filename that CSV is saved as
  link.click();
}

function downloadCsv() {
  exportFile(values());
  showSuccessMsg("Vaša datoteka je bila uspešno prenesena");
}


// Save into local storage
function saveFile() {
  localStorage.setItem("myData", JSON.stringify(values()));
  localStorage.setItem("headTemplate", JSON.stringify(headTemplate));
  localStorage.setItem("bodyTemplate", JSON.stringify(bodyTemplate));
  console.log(data);
  showSuccessMsg("Podatki so bili uspešno shranjeni");
}
function showSuccessMsg(message) {
  iziToast.success({
    title: "v redu",
    message: message,
  });
}
// ftn to push data in local storage
function values() {
  let updatedArray = [];
  document.querySelectorAll("#my_table thead tr").forEach((tr) => {
    let headArray = [];
    tr.querySelectorAll("th").forEach((th) => {
      if (th.children[0]) {
        headArray.push(th.children[0].value);
      } else {
        headArray.push(th.innerText);
      }
    });
    updatedArray.push(headArray);
  });

  document.querySelectorAll("#my_table tbody tr").forEach((tr) => {
    let bodyArray = [];
    tr.querySelectorAll("td").forEach((td) => {
      // bRow.children[0].value = element[index];
      if (td.children[0].tagName == "INPUT") {
        if (
          td.children[0].type == "checkbox" &&
          td.children[0].checked == true
        ) {
          bodyArray.push("Yes");
        } else if (
          td.children[0].type == "checkbox" &&
          td.children[0].checked == false
        ) {
          bodyArray.push("No");
        } else if (td.children[0].type == "text") {
          bodyArray.push(td.children[0].value);
        }
      } else if (td.children[0].classList == "dd-container") {
        bodyArray.push(td.children[0].children[0].children[0].value);
      } else {
        bodyArray.push(td.children[0].value);
      }
    });
    updatedArray.push(bodyArray);
  });

  console.log(updatedArray);
  return updatedArray;
}
values();

// Onchange Ftn
function get(selectId, event) {
  if (event) {
    if (
      event.target.options[event.target.selectedIndex].value == "polcilider"
    ) {
      document.getElementById(
        selectId
      ).children[0].children[12].selected = true;
    }
  }
}


// Fetch API
  let myForm=document.getElementById('myForm');
  myForm.addEventListener('submit',function(e){
   e.preventDefault();
   let formData= new FormData(this);
   fetch('http://formtable.arija.si/sendMail.php',{
    method:'post', 
    body:formData
   }).then(function(response){
    return response.text();
   }).then(function(text){
    console.log(formData)
    console.log(text);
    showSuccessMsg(text);
   }).catch(function(error){
    console.error(error);
    iziToast.error({
      title: "Error",
      message: error,
    });
   })
  });
