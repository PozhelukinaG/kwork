function getCookie( name ) {
    var start = document.cookie.indexOf( name + '=' );//Метод indexOf() возвращает индекс первого вхождения указанного значения в строковый объект String, на котором он был вызван, начиная с индекса fromIndex. Возвращает -1, если значение не найдено.
    var len = start + name.length + 1;
    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) return null;//Метод substring() возвращает подстроку строки между двумя индексами, или от одного индекса и до конца строки.
    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ';', len );//len - указывает место начала поиска
    if ( end == -1 ) end = document.cookie.length;
    return decodeURI( document.cookie.substring( len, end ) );//Метод decodeURI() декодирует унифицированный идентификатор ресурса (URI), созданный при помощи метода encodeURI или другой подобной процедуры.
}

function setCookie( name, value, expires, path, domain, secure ) {
    var today = new Date();//создаем объект
    today.setTime( today.getTime() );//задаем значение даты
    if ( expires ) expires = expires * 1000 * 60 * 60 * 24;
    var expires_date = new Date( today.getTime() + (( expires ) ? expires : 1000 * 60 * 60 * 24 ) );
    document.cookie = name+'='+escape( value ) +//escape Кодирует строки таким образом, чтобы они могли читаться на всех компьютерах
        ';expires='+expires_date.toUTCString() +//Метод toUTCString() преобразует дату в строку, используя часовой пояс UTC
        ( ( path ) ? ';path=' + path : '' ) +
        ( ( domain ) ? ';domain=' + domain : '' ) +
        ( ( secure ) ? ';secure' : '' );
}

function resize(v){//изменение размера шрифта
    e=document.body;//<BODY> = document.body
    var c=e.currentStyle || window.getComputedStyle(e, null);//чтобы получить текущее используемое значение свойства элемента е
   // Свойство currentStyle(IE8-) и метод getComputedStyle (IE9+, стандарт) позволяют получить реальное, применённое сейчас к элементу свойство стиля с учётом CSS-каскада и браузерных стилей по умолчанию.
    
    if(v)c=Math.max(8,Math.min(20,parseInt(c.fontSize)+v))+'px';//parseInt() ринимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
    else c='16px';
    e.style.fontSize= c;

    setCookie( "fontSize", c);
    return false;
}
if(i=getCookie("fontSize"))window.onload=function(o){return function(){document.body.style.fontSize=o;}}(i);
//Событие onload на window срабатывает, когда загружается вся страница, включая ресурсы на ней – стили, картинки, ифреймы и т.п.
