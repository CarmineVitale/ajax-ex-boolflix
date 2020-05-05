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
                        //gestione stelle voti
                        var nuovoVoto = Math.ceil((Math.ceil(self.vote_average) / 2));
                        var stellaPiena = '<i class="fas fa-star"></i>';
                        var stellaVuota = '<i class="far fa-star"></i>';
                        var ciao = '';
                        for (var j = 0; j < 5; j++) {
                            if (nuovoVoto > j) {
                                ciao += stellaPiena;
                            } else {
                                ciao += stellaVuota;
                            }
                        }
                        
                        
                        var dati = {
                            title: 'Titolo: ' + self.title,
                            original_title: 'Titolo originale: ' + self.original_title,
                            original_language: 'Lingua: ' + self.original_language,
                            vote_count: 'Voto medio: ' + nuovoVoto,
                            icona: 'Voto icona:' + ciao ,
                            tipo: 'Tipo: Film',

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

                        //gestione voti stelle
                        var nuovoVoto = Math.ceil((Math.ceil(self.vote_average) / 2));
                        var stellaPiena = '<i class="fas fa-star"></i>';
                        var stellaVuota = '<i class="far fa-star"></i>';
                        var ciao = '';
                        for (var j = 0; j < 5; j++) {
                            if (nuovoVoto > j) {
                                ciao += stellaPiena;
                            } else {
                                ciao += stellaVuota;
                            }
                        }
                        var dati = {
                            title: 'Titolo: ' + self.name,
                            original_title: 'Titolo originale: ' + self.original_name,
                            original_language: 'Lingua: ' + self.original_language,
                            vote_count: 'Voto medio: ' + nuovoVoto,
                            tipo: 'Tipo: Serie TV',
                            icona: 'Voto icona:' + '<i class="far fa-star"></i>',
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
//  function trasformaVoto(s) {
//     var voto = self.vote_average;
//     var nuovoVoto = (Math.ceil(self.vote_average) / 2);
//     return nuovoVoto
// }