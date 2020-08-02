var count = 0;
	start_time = 0;
	last_click = 0;
	last_result = 0;

function save() {
	save_button = document.getElementById("save")
	save_button.disabled = true
	date = new Date()
	r = localStorage.getItem("data")
	date_ = String(date.getDate())+"."+String(date.getMonth())+"."+String(date.getFullYear())
	time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
	pulse = last_result
	if ((r == "null")||(r==null)) {
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
	obj = JSON.parse(localStorage.getItem("data"))["item1"]
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
	} catch(e) {
		console.log(e)
		//no saved data
		//write
		table.innerHTML = "Нет данных"

		return
	}
	
	table.innerHTML = "<div class='cell block'>Дата</div><div class=cell>Время</div><div class=cell>Пульс</div>"
	for (var i = all.length - 1; i >= 0; i--) {
		t = all[i]
		block = "<div class=row><div class='cell block'>"+ t[0] +"</div><div class=cell>"+ t[1] +"</div><div class=cell>"+ t[2] +"</div></div>"
		table.innerHTML = table.innerHTML + block
	}
}
