const validators = {
	require(str) {
		return str;
	},
	email(str) {
		let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return str.match(pattern);
	},
	password(str) {
		return str.length >= 6;
	}, 
	number(str) {
        return Number.isInteger(Number(str)) && Number(str) > 0
    }
};

function allPassed(validateResults) {
	for (let result of validateResults) {
		if (result==false) {
			return false;
		}
		return true;
	}
}

// chức năng rút gọn bài khi nhấn vào tiêu đề 
function workShorten(x) {
    let w = x.parentNode;
    let short = w.children[1]
    let short2 = w.children[2]
    let short3 = w.children[4]
    let short4 = w.children[5]
    let short5 = w.children[6]
    let icon = w.children[0].children[1]

    if (short.style.display == 'none') {
        block(short)
        block(short2)
        block(short3)
        block(short4)
        block(short5)
        icon.className = "shorten-icon"
    } else {
        none(short)
        none(short2)
        none(short3)
        none(short4)
        none(short5)
        icon.className = ""
    }
}

function asShorten(x) {
    let w = x.parentNode 
    for (let i=1; i<w.children.length; i++) {
        if (w.children[i].style.display == 'none') {block(w.children[i])}
        else {none(w.children[i])}
    }
}

function showNav() {
    let nav = document.getElementById('nav-responsive')
    if (nav.style.display == 'block') {
        nav.style.display = 'none'
    } else {nav.style.display = 'block'}
}

function hideNav() {
    let nav = document.getElementById('nav-responsive')
    nav.style.display = 'none'
}

function none(x) {
    x.style.display = 'none'
}
function block(x) {
    x.style.display = 'block'
}
function grid(x) {
    x.style.display = 'grid'
}

function buttonAddRateHandler(x, idError) {
    let w = x.parentNode.parentNode.parentNode
    grid(w.children[1])
    none(w.children[0])

    views.setText(idError, '')
}

function buttonDoneRateHandler(x) {
    let w = x.parentNode.parentNode.parentNode
    grid(w.children[0])
    none(w.children[1])
}
