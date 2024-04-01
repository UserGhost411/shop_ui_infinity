let table = []
let selectedWindow = "none"
let shopItems =[]
let tabindexx = 0
let cartitems = []
window.addEventListener('message', function (event) {
	switch (event.data.action) {
		case 'init_data':
			if (event.data.timeout_warga > 1) {
				$("#testid_timeout").removeClass("d-none")
			}

			timeout_warga = event.data.timeout_warga
			break
		case 'uppershow':
			if (event.data.hide) {
				$("#upper_id").addClass("d-none")
			} else {
				$("#upper_id").removeClass("d-none")
			}
			break
		case 'loading_data':
			if (selectedWindow == "none") {
				$('#menu').html(`
					<div class="d-flex justify-content-center flex-column align-items-center">
						<span class="load"></span>
						<br>
						<div style="font-size: 40px; color: #fff;">Loading Data...</div>
					</div>
				`);
				$("#menu").fadeIn();
				$(".main_card").fadeIn();
				selectedWindow = "loading_data";
			}
			break
		case 'show_about':
			$('#menu').html(`
						<h1>Selamat datang di Infinity Server</h1>
						<p>Server Owner and Administrator : Skies (InfamousGamer)<Br>Lead Dev: UserGhost411<br><br>NUI can also send calls back to the game using so-called 'NUI callbacks'. These are currently only fully supported in Lua, other languages can be used but need a bit of a tricky workaround as these predate function references in codegen.

						Generally, you'll use the RegisterNUICallback function in Lua, and the REGISTER_NUI_CALLBACK_TYPE native along with an event handler in other languages.</p>
					`);
			$("#menu").fadeIn();
			$(".main_card").fadeIn();
			selectedWindow = "show_about";
			break
		case 'update_info_player':
			$("#info_player").show()
			$("#info_player").html(`ID: ${event.data.id}  |  Job: ${event.data.job} (${event.data.grade})`)
			break
		case 'notif_sound':
			let audio = new Audio('atm.mp3');
			audio.play();
			break
		case 'blind':
			if (event.data.state == 1) {
				$(document.body).addClass("bg-dark")
			} else {
				$(document.body).removeClass("bg-dark")
			}
			break
	}
});
function secondsToTime(seconds) {
	if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
		return "Invalid input";
	}

	if (seconds === 0) {
		return "0 Sec";
	}

	const timeUnits = {
		tahun: 31536000,
		bulan: 2592000,
		hari: 86400,
		jam: 3600,
		menit: 60,
		detik: 1,
	};

	let result = [];

	for (const unit in timeUnits) {
		const unitInSeconds = timeUnits[unit];
		const unitCount = Math.floor(seconds / unitInSeconds);

		if (unitCount > 0) {
			result.push(`${unitCount} ${unit}`);
			seconds -= unitCount * unitInSeconds;
		}
	}

	return result[0] + " " + (result[1] != undefined ? result[1] : ""); // Remove the trailing ", "
}
function closewindow(){
	$.post(`https://${GetParentResourceName()}/action`, JSON.stringify({
				action: "close",
	}));
	selectedWindow = "none"
	// $("#menu").fadeOut();
	$(".main_card").fadeOut();
}
// Close ESC Key
$(document).ready(function () {
	// $("#info_player").hide()
	document.onkeyup = function (data) {
		if (data.which == 27) {
			closewindow()
		}
	};
	$("#search_input").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$(".searchable div").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
		
	});
	additem("bebek_bakar","Bebek Bakar","https://picsum.photos/200/100?1",20000,10,"Makanan")
	additem("bebek_goreng","Bebek Goreng","https://picsum.photos/200/100?2",15000,10,"Makanan")
	additem("bebek_kukus","Bebek Kukus","https://picsum.photos/200/100?3",15000,10,"Makanan")
	additem("es_teh","Es Teh","https://picsum.photos/200/100?4",3000,10,"Minuman")
	additem("es_jeruk","Es Jeruk","https://picsum.photos/200/100?5",5000,10,"Minuman")
	additem("es_cola","Es Cola","https://picsum.photos/200/100?6",5000,10,"Minuman")
	additem("es_nutrisari","Es Nutrisari","https://picsum.photos/200/100?73",4000,10,"Minuman")
	additem("es_teh","Es Teh","https://picsum.photos/200/100?42",3000,10,"Minuman")
	additem("es_jeruk","Es Jeruk","https://picsum.photos/200/100?52",5000,10,"Minuman")
	additem("es_cola","Es Cola","https://picsum.photos/200/100?62",5000,10,"Minuman")
	additem("es_nutrisari","Es Nutrisari","https://picsum.photos/200/100?72",4000,10,"Minuman")
	additem("es_teh","Es Teh","https://picsum.photos/200/100?42",3000,10,"Minuman")
	additem("es_jeruk","Es Jeruk","https://picsum.photos/200/100?53",5000,10,"Minuman")
	additem("es_cola","Es Cola","https://picsum.photos/200/100?64",5000,10,"Minuman")
	additem("es_nutrisari","Es Nutrisari","https://picsum.photos/200/100?47",4000,10,"Minuman")
	additem("es_teh","Es Teh","https://picsum.photos/200/100?44",3000,10,"Minuman")
	additem("es_jeruk","Es Jeruk","https://picsum.photos/200/100?54",5000,10,"Minuman")
	additem("es_cola","Es Cola","https://picsum.photos/200/100?65",5000,10,"Minuman")
	additem("es_nutrisari","Es Nutrisari","https://picsum.photos/200/100?75",4000,10,"Minuman")
	additem("pistol","Pistol","https://picsum.photos/200/100?8",150000,10,"Lainnya")
	loadshop()
});

function additem(id,name,img,price,stock,category){
	shopItems.push({
		id:id,
		name:name,
		img:img,
		stock:stock,
		price:price,
		category:category
	})
}
function createItemObject(item){
	return `<div class="col-3 mb-2">
	<div class="card border border-secondary">
		<img src="${item.img}" class="card-img-top" alt="...">
		<div class="card-body p-1">
			<small class="d-block">${item.name}</small>
			<small class="d-block">${duit(item.price)}</small>
			<button onclick="addtocart(this,'${item.id}')" class="btn btn-primary btn-sm float-end py-0">Cart</button>
		</div>
	</div>
</div>`
}
function humanification(data){
	return capitalizeEachWord(data.replace("_"," ").replace("-"," "))
}
function idnification(data){
	return (data.replace(" ","_").replace(",","").replace(".","")).toLowerCase()
}
function createCategoryObject(category){
	tabindexx++;
	const idread = idnification(category)
	return `<div class="tab-pane fade ${(tabindexx==0?"show active":"")}" id="nav-${idread}" role="tabpanel" tabindex="0">
		<div class="row searchable" id="content_cat_${idread}">
	</div>
</div>`
}
function createCategoryNavObject(category){
	
	const humanread = humanification(category)
	const idread = idnification(category)
	return `<button class="nav-link" id="nav-${idread}-tab" data-bs-toggle="tab"
	data-bs-target="#nav-${idread}" type="button" role="tab">${humanread}</button>`
}
function capitalizeEachWord(string){
    const str_arr = string.split(' ')
    for(i = 0; i < str_arr.length; i++){
        str_arr[i] = str_arr[i][0].toUpperCase() + str_arr[i].slice(1)
    }
    return str_arr.join(' ')
}
function loadshop(){
	tabindexx = 0
	cartitems = []
	let categorys = []
	let tabcontent = []
	let navcontent = []
	let itemcontent = []
	for (const item of shopItems) {
		if (!categorys.includes(item.category)){
			categorys.push(item.category)
		}
		// itemcontent.push(createItemObject(item.id,item.name,item.img))
	}
	for (const cat of categorys) {
		tabcontent.push(createCategoryObject(cat))
		navcontent.push(createCategoryNavObject(cat))
	}
	
	$("#nav-tabContent").html(tabcontent.join(""))
	$("#nav-tab").html(navcontent.join(""))
	for (const item of shopItems) {
		const idread = idnification(item.category)
		$(`#content_cat_${idread}`).append(createItemObject(item))
	}
	$(`#nav-${idnification(categorys[0])}-tab`).click()
	refreshCart()
}
function stocksafe(id,val){
	for (const i of shopItems) {
		if (i.id == id){
			return (i.stock >= val)
		}
	}
	return false
}
function addstock(id,add,all){
	let tmp = []
	if (isOnCart(id)){
		if (add == false && all){
			for (const ca of cartitems) {
				if (ca.id != id) tmp.push(ca)
			}
			cartitems = tmp
			return refreshCart()
		}else if(add){
			for (const ca of cartitems) {
				if (ca.id == id){
					tmp.push({
						id:ca.id,
						qty:(ca.qty + (stocksafe(id,(ca.qty + 1))?1:0))
					})
				}else{
					tmp.push(ca)
				} 
			}
			cartitems = tmp
			return refreshCart()
		}else if(!add){
			for (const ca of cartitems) {
				if (ca.id == id) {
					if (ca.qty == 1) {
						return addstock(id,false,true)
					}else{
						tmp.push({
							id:ca.id,
							qty:(ca.qty - 1)
						})
					}
				}else{
					tmp.push(ca)
				}
			}
			cartitems = tmp
			return refreshCart()
		}
	}
}
function duit(a){
	return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
function refreshCart(){
	if (cartitems.length > 0){

		$("#cart_content").html(`<p>Your Cart:</p><div id="cart_items"></div><div id="cart_detail"></div>`)
		let total_price = 0
		let cart_items = []
		for (const cart of cartitems) {
			for (const item of shopItems) {
				if (item.id == cart.id) {
					
						total_price += (cart.qty * item.price)
						cart_items.push(`<div class="my-2 p-1 bg-dark border border-1 rounded-2">
						<div class="mx-1 d-flex flex-row align-items-center justify-content-between">
							<div class="flex-grow-1">
								${item.name} 
							</div>
							<div class="me-4">
								<div class="d-flex flex-row align-items-center justify-content-between">
									<button class="btn btn-primary btn-sm float-end" onclick="addstock('${item.id}',true,false)"><i class="fas fa-plus"></i></button>
									<button class="btn mx-0 px-0" style="min-width: 30px;">${cart.qty}</button>
									<button class="btn btn-secondary btn-sm float-end" onclick="addstock('${item.id}',false,false)"><i class="fas fa-minus"></i></button>
								</div>
							</div>
							<div>
								<button class="btn btn-danger btn-sm float-end" onclick="addstock('${item.id}',false,true)"><i class="fas fa-trash"></i></button>
							</div>
						</div>
					  </div>`)
					
					break
				}
			}
		}
		$("#cart_items").html(cart_items.join(""))
		$("#cart_detail").html(`<b>SubTotal: ${duit(total_price)}</b><hr><div class="row">
		<div class="col-6"><button class="btn btn-success w-100" onclick="closewindow()">Buy</button></div>
		<div class="col-6"><button class="btn btn-danger w-100" onclick="closewindow()">Cancel</button></div>
		</div> `)
		
	}else{
		$("#cart_content").html(`<center class="my-3"><h3>Empty Cart</h3><i class="fas fa-shopping-basket fa-3x"></i></center> <hr> <button class="btn btn-danger w-100" onclick="closewindow()">Cancel</button>`)
	}
	
}
function isOnCart(id){
	for (const c of cartitems) {
		if (c.id == id){
			return true
		}
	}
	return false
}
function addtocart(btn,id){
	if (!isOnCart(id)){
		for (const item of shopItems) {
			if (item.id == id) {
				if (item.stock > 0) {
					cartitems.push({
						id:item.id,
						qty:1,
					})
					refreshCart()
				}
				break
			}
		}
	}else{
		addstock(id,true,false)
	}
	
}