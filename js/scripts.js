
function throttle(fn, wait) {
	var time = Date.now();
  	return function(e) {      
		if ((time + wait - Date.now()) < 0) {
			fn(e);
			time = Date.now();
		}
	}
}
function scrollDetect() {
	let scrollY = window.scrollY;
	window.addEventListener('scroll', throttle(handleScroll,10));
  
	function handleScroll(e) {  
		if(window.scrollY > scrollY) {
			document.body.setAttribute("data-scroll", "DOWN");
		} else if (window.scrollY < scrollY){
			document.body.setAttribute("data-scroll", "UP");
		}
		if (window.scrollY === 0){
			document.body.removeAttribute("data-scroll"); 
		}    
		scrollY = window.scrollY;
	}
}
scrollDetect();
