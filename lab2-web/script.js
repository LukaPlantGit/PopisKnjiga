// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// const {Client} = require('pg');

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "bazepodataka",
//     database: "PopisKnjiga2"
// })

// client.connect();

// client.query(`SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela,
// COALESCE(json_agg(
//             json_build_object(
//             'Ime:', sadrzi.imelika,
//             'Prezime:', lik.prezimelika))
//         FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]')
//       AS likovi,
// knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka
// FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika
// GROUP BY knjiga.sifraknjige`, (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//         myArray = res.rows;
//         console.log(myArray);
//     } else {
//         console.log(err.message);
//     }

//     app.get('/datatable.html', (req, res) => {
//         myArray = res.json(rows);
//     });
    
//     client.end();
// });

// console.log(myArray);

var myArray = [];

$.ajax({
    method:'GET',
    url: 'PopisKnjigaJSON.json',
    success:function(response) {
        myArray = response
        buildTable(myArray)
        // console.log(myArray)
    }
})

buildTable(myArray)

$('#search-input').on('keyup', function(){
    var value = $(this).val()
    // console.log('Value:', value)

    var data = searchTable(value, myArray)
    buildTable(data)

    // var conceptName = $('#search-options').find(":selected").text();
    // console.log(conceptName)
})

function searchTable(value, data){
    var filteredData = []
 
    for(var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        var sifraknjige = data[i].sifraknjige.toString();
        var nazivknjige = data[i].nazivknjige.toLowerCase();
        var nazivautora = data[i].nazivautora.toLowerCase();
        var bestseler = data[i].bestseler.toLowerCase();
        var vrstadjela = data[i].vrstadjela.toLowerCase();
        var likovi = JSON.stringify(data[i].likovi).toLowerCase();
        var nazivizdavackekuce = data[i].nazivizdavackekuce.toLowerCase();
        var uvez = data[i].uvez.toLowerCase();
        var brojstranica = data[i].brojstranica.toString();
        var posudjenaod = data[i].posudjenaod.toLowerCase();
        var posudjenado = data[i].posudjenado.toLowerCase();
        var brojpreostalihprimjeraka = data[i].brojpreostalihprimjeraka.toString();

        if($('#search-options').find(":selected").text() == "Naziv knjige") {
            if(nazivknjige.includes(value)) {
                filteredData.push(data[i]);
            }
        } else if($('#search-options').find(":selected").text() == "Naziv autora") {
            if(nazivautora.includes(value)) {
                filteredData.push(data[i]);
            }
        } else {
            if(sifraknjige.includes(value) || nazivknjige.includes(value) || nazivautora.includes(value) || bestseler.includes(value) || 
                vrstadjela.includes(value) || likovi.includes(value) || nazivizdavackekuce.includes(value) || uvez.includes(value) ||
                brojstranica.includes(value) || posudjenaod.includes(value) || posudjenado.includes(value) ||
                brojpreostalihprimjeraka.includes(value)) {
                    filteredData.push(data[i]);
            }
        }
    }

    return filteredData
}

function buildTable(data){
    var table = document.getElementById('myTable')
    table.innerHTML = ''
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].sifraknjige}</td>
                        <td>${data[i].nazivknjige}</td>
                        <td>${data[i].nazivautora}</td>
                        <td>${data[i].bestseler}</td>
                        <td>${data[i].vrstadjela}</td>
                        <td>${JSON.stringify(data[i].likovi)}</td>
                        <td>${data[i].nazivizdavackekuce}</td>
                        <td>${data[i].uvez}</td>
                        <td>${data[i].brojstranica}</td>
                        <td>${data[i].posudjenaod}</td>
                        <td>${data[i].posudjenado}</td>
                        <td>${data[i].brojpreostalihprimjeraka}</td>
                   </tr>`;
        table.innerHTML += row;
    }
}

function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "PopisKnjiga.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

function tableToJSON() {
    var table = document.getElementById("popis-knjiga-table");
    var header = [];
    var rows = [];

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        header.push(table.rows[0].cells[i].innerHTML);
    }

    for (var i = 1; i < table.rows.length; i++) {
        var row = {};
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            row[header[j]] = table.rows[i].cells[j].innerHTML;
        }
        rows.push(row);
    }

    downloadJSONFile(JSON.stringify(rows));
}

function downloadJSONFile(dataJSON) {
    var dataStr = "data:text/json;charset=utf-8" + encodeURIComponent(dataJSON);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "PopisKnjiga.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}