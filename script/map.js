
fetch("https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=164%20Townsend%20St.%2C%20San%20Francisco%2C%20CA&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "77c533de36msha30d7da5406a23dp134783jsnb35fd9a4f406",
		"x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


function initMap(){
    var coord = {lat:-32.9275918 ,lng: -60.6690642};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}