/**
    Library Name: Llibreria bàsica interfici d'usuari
    Author: H. Moragues
    URI Author: www.palmacodi.net
    Description: a short and brief set of ui functions.
    Everything is built on JS, jQuery-less flavour.
    */
    function canviarTextMarca(marca,t1,t2)
    {
    /* funció per intercanviar el texte del contingut d'una marca HTML.
    Noteu que ambdós textes es passen com a paràmetres  */
    var contenidor = document.getElementById(marca);
    if(contenidor === null)
    {
        return console.log('La marca '+marca+' no existeix!');
    }
    else
    {
        if(contenidor.innerHTML == t1)
        {
            contenidor.innerHTML = t2;
        }
        else
        {
            contenidor.innerHTML = t1;
        }
    //return b.innerHTML;
}

}

function swapvisible(element)
{
    /* aquesta funció fa un intercanvi de visibilitat de l'element
    rebut com a paràmetre, a més, retorna cert si tras l'execució
    l'element es fa visible i false al contrari */
    if(document.getElementById(element).style.display === 'block')
    {
        document.getElementById(element).style.display = 'none';
        return false;
    }
    else
    {
        document.getElementById(element).style.display = 'block';
        return true;
    }
}

function checkDigits(p) {
    /* Reb com a paràmetre d'entrada un string numeric, retorna p amb un zero o no,
    depenent si l'entrada és un digit o dos */
    try
    {
        if (parseInt(p) > 9)
        {
            return p;
        }
        else
        {
            return '0'+p;
        }
    }
    catch(err)
    {
        console.log('Aquest paràmetre no és... correcte.');
        return '--';
    }
}