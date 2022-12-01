const CACHE_NAME = 'mi-cache-1';
const CACHE_ESTABLE = 'mi-cache-2';


self.addEventListener('install', evento => {
    const respCache = caches.open(CACHE_NAME).then( cache => {
        return cache.addAll([
            '/',
            'index.html',
            'css/estilos.css',
            'app.js',
          
            
        ])
    })

    evento.waitUntil(respCache);   
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


self.addEventListener('install', evento => {
    const respCache = caches.open(CACHE_ESTABLE).then( cache => {
        return cache.addAll([
            '/',
            'icons/icon-96x96.png',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
            
        ])
    })

    evento.waitUntil(respCache);   
})

self.addEventListener('fetch', evento => {
    const respuesta = fetch(  evento.request ).then( respNet => {
        return caches.open(CACHE_ESTABLE).then( cache => {
            cache.put( evento.request, respNet.clone() );
            return respNet;
        })
    }).catch( error => {  
        return caches.match(evento.request);
    })
    evento.respondWith(respuesta);
})