var count = 0;
	start_time = 0;
	last_click = 0;
	last_result = 0;

function load_action() {
	menu = document.getElementById("menu_div")
	action = document.getElementById("action_div")
	history_ = document.getElementById("history_div")
	menu.style = "display: none;"
	action.style = "display: inherit;"
	history_.style = "display: none;"
}

function load_history() {
	menu = document.getElementById("menu_div")
	action = document.getElementById("action_div")
	history_ = document.getElementById("history_div")
	menu.style = "display: none;"
	action.style = "display: none;"
	history_.style = "display: inherit;"
	console.log(history.style)
	load_data()
}

function load_menu() {
	menu = document.getElementById("menu_div")
	action = document.getElementById("action_div")
	history_ = document.getElementById("history_div")
	menu.style = "display: inherit;"
	action.style = "display: none;"
	history_.style = "display: none;"
}

function save() {
	save_button = document.getElementById("save")
	save_button.disabled = true
	date = new Date()
	r = localStorage.getItem("data")
	date_ = String(date.getDate())+"."+String(date.getMonth())+"."+String(date.getFullYear())
	time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
	pulse = last_result
	if (r == "null") {
		obj = {
			item1: [[date_, time, pulse]]
		};
		ser = JSON.stringify(obj)
		localStorage.setItem("data", ser)
	} else {
		obj = JSON.parse(r)
		console.log(obj)
		el = [date_, time, pulse]
		obj["item1"].push(el)
		ser = JSON.stringify(obj)
		localStorage.setItem("data", ser)
	}
}

function get() {
	obj = JSON.parse(localStorage.getItem("data"))
	return obj
}

function click_f() {
	now = new Date()
	now = now.getTime()/1000
	save_button = document.getElementById("save")
	new_click = (now-last_click>3)
	res = document.getElementById("advice")
	if (new_click) {
		save_button.disabled = true
		res.innerHTML = "Продолжайте кликать"
		last_click = now
		start_time = now
		count = 0
	} else if (now-start_time>10) {
		res.innerHTML = "Готово"
		save_button.disabled = false
	} else {
		count++
		last_click = now
		result = parseInt(count/(now-start_time)*60)
		res = document.getElementById("result")
		res.innerHTML = result
		last_result = result
	}
}

function load_data() {
	table = document.getElementById("table")
	try {
		all = get()
		console.log("obj: ", all)
		table.innerHTML = table.innerHTML + "obj: "+all
		console.log("array in obj",all["item1"])
		all = all["item1"]
	} catch(e) {
		console.log(e)
		table.innerHTML = e
		//no saved data
		table.innerHTML = table.innerHTML+"Нет данных"+localStorage.getItem("data")

		return
	}
	
	table.innerHTML = table.innerHTML + "<div class='cell block'>Дата</div><div class=cell>Время</div><div class=cell>Пульс</div>"
	for (var i = all.length - 1; i >= 0; i--) {
		t = all[i]
		block = "<div class=row><div class='cell block'>"+ t[0] +"</div><div class=cell>"+ t[1] +"</div><div class=cell>"+ t[2] +"</div></div>"
		table.innerHTML = table.innerHTML + block
	}
}
