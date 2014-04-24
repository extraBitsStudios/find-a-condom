$( document ).ready( function () {
    $( function () {
        var map = L.map( 'map', {
            zoomControl: false
        } ).setView( [35.5800, -82.5558], 13 );
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom    : 18
        } ).addTo( map );
        map.locate( {
            setView: true,
            maxZoom: 16
        } );
        function onLocationFound( e ) {
            var radius = e.accuracy / 2;
            L.marker( e.latlng ).addTo( map )
                .bindPopup( "You are within " + radius + " meters from this point" ).openPopup();
//            L.circle(e.latlng, radius).addTo(map);
        }

        map.on( 'locationfound', onLocationFound );
        function onLocationError( e ) {
            alert( e.message );
        }

        map.on( 'locationerror', onLocationError );
        function onEachFeature( feature, layer ) {
            var popupContent = '<b>' + feature.properties.name + '</b><br>'
                + feature.properties.address + '<br>'
                + feature.properties.city + ', '
                + feature.properties.state + ' '
                + feature.properties.zip + '<br>'
                + 'Phone: ' + feature.properties.phone + '<br>';
            if ( feature.properties && feature.properties.popupContent ) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup( popupContent );
        }

        $.getJSON( $( 'link[rel="wncap"]' ).attr( "href" ), function ( data ) {
            var geojson = L.geoJson( data, {
                onEachFeature: onEachFeature
            } );
            map.fitBounds( geojson.getBounds() );
            geojson.addTo( map );
        } );
    } );
} );
