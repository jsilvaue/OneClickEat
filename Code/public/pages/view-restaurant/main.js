/* 
address: " Rua Barata Salgueiro 37A, 1250-042 Lisboa"
average_price: 20
coordinates: 0
img1: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
img2: "https://media.istockphoto.com/photos/two-empty-wine-glasses-sitting-in-a-restaurant-on-a-warm-sunny-picture-id1018141890?k=6&m=1018141890&s=612x612&w=0&h=_OmlYECOxfO-VHY3eIzuJSPRXUXiFbeHHp3RUZGQoSQ="
img3: "https://www.linguahouse.com/linguafiles/md5/d01dfa8621f83289155a3be0970fb0cb"
information: "Tem take away, Bar completo, Interior,Tem wifi, Opções vegetarianas, Menu de almoço, Esplanada, Super Bock Selecção 1927 disponível"
kitchen: "Portuguesa e petiscos"
minimal_reservation_fee: 15
phone: 1
restaurant_id: 1
schedule: "Todos os dias 12:00–01:00
↵"
status: 1
title: "Dote" */
const _template = (r) => `
<div class="container">
<div class="view-restaurant-section-header">
    <h2 class="restaurant-name-header">${r.title}</h2>
    <p class="restaurant-name-address">${r.address}</p>
</div>
<div class="view-restaurant-image mb-3">
    <img src="${r.img2}" alt="Image of restaurant" />
</div>
<div class="view-restaurant-section-actions mb-3">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="row">
                <div class="col-sm-12 col-md-3 col-lg-3">
                    <a data-toggle="modal" href='#make-reservation-modal'>
                        <button class="btn btn-primary btn-sm">
                            Reservar mesa
                        </button>
                    </a>
                </div>
                <div onClick="viewDirections()" class="col-sm-12 col-md-3 col-lg-3">
                    <button class="btn btn-default btn-sm">Encontrar no mapa</button>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3">
                    <button class="btn btn-default btn-sm">Adic. aos favoritos</button>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3">
                    <button class="btn btn-warning btn-sm">Adic. feedback</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!--/.section-header-->
<div class="view-restaurant-section-content">
    <h2>Horário</h2>
    <p class="time-schedule-content">
        <span class="restaurant-status restaurant-status-closed restaurant-status-opened"></span> ${r.schedule}
    </p>
    <!--<h2>Menu</h2>
    <ul class="menu-content menu-content-list mb-3">
        <li class="menu-content-list-item"></li>
    </ul>-->
    <h2>Cozinha</h2>
    <ul class="kitchen-content kitchen-content-list mb-3">
        <li class="kitchen-content-list-item">${r.kitchen}</li>
    </ul>
    <h2>Preço médio</h2>
    <p class="average-price-content mb-3">${r.average_price} Euros<br />Exclusivo de impostos e
        taxas
        aplicáveis, se for o caso</p>
    <h2>Mais informações</h2>
    <p class="more-information-content mb-3">
    ${r.information}
    </p>
</div>
</div>
`;
let coordinates = null;
function viewDirections() {
    alert(coordinates);
    window.location.replace(`https://www.google.com/maps/place/@${coordinates}`);
}
let restaurant = {};

function emitBookingOrder() {
    console.log("Emitting Booking ::: ");
    let _base_api_url = "http://localhost:3000/api";
    const selectedTable = document.getElementById("mr-table-selector").value;
    const date = document.getElementById("mr-reservation-date").value;
    const time = document.getElementById("mr-reservation-time").value;
    const firstName = document.getElementById("mr-first-name").value;
    const lastName = document.getElementById("mr-last-name").value;
    const phone = document.getElementById("mr-phone-number").value;
    const email = document.getElementById("mr-email").value;
    //Setup Data
    const request = {
        client_id: 0,
        restaurantTable_id: parseInt(`${selectedTable}`),
        reservation_date: date,
        reservation_time: time,
        client_name: `${firstName} ${lastName}`,
        client_phone: phone,
        client_email: email
    };
    console.log("Request ::: ", request);
    //Send Booking
    fetch(_base_api_url + "/bookings", { mode: "cors", method: "POST", body: JSON.stringify(request), headers: new Headers({ 'content-type': 'application/json' }) }).then((res) => {
        alert("Success on Booking!", res);
        console.log("Booking Emitted ::: ")
    }).catch((error) => {
        console.log("Failed to emit booking ::: ", error);
        alert("Failed to create booking!");
    }).finally(() => {
        $("#make-reservation-modal").modal('hide');
    });
}

window.onload = () => {
    //Get ID of Restaurant and fetch all other informations
    const _location = window.location;
    const _params = _location.search;
    const __params = _params.split("&");
    const id = __params[0].replace("?", "").split("=")[1];
    const name = __params[1].replace("?", "").split("=")[1];

    let _base_api_url = "http://localhost:3000/api";
    //Get location of the user on load of page
    //Get Restaurants On Load
    fetch(_base_api_url + `/restaurants/${id}`, { mode: "cors", method: "GET" }).then(res => res.json()).then((response) => {
        console.log("Response of Data ::: ", response);
        restaurant = response.response;
        coordinates = restaurant.coordinates;
        document.getElementById("explore").innerHTML = _template(restaurant);
        return id;
    }).then(async (_id) => {

        await fetch(_base_api_url + `/tables/restaurant/${id}`, { mode: "cors", method: "GET" }).then(res => res.json()).then((response) => {
            restaurant["tables"] = response.response;
            let _tables = response.response;
            let _template = ``;
            _tables.forEach((table) => {
                _template += `<option value='${table.restaurantTable_id}'>Mesa ${table.min_occuptation} -> ${table.max_occupation} Lugares</option>`
            });
            document.getElementById("mr-table-selector").innerHTML = _template;
        });


    }).catch((error) => {

        console.log("List On Load Restaurants - Error ::: ", error);

        document.getElementById("view-restaurants-list-home").innerHTML = "<h2>Failed to get restaurant!</h2><p>A problem with you connection was detected with our servers, please try again!</p>";
    });

} //!-Get location of the user on load of pagev