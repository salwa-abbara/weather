var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


document.getElementById("search").addEventListener("keyup", a=>{
    search(a.target.value)
}
);


async function search(cityName) {
    let responce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4374fc72e3834fe2a2e155924242606&q=${cityName}&days=3`);
    if (responce.ok && 400 != responce.status) {
        let data = await responce.json();
        displayCurrentDay(data.location, data.current),
        displayNextDays(data.forecast.forecastday)
    }
}
var x = window.matchMedia("(min-width: 992px)");
function displayCurrentDay(location, current) {
    if (null != current) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let dayInfo = `<div class="today forecast">\n
                    <div class="forecast-header d-flex justify-content-between"  id="today">\n    
                        <div class="day">${days[date.getDay()]}</div>\n    
                        <div class=" date">${date.getDate() + monthNames[date.getMonth()]}</div>\n    
                    </div>\n    
                    <div class="forecast-content" id="current">\n    
                        <div class="location">${location.name}</div>\n    
                        <div class="degree d-sm-flex d-md-flex  d-lg-block">\n        
                            <div class="num">${current.temp_c}<sup>o</sup>C</div>\n      \n        
                            <div class="forecast-icon align-self-center">\n            
                                <img src="https:${current.condition.icon}" alt="" width=90>\n        
                            </div>\t\n    
                            \n    
                        </div>\n    
                        <div class="custom">${current.condition.text}</div>\n    
                        <span><img src="/img/icon-umberella@2x.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t
                        <span><img src="/img/icon-wind@2x.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t
                        <span><img src="/img/icon-compass@2x.png" alt="">East</span>\n    
                    </div>\n
            </div>`;
        document.getElementById("forecast").innerHTML = dayInfo
    }
}


function displayNextDays(forecastday) {
    let nextDayInfo = "";
    for (let i = 1; i < forecastday.length; i++)
        nextDayInfo += `\t<div class="forecast">\n        
                    <div class="forecast-header">\n            
                        <div class="day">${days[new Date(forecastday[i].date.replace(" ", "T")).getDay()]}</div>\n        
                    </div>\n        
                    <div class="forecast-content">\n            
                        <div class="forecast-icon">\n                
                             <img src="https:${forecastday[i].day.condition.icon}" alt="" width=48>\n            
                        </div>\n           
                        <div class="degree">${forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>\n            
                        <small>${forecastday[i].day.mintemp_c}<sup>o</sup></small>\n            
                        <div class="custom">${forecastday[i].day.condition.text}</div>\n        
                    </div>\n        
                </div>`;
    document.getElementById("forecast").innerHTML += nextDayInfo
}
search("cairo");
