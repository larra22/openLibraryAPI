import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')


let bilatu = document.getElementById('bilatu')
let url= 'https://openlibrary.org/api/books?bibkeys=ISBN:'
//Poner en medio el isb entre url y rul2
let url2='&format=json&jscmd=data'

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 

}

//Probar en internet con 9788417649821
function bilatuta(isbn_emanda){
   let filtrado = datubasea.filter(libro => libro.isbn == isbn_emanda)
   if(filtrado.length!=0 || filtrado == null){
   izenburua.value=filtrado[0].izenburua
   data.value=filtrado[0].data
   egilea.value=filtrado[0].egilea
   irudia.src= URLBASE + filtrado[0].filename
   }else{
    bilatuBDEzdagoena(isbn_emanda)
   }

}

async function bilatuBDEzdagoena(isbn_emanda)

{
    let h = ["ISBN:" + isbn_emanda ]
    izenburua.value = await fetch(url + isbn_emanda+ url2).then(r => r.json()).then(r => r[h].title)
    irudia.src = await fetch(url + isbn_emanda+ url2).then(r => r.json()).then(r => r[h].cover.medium)
    egilea.value = await fetch(url + isbn_emanda+ url2).then(r => r.json()).then(r => r[h].authors[0].name)
    data.value = await fetch(url + isbn_emanda+ url2).then(r => r.json()).then(r => r[h].publish_date)

}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })
    bilatu.addEventListener('click', (event) =>{
        bilatuta(document.getElementById('isbn').value)
    })


}

window.onload = kargatu;

