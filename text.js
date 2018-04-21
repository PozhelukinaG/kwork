function getCookie( name ) {
    var start = document.cookie.indexOf( name + '=' );
    var len = start + name.length + 1;
    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) return null;
    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ';', len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
}

function setCookie( name, value, expires, path, domain, secure ) {
    var today = new Date();
    today.setTime( today.getTime() );
    if ( expires ) expires = expires * 1000 * 60 * 60 * 24;
    var expires_date = new Date( today.getTime() + (( expires ) ? expires : 1000 * 60 * 60 * 24 ) );
    document.cookie = name+'='+escape( value ) +
        ';expires='+expires_date.toGMTString() +
        ( ( path ) ? ';path=' + path : '' ) +
        ( ( domain ) ? ';domain=' + domain : '' ) +
        ( ( secure ) ? ';secure' : '' );
}

function resize(v){
    e=document.body;
    var c=e.currentStyle || window.getComputedStyle(e, null);
    if(v)c=Math.max(8,Math.min(20,parseInt(c.fontSize)+v))+'px';
    else c='16px';
    e.style.fontSize= c;
    //console.log(c);
    setCookie( "fontSize", c);
    return false;
}
if(i=getCookie("fontSize"))window.onload=function(o){return function(){document.body.style.fontSize=o;}}(i);

