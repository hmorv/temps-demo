function jsonp(url)
{
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
}
function jsonProcess(data)
{
	alert(data);
	console.info(data);
}
function test()
{
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=palma&type=like&units=metric&lang=ca&APPID=2f7e1147efeeabf96a3340bd8d359739&callback=jsonProcess';
	jsonp(url);
}