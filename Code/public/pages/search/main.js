
var restaurant_template = (r) => `
<div class=" col-md-4 col-sm-6">
						<div class="single-explore-item">
							<a href="../view-restaurant/index.html?id=${r.restaurant_id}&name=${r.title}">
								<div class="single-explore-img">
									<img src=${r.img1 || "assets/images/explore/e1.jpg"} alt="explore image" />
									<div class="single-explore-img-info">
										<button onclick="window.location.href='#'">best rated</button>
										<div class="single-explore-image-icon-box">
											<ul>
												<li>
													<div class="single-explore-image-icon">
														<i class="fa fa-arrows-alt"></i>
													</div>
												</li>
												<li>
													<div class="single-explore-image-icon">
														<i class="fa fa-bookmark-o"></i>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</a>
							<div class="single-explore-txt bg-theme-1">
								<h2><a href="#">${r.title}</a></h2>
								<p class="explore-rating-price">
									<span class="explore-rating">5.0</span>
									<a href="#"> 10 ratings</a>
									<span class="explore-price-box">
										$ médio
										<span class="explore-price">${r.average_price}</span>
									</span>
									<a href="#">Restaurant</a>
								</p>
								<div class="explore-person">
									<div class="row">
										<div class="col-sm-10">
											<p>
												${r.information}
											</p>
										</div>
									</div>
								</div>
								<div class="explore-open-close-part">
									<div class="row">
										<div class="col-sm-5">
											<button class="close-btn" onclick="window.location.href='#'">${r.schedule}</button>
										</div>
										<div class="col-sm-7">
											<div class="explore-map-icon">
												<a href="#"><i data-feather="map-pin"></i></a>
												<a href="#"><i data-feather="upload"></i></a>
												<a href="#"><i data-feather="heart"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
`;

var mock_restaurants = [
    {
        restaurant_id: 1,
        title: "Mc Donalds",
        address: "Porto, Aveiro da maral",
        coordinates: "-15.00231234,12.1482392",
        average_price: "30EUR",
        minimal_reservation_fee: "10 EUR",
        information: "Bom lugar para lazer.",
        schedule: "06:00 - 22:00",
        kitchen: "Salgados, Fast Food",
        phone: "+351 156 214 396",
        img1: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxzZWFyY2h8Mnx8fHwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
        img2: "Image 2",
        img3: "Image 3",
        status: 1,
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString(),
    },
    {
        restaurant_id: 2,
        title: "Burger King",
        address: "Porto, Aveiro da maral",
        coordinates: "-15.00231234,12.1482392",
        average_price: "30EUR",
        minimal_reservation_fee: "10 EUR",
        information: "Great food.",
        schedule: "08:00 - 16:00",
        kitchen: "Salgados, Fast Food",
        phone: "+351 156 214 396",
        img1: "https://www.linguahouse.com/linguafiles/md5/d01dfa8621f83289155a3be0970fb0cb",
        img2: "Image 2",
        img3: "Image 3",
        status: 1,
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString(),
    },
    {
        restaurant_id: 3,
        title: "Pizza Hut",
        address: "Porto, Aveiro da maral",
        coordinates: "-15.00231234,12.1482392",
        average_price: "30EUR",
        minimal_reservation_fee: "10 EUR",
        information: "A melhor pizza do mundo!",
        schedule: "24/7",
        kitchen: "Salgados, Fast Food",
        phone: "+351 156 214 396",
        img1: "https://www.episerver.com/globalassets/02.-global-images/frontify/website-images/alan-hardman-su1lfoeeukk-unsplash.jpg",
        img2: "Image 2",
        img3: "Image 3",
        status: 1,
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString(),
    }
]

window.onload = () => {
    const _location = window.location;
    const _params = _location.search;
    const __params = _params.split("&");
    const search = __params[0].replace("?", "").split("=")[1];
    const location = __params[1].replace("?", "").split("=")[1];
    console.log("Search and Location ::: ", search, location);
    let _base_api_url = "http://localhost:3000/api";

    //Get Restaurants On Load
    fetch(_base_api_url + `/restaurants/search/${(search && search != '' && search) || '-'}/${(location && location != '' && location) || '-'}`).then(res => res.json()).then((response) => {
        let template = "";
        let list = [...response.response];
        list = list.slice(0, 9);
        list.forEach((item) => {
            item["information"] = `${item.information}`.slice(0, 60);
            template += restaurant_template(item)
        });
        document.getElementById("content-view").innerHTML = template;
    }).catch((error) => {
        console.log("Server Error :: ", error);
        document.getElementById("content-view").innerHTML = `<div class="row">
        <div class="col-12">
            <h2>Found <span class="quant-results">0</span> results on search for "${search}" in location "${location}"</h2>
        </div>
    </div>`;
    });

} //!-Get location of the user on load of pagev

