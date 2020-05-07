$(document).ready(function () {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    // Ricerca al click del bottone
   $('#search').click(function () {
       cerca(template, 'https://api.themoviedb.org/3/search/movie', 'FILM' );
       cerca(template, 'https://api.themoviedb.org/3/search/tv', 'SERIE TV' );
   });

   // Ricerca alla pressione del tasto INVIO
   $('.input').keyup(function (e) { 
       if (e.which == 13) {
        cerca(template, 'https://api.themoviedb.org/3/search/movie', 'FILM');
        cerca(template, 'https://api.themoviedb.org/3/search/tv', 'SERIE TV');
       }
    });
}); // end ready

function cerca(template, url, type) {
    if ($('.input').val() !== '') {
        $.ajax({
            url: url,
            method: 'GET',
            data: {
                api_key: 'cd1dad52ddffcbd356f95d30aa3af056',
                language: 'it-IT',
                query: $('.input').val(),
            },
            success: function(res) {
                var risultati = res.results;
                if(risultati.length > 0) {
                   //invoco funzione print
                    print(template, risultati, $('.all-films'), type )
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
}

 // Funzione per stelle/voti
 function getStars(vote_average) {
     //gestione voti stelle
     var nuovoVoto = Math.ceil(vote_average / 2);
                        
     var stellaPiena = '<i class="fullStar fas fa-star"></i>';
     var stellaVuota = '<i class="emptyStar far fa-star"></i>';
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
         flag = '<img class="flag" src="img/it.svg" alt="bandiera italia">';
     } else if (lingua == 'en') {
         flag = '<img class="flag" src="img/en.svg" alt="bandiera england">';
     } else {
         flag = lingua;
     }
     return flag;
 }

 //finzione per stampare in html
 function print(template, risultati, container, type ) {

    for (var i = 0; i < risultati.length; i++) {
        var self = risultati[i];

        var titolo;
        var titoloOriginale;
        if (type == 'SERIE TV') {
            titolo = self.name;
            titoloOriginale = self.original_name;
       
        } else if (type == 'FILM') {
            titolo = self.title;
            titoloOriginale = self.original_title;
        }

        var immagine;
        if (self.poster_path) {
            immagine = 'https://image.tmdb.org/t/p/w342' + self.poster_path;
        } else  {
            immagine = "img/no-poster.png";
        }
        var descr;
        if (self.overview) {
            descr = self.overview.substr(0, 60) + '...';
        } else {
            descr = 'NO DESCRIZIONE';
        }
    
        var dati = {
            poster: immagine,
            title: titolo,
            original_title: titoloOriginale,
            tipo: type,
            icona: getStars(self.vote_average),
            bandiera: getLanguage(self.original_language),
            descrizione: descr,
        };
        
        var html = template(dati);
        container.append(html);
        $('.input').val('');
        
    } //fine ciclo for

 } // fine funzione print