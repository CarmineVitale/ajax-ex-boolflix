$(document).ready(function () {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    // Ricerca al click del bottone
   $('#search').click(function () {
       cercaFilm(template);
       cercaSerie(template)
   });

   // Ricerca alla pressione del tasto INVIO
   $('.input').keyup(function (e) { 
       if (e.which == 13) {
        cercaFilm(template);
        cercaSerie(template);
       }
    });
}); // end ready

function cercaFilm(template) {
    if ($('.input').val() !== '') {
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                api_key: 'cd1dad52ddffcbd356f95d30aa3af056',
                language: 'it-IT',
                query: $('.input').val(),
            },
            success: function(res) {
                var risultati = res.results;
                if(risultati.length > 0) {
                    for (var i = 0; i < risultati.length; i++) {
                        var self = risultati[i];
                        //Richiamo funzione voto stella
                        var count = getStars(self.vote_average);
                        //Richoamo funzione per bandiera/lingua
                        var flag = getLanguage(self.original_language);

                        var dati = {
                            title: 'Titolo: ' + self.title,
                            original_title: 'Titolo originale: ' + self.original_title,
                            icona: 'Voto medio:' + count ,
                            tipo: 'Tipo: Film',
                            bandiera: 'Lingua:' + flag,

                        };
                        var html = template(dati);
                        $('.all-films').append(html);
                        $('.input').val('');
                        
                    } //fine ciclo for
                } else {
                    alert('Nessun titolo trovato');
                    $('.input').select();
                }
                
                
                
            }, //fine success
            error: function() {
                alert('ERROR!')
            }
        }) //fine chiamata ajax
    } else {
        alert('Inserire del testo')
    }


    //Elimino contenuto ricerca precedente
    $('.all-films').html(' ');
 }  //Fine funzione ricerca film 

 function cercaSerie(template) {
    if ($('.input').val() !== '') {
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/tv',
            method: 'GET',
            data: {
                api_key: 'cd1dad52ddffcbd356f95d30aa3af056',
                language: 'it-IT',
                query: $('.input').val(),
            },
            success: function(res) {
                var risultati = res.results;
                if(risultati.length > 0) {
                    for (var i = 0; i < risultati.length; i++) {
                        var self = risultati[i];
                        //Richiamo funzione voto stella
                        var count = getStars(self.vote_average);
                        //Richoamo funzione per bandiera/lingua
                        var flag = getLanguage(self.original_language);
                        var dati = {
                            title: 'Titolo: ' + self.name,
                            original_title: 'Titolo originale: ' + self.original_name,
                            //original_language: 'Lingua: ' + self.original_language,
                            //vote_count: 'Voto medio: ' + nuovoVoto,
                            tipo: 'Tipo: Serie TV',
                            icona: 'Voto medio: ' + count,
                            bandiera: 'Lingua:' + flag,
                        };
                        
                        var html = template(dati);
                        $('.all-films').append(html);
                        $('.input').val('');
                        
                    } //fine ciclo for
                } else {
                    alert('Nessun titolo trovato');
                    $('.input').select();
                }
                
                
                
            }, //fine success
            error: function() {
                alert('ERROR!')
            }
        }) //fine chiamata ajax
    } else {
        alert('Inserire del testo')
    }


    //Elimino contenuto ricerca precedente
    $('.all-films').html(' ');
 }  //Fine funzione ricerca serie 

 // Funzione per stelle/voti
 function getStars(vote_average) {
     //gestione voti stelle
     var nuovoVoto = Math.ceil(vote_average / 2);
                        
     var stellaPiena = '<i class="fas fa-star"></i>';
     var stellaVuota = '<i class="far fa-star"></i>';
     var count = '';
     
     if (nuovoVoto === 1) {
         count = stellaPiena + stellaVuota + stellaVuota + stellaVuota + stellaVuota;  
     } else if (nuovoVoto === 2) {
         count = stellaPiena + stellaPiena + stellaVuota + stellaVuota + stellaVuota; 
     } else if (nuovoVoto === 3) {
         count = stellaPiena + stellaPiena + stellaPiena + stellaVuota + stellaVuota; 
     } else if (nuovoVoto === 4) {
         count = stellaPiena + stellaPiena + stellaPiena + stellaPiena + stellaVuota; 
     } else if (nuovoVoto === 5) {
         count = stellaPiena + stellaPiena + stellaPiena + stellaPiena + stellaPiena; 
     } else if (nuovoVoto === 0) {
         count = stellaVuota + stellaVuota + stellaVuota + stellaVuota + stellaVuota; 
     }

     return count;
 }
 //Funzione per lingua/bandiera
 function getLanguage(original_language) {

     var lingua = original_language;
     var flag = '';
     
     if (lingua == 'it') {
         flag = '<img class="flag"  src="img/it.svg" alt="bandiera italia">';
     } else if (lingua == 'en') {
         flag = '<img class="flag"  src="img/en.svg" alt="bandiera england">';
     } else {
         flag = lingua;
     }
     return flag;
 }