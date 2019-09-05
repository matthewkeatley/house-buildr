var data = [];
var validation = {
	age: function(age) { return !isNaN(parseFloat(age)) && isFinite(age) && age > 0; },
	rel: function(rel) { return rel !== ''; }
}

var form = document.forms[0];
var debug = document.getElementsByClassName('debug')[0];

// add element to display added member on page
var fragment = document.createDocumentFragment();
var ul = document.createElement('ul');
fragment.appendChild(ul);
document.body.appendChild(fragment);

form.getElementsByClassName('add')[0].onclick = function($event) {
	$event.preventDefault();
	var obj = {
		age: form.elements.age.value,
		rel: form.elements.rel.value,
		smoker: form.elements.smoker.checked
	};
	for(prop in validation) if(!validation[prop](obj[prop])) return false;
	data.push(obj);

	var li = document.createElement('li');
	li.innerText = JSON.stringify(obj);
	var a = document.createElement('a');
	a.href = "javascript:;";
	a.innerText = 'remove';
	a.style.marginLeft = '10px';
	var index = data.length - 1;

	a.onclick = function remove() {
		ul.removeChild(li);
		delete data[index];
		console.log(data);
	}

	li.appendChild(a);
	ul.appendChild(li);
	form.reset();
};

form.onsubmit = function($event) {
	$event.preventDefault();
	var d = [];
	for(var i = 0; i < data.length; i++ ) {
		if(data[i]) d.push(data[i]);
	}
	debug.innerText = JSON.stringify(d);
	debug.style.display = 'inline-block';
}