const CACHE_NAME = 'mi-cache-1';

self.addEventListener('install', evento => {

    evento.waitUntil(
        
        (async() => {
            try {
                cache_obj = await caches.open(CACHE_NAME)
                cache_obj.addAll(

                    './',
                    './index.html',
                    './css/estilos.css',
                    './app.js',
                    './icons/icon-96x96.png',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
                    )
                 }catch {
                console.log("Error en el cacheo")
                }
       })
                   )
  })

self.addEventListener('fetch', evento => {
    const respuesta = fetch(  evento.request ).then( respNet => {
        return caches.open(CACHE_NAME).then( cache => {
            cache.put( evento.request, respNet.clone() );
            return respNet;
        })
    }).catch( error => {  
        return caches.match(evento.request);
    })
    evento.respondWith(respuesta);
})

