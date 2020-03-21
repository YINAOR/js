(function () {
	window.jQuery || document
		.write("<script src='https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'>" +
			"<" + "/script>");

	let lastTime = 0
	const vendors = ['webkit', 'moz']
	for (let xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
		window.requestAnimationFrame = window[`${vendors[xx]}RequestAnimationFrame`]
		window.cancelAnimationFrame =
			window[`${vendors[xx]}CancelAnimationFrame`] ||
			window[`${vendors[xx]}CancelRequestAnimationFrame`]
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback) {
			const currTime = new Date().getTime()
			const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
			const id = window.setTimeout(function () {
				callback(currTime + timeToCall)
			}, timeToCall)
			lastTime = currTime + timeToCall
			return id
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id)
		}
	}

	// 创建gotop元素
	const spanEl = jQuery("<span>", {
		"class": "icon icon-lg icon-chevron-up"
	})
	jQuery("<a>", {
		"id": "gotop",
		"href": "javascript:;",
		"class": "waves-effect waves-circle waves-light"
	}).append(spanEl).appendTo(".post-card");

	// gotop元素添加事件
	const d = document,
		w = window,
		body = d.body,
		$ = d.querySelector.bind(d),
		$$ = d.querySelectorAll.bind(d),
		root = $('html'),
		gotop = $('#gotop'),
		loading = $('#loading'),
		animate = w.requestAnimationFrame,
		scrollSpeed = 200 / (1000 / 60),
		forEach = Array.prototype.forEach,
		offset = function (el) {
			let x = el.offsetLeft,
				y = el.offsetTop
			if (el.offsetParent) {
				const pOfs = arguments.callee(el.offsetParent)
				x += pOfs.x
				y += pOfs.y
			}
			return {
				x: x,
				y: y
			}
		}
	let even =
		'ontouchstart' in w &&
		/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(
			navigator.userAgent
		) ?
		'touchstart' :
		'click'
	let docEl = d.documentElement
	if (w.innerWidth > 600) {
		if (
			(window.navigator.userAgent.indexOf('WOW') > -1 ||
				window.navigator.userAgent.indexOf('Edge') > -1 ||
				window.navigator.userAgent.indexOf('MSIE') > -1) &&
			window.navigator.userAgent.indexOf('Trident') === -1
		) {
			docEl = body
		}
	} else {
		if (window.navigator.userAgent.indexOf('Android') > -1) {
			if (window.navigator.userAgent.indexOf('Browser') > -1) {
				docEl = body
			}
		}
	}
	const Blog = {
		goTop: function (end) {
			const top = docEl.scrollTop
			const interval =
				arguments.length > 2 ? arguments[1] : Math.abs(top - end) / 1
			if (top && top > end) {
				docEl.scrollTop = Math.max(top - interval, 0)
				// animate(arguments.callee.bind(this, end, interval))
			} else if (end && top < end) {
				docEl.scrollTop = Math.min(top + interval, end)
				// animate(arguments.callee.bind(this, end, interval))
			}
		},
		toggleGotop: function (top) {
			if (top > w.innerHeight / 2) {
				gotop.classList.add('in')
			} else {
				gotop.classList.remove('in')
			}
		},
	}
	document.addEventListener(
		'scroll',
		function () {
			const top = docEl.scrollTop
			Blog.toggleGotop(top)
		},
		false
	)
	gotop.addEventListener(
		even,
		function () {
			animate(Blog.goTop.bind(Blog, 0))
		},
		false
	)
}())

// 导航
function navCreate(navArr = ["home","blog","music","album","letter"], autoExclude = true) {
	let bottom = 30
	if(autoExclude){
		const pathname = location.pathname.match(/\w+/)[0]
		navArr = navArr.filter(nav => nav != pathname)
	}
	navArr.forEach((nav) => {
		const spanEl = jQuery("<span>", {
			"class": "icon icon-lg icon-" + nav
		})
		jQuery("<a>", {
			"id": nav,
			"href": "javascript:;",
			"class": "waves-effect waves-circle waves-light",
			"click": function () {
				window.location = location.origin + "/" + (nav === "home" ? "" : nav)
			}
		}).append(spanEl).appendTo(".post-card");
		jQuery("#"+nav).css("bottom", bottom)
		bottom += 70
	})
}