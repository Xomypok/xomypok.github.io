var prev = 0
clicked = true
function add_digit(n) {
	if (clicked==true) {
		field = document.getElementById("enter")
		field.value = ""
		clicked=false
	}
	field = document.getElementById("enter")
	field.value = field.value + n
}

function calc() {
	field = document.getElementById("enter")
	result = document.getElementById("result")
	prev = result.value
	result.value = eval(field.value)
	clicked = true
}

function backspace() {
	field = document.getElementById("result")
	field.value = ""
	result = document.getElementById("enter")
	result.value = "0"
}

function showprev() {
	console.log(prev)
	field = document.getElementById("enter")
	field.value = prev
}