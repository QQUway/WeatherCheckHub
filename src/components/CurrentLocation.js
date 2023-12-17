if (navigator.geolocation) {
  this.getPosition().then((position) => {
    this.getWeather(position.coords.latitude, position.coords.longitude);
  });
} else {
  alert("Geolocation not available");
}
