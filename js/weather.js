
/*function aplicarCSS(element,propietat)
{

}*/

function trim(cadena)
{
    /* amb trim eliminem els espais en blanc al començament
    i al final del string */
       cadena=cadena.replace(/^\s+/,'').replace(/\s+$/,'');
       return(cadena);
}

function montarResultat(valor, descripcio)
{
    /* funció per donar format a un valor, no l'empram... */
    return descripcio + ': ' + valor;
}

function validarCiutat(ciutat)
{
    /*Aquesta funció s'encarrega de comprobar si un string
    té format correcte per ser considerat un nom de població */
    
    //declaram un patró regex
    var patro = new RegExp("^[a-zA-Záéíóúàèìòùïñ]{2,}([\\s][a-zA-Záéíóúàèìòùïñ]{2,})*$");

	if (patro.test(ciutat))
        //si passa la validació
	{
		return true;
	}
	else
    {
		return false;
	}
}


function extreureTemps(d) {
    /* donam format al temps i el retornam */
    var hores = checkDigits(d.getHours());
    var minuts = checkDigits(d.getMinutes());
    var segons = checkDigits(d.getSeconds());
    return hores +':'+ minuts +':'+ segons;
}

function tractarDades(arr) {
	var sortida = '';

	switch (arr.cod)
    	//si la consulta ha anat bé, començam:
    {
    	case 200:
        var descripcio = arr.weather+'</span>';

    	if(arr.name=='')
        {
            var ciutat = '<span class=\'valor\'>'+arr.sys.country+'</span>';
        }
        else
        {
            var ciutat = '<span class=\'valor\'>'+arr.name+'</span>';
        }
        



    	var descripcio = '<span class=\'valor\'>'+arr.weather[0].description+'</span>';
    	var direccioVent = '<span class=\'valor\'>'+arr.wind.deg+'</span>';
    	var velocitatVent = '<span class=\'valor\'>'+arr.wind.speed+'</span>';
    	var latitut = '<span class=\'valor\'>'+arr.coord.lat+'</span>';
    	var longitut = '<span class=\'valor\'>'+arr.coord.lon+'</span>';
    	var humitat = '<span class=\'valor\'>'+arr.main.humidity+'</span>';
    	var pressioNivellTerra = '<span class=\'valor\'>'+arr.main.grnd_level+'</span>';
    	var pressioNivellMar = '<span class=\'valor\'>'+arr.main.sea_level+'</span>';
    	var pressio = '<span class=\'valor\'>'+arr.main.pressure+'</span>';
    	var temp = '<span class=\'valor\'>'+arr.main.temp+'</span>';
    	var tempMax = '<span class=\'valor\'>'+arr.main.temp_max+'</span>';
    	var tempMin = '<span class=\'valor\'>'+arr.main.temp_min+'</span>';

        var icono = arr.weather[0].icon+'.png';

        /* extreiem les hores corresponents a l'alba i vespre */
    	var alba = new Date(arr.sys.sunrise * 1000);
        var vespre = new Date(arr.sys.sunset * 1000);
        /* convertim i donam format als string */
        vespre = '<span class=\'valor\'>'+extreureTemps(vespre)+'</span>';
        alba = '<span class=\'valor\'>'+extreureTemps(alba)+'</span>';


    	var header = '<h1 class=\'header\'>El temps actual a '+ciutat+'</h1>';
        var ic = '<img class=\'icono\' src=\'http://openweathermap.org/img/w/'+icono+'\'></img>';
    	var subtitol = '<h3>Descripció actual: <em>'+descripcio+'</em></h3>';
    	var duracioDia = '<p class=\'psortida\'>Avui el Sol surt a les <em>'+alba+'</em> i se posa a les <em>'+vespre+'</em> del vespre.</p>';
    	var condTemp = '<p class=\'psortida\'>Ara mateix tenim <em>'+temp+'</em> graus, la màxima és: <em>'+tempMax+'</em> i sa mínima <em>'+tempMin+'</em>.</p>';
    	var condHumitat = '<p class=\'psortida\'>La humitat és de <em>'+humitat+'%</p>';
    	var condPressio = '<p class=\'psortida\'>La pressió atmosfèrica a nivell la mar és de <em>'+pressioNivellMar+'</em> hectopascals, la pressió corretida en alçada és de <em>'+pressio+'</em> hectopascals.</p>';
    	var condVent = '<p class=\'psortida\'>El vent bufa direcció <em>'+velocitatVent+'</em> km/h i en direcció <em>'+direccioVent+' graus.</em></p>';

    	//It's a kind of magic
    	sortida = header + ic + subtitol;
        sortida += '<ul>';
        sortida += '<li>'+duracioDia+'</li>';
        sortida += '<li>'+condTemp+'</li>';
        sortida += '<li>'+condHumitat+'</li>';
        sortida += '<li>'+condPressio+'</li>';
        sortida += '<li>'+condVent+'</li>';
        sortida += '</ul>';
        
        
    	return document.getElementById("widget").innerHTML = sortida;
    	break;
    	case "404":
    	return document.getElementById('widget').innerHTML = '<p class=\'error\'>ERROR! Ciutat innexistent!</p>';
    	break;
    	default:
    	return document.getElementById('widget').innerHTML = '<p class=\'error\'>ERROR! desconegut</p>';
    }
}

    function obtenirDadesTemps(toScreen) {
        //paràmetre per defecte false
    	if (typeof(toScreen)==='undefined') modeText = false;
        
        /* vuidam els resultats previs i ocultam les div */
        document.getElementById('widget').innerHTML = '';
        document.getElementById('json').innerHTML = '';
        if(swapvisible("blocresultat"))
        {
            swapvisible("blocresultat");   
        }
        if(swapvisible("blocjson"))
        {
            swapvisible("blocjson");
        }
        

        //agafam el texte introduit i llevam els espais
        var texte = trim(String(document.getElementById('entrada').value));

        /* feim la div de resultats visible */
    	if(validarCiutat(texte)) 
    	{

            /* montam el string ciutat per validar-lo */
            var ciutat = 'q='+document.getElementById('entrada').value+'';

    		var xmlhttp = new XMLHttpRequest();
    		var url = 'http://api.openweathermap.org/data/2.5/weather?'+ciutat+'&type=like&units=metric&lang=ca&APPID=2f7e1147efeeabf96a3340bd8d359739';

    		xmlhttp.onreadystatechange = function() {
    			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    				var resposta = JSON.parse(xmlhttp.responseText);
                    tractarDades(resposta);
                    swapvisible("blocresultat");
                    /*feim visible la div json */
                    swapvisible("blocjson");
                    document.getElementById('json').innerHTML = '<blockquote class=\'json\'>'+xmlhttp.responseText+'</blockquote>';
    				/*if(toScreen)
    				{
                        document.getElementById('json').innerHTML = xmlhttp.responseText;
                        document.getElementById('json').innerHTML = xmlhttp.responseText;
                        myFunction(resposta);
    				}
    				else
    				{
                        //console.log(xmlhttp.responseText);
                        myFunction(resposta);
                        document.getElementById('json').innerHTML = xmlhttp.responseText;
    					
    				}*/
    			}
    		}
    		xmlhttp.open('GET', url, true);
    		xmlhttp.send();
    	}
    	else
    	{
            swapvisible("blocresultat");
    		return document.getElementById("widget").innerHTML = "<p class=\'error\'>Error! Introdueix un nom de ciutat!</p>";
    	}
    }