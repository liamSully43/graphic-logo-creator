$colour = Math.floor(Math.random()*16777215).toString(16);
$(".colour-picker").val("#" + $colour);

$(".print").click(function() {
	window.print();
})

$(".colour-picker").change(function() {
	$(".square-example, .circle-example").css("background-color", $(this).val());
	$(".square-border-example, .circle-border-example").css("border-color", $(this).val());
	$(".triangle-example").css("border-top-color", $(this).val());
	$x = parseInt($(".selected").attr("id"));
	if($(".selected > div > div").hasClass("circle-border") || $(".selected > div > div").hasClass("square-border")) {
		$(".selected > div > div").css("border-color", $(this).val());
		$(`.${$x}`).css("border-color", $(this).val());
	}
	else if ($(".selected > div > div").hasClass("triangle")) {
		$(".selected > div > div").css("border-top-color", $(this).val());
		$(`.${$x}`).css("border-top-color", $(this).val());
	}
	else {
		$(".selected > div > div").css("background-color", $(this).val());
		$(`.${$x}`).css("background-color", $(this).val());
	}
})

$x = null;
$y =null;

$(".shapes").click(function() {
	selectShape($(this));
})

function selectShape (element) {
	if($(element).hasClass("selected") == false) {
		$x = (typeof $(element).attr("id") !== "undefined") ? $(element).attr("id") : $(element).attr("class");
		$v = $x.split(" ");
		if($v.length > 1) {
			$x = $v[1];
		}
		$y = parseInt($x);
		$z = parseInt($(".selected").attr("id"));
		$(`#${$z}`).removeClass("selected");
		$(`#${$y}`).addClass("selected");
	}
	if($(`.${$y}`).hasClass("circle-border") || $(`.${$y}`).hasClass("square-border")) {
		$(".border").prop("disabled", false);
	}
	else {
		$(".border").prop("disabled", true);
	}
	if($(element).hasClass("background")) {
		$(".height, .width, .angle, .alignment").prop("disabled", true);
	}
	else {
		$(".height, .width, .angle, .alignment").prop("disabled", false);
	}
	$matrix = $(`.${$y}`).css("-webkit-transform") || $(`.${$y}`).css("-moz-transform") || $(`.${$y}`).css("-ms-transform") || $(`.${$y}`).css("-o-transform") || $(`.${$y}`).css("transform");
	if($(".selected").hasClass("background")) {
		$matrix = 'none';
	}
	if($matrix !== 'none') {
		$values = $matrix.split('(')[1].split(')')[0].split(',');
		$a = $values[0];
		$b = $values[1];
		$angle = Math.round(Math.atan2($b, $a) * (180/Math.PI));
	} 
	else {
		$angle = 0;
	}
	$result = ($angle < 0) ? $angle + 360 : $angle;
	$(".height").val(parseInt($(`.${$y}`).css("height")));
	$(".width").val(parseInt($(`.${$y}`).css("width")));
	$(".angle").val($result);
	$(".alignment").val(parseInt($(`.${$y}`).css("z-index")));
	$(".border").val(parseInt($(`.${$y}`).css("border-top-width")));
	if($(`.${$y}`).hasClass("triangle")) {
		$(".border").val(0);
	}
}

$(".square-example, .circle-example, .triangle-example, .square-border-example, .circle-border-example").click(function() {
	switch(true){
		case $(this).hasClass("square-example"):
		new NewShape("square")
		break;
		case $(this).hasClass("circle-example"):
		new NewShape("circle")
		break;
		case $(this).hasClass("triangle-example"):
		new NewShape("triangle")
		break;
		case $(this).hasClass("square-border-example"):
		new NewShape("square-border");
		break;
		case $(this).hasClass("circle-border-example"):
		new NewShape("circle-border");
		break;
	}
	// new NewShape()
})

$numOfShapes = 1;
$shapeNum = 0;
$numOfSquares = 1;
$numOfCircles = 1;
$numOfTriangles = 1;
$numOfSquareBorders = 1;
$numOfCircleBorders = 1;
$attr = null;

class NewShape {
	constructor(shape) {
		$(".canvas").append(`<div class="${shape} ${$numOfShapes}"></div>`);
		$(`.${$numOfShapes}`).click(function() {
			selectShape($(this)); // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		})
		$(`.${$numOfShapes}`).draggable();
		$(`.${$numOfShapes}`).css("position", "absolute");
		$(`.${$numOfShapes}`).css("cursor", "move");
		switch(shape){
			case "square":
			$shapeNum = $numOfSquares;
			$numOfSquares++;
			break;
			case "circle":
			$shapeNum = $numOfCircles;
			$numOfCircles++;
			break;
			case "square-border":
			$shapeNum = $numOfSquareBorders;
			$numOfSquareBorders++;
			break;
			case "circle-border":
			$shapeNum = $numOfCircleBorders;
			$numOfCircleBorders++;
			break;
		}
		if(shape == "square" || shape == "circle") {
			$(`.${$numOfShapes}`).css("background-color", $(".colour-picker").val());
			$attr = "background-color";
		}
		else if(shape == "triangle") {
			$(`.${$numOfShapes}`).css("border-top-color", $(".colour-picker").val());
			$(`.${$numOfShapes}`).css("width", 0);
			$(`.${$numOfShapes}`).css("height", 0);
			$attr = "border-top-color";
			$shapeNum = $numOfTriangles;
			$numOfTriangles++;
		}
		else {
			$(`.${$numOfShapes}`).css("border-color", $(".colour-picker").val());
			$attr = "border-color";
		}
		
		$(".used-shapes").append(`
		<div class="col-lg-12 row shapes" id="${$numOfShapes}">
			<div class="col-lg-3 col-md-3 col-sm-2">
				<div class="${shape}"></div>
			</div>
			<input class="col-lg-5 col-md-5 col-sm-6" type="text" value="${shape} ${$shapeNum}" />
			<i class="fas fa-eye col-lg-2 col-md-2 col-sm-2 fa-2x"></i>
			<i class="fas fa-trash-alt col-lg-2 col-md-2 col-sm-2 fa-2x"></i>
		</div>`);
		$(`#${$numOfShapes} > div > div`).css($attr, $(".colour-picker").val());
		$(`#${$numOfShapes} > .fa-eye`).click(function() {
			if($(this).parent("div").hasClass("background") == false) {
				$x = parseInt($(this).parent("div").attr("id"));
				$(`.${$x}`).toggleClass("hidden");
				$(this).toggleClass("disabled");
			}
		})
		$(`#${$numOfShapes} > .fa-trash-alt`).click(function() {
			if($(this).parent("div").hasClass("background") == false) {
				$y = parseInt($(this).parent("div").attr("id"));
				$(`.${$y}`).remove();
				$(`#${$y}`).remove();
			}
		})
		
		$(".shapes").click(function () {
			selectShape($(this));
		});
		
		$numOfShapes++;
	}
}

$(window).click(function() {
	resize($(".selected").attr("id"), $(".height").val(), $(".width").val(), $(".angle").val(), $(".alignment").val(), $(".border").val());
})

$(".height, .width, .angle, .alignment, .border, .shapes-container, .colour-picker-row, .used-shapes").click(function(event){
	event.stopPropagation();
})
$(".height, .width, .angle, .alignment, .border, .shapes-container, .colour-picker-row, .used-shapes").keypress(function(event){
	if(event.charCode == 13){
		resize($(".selected").attr("id"), $(".height").val(), $(".width").val(), $(".angle").val(), $(".alignment").val(), $(".border").val());
	}
})

function resize(element, height, width, angle, zIndex, border) {
	$id = parseInt(element);
	$h = parseInt(height);
	$w = parseInt(width);
	$a = parseInt(angle);
	$z = (zIndex <= 0) ? 1 : zIndex;
	$(".alignment").val($z);
	$b = parseInt(border);
	if($(".selected").hasClass("background") == false) {
		$(`.${$id}`).css("z-index", $z);
		if($(".selected > div > div").hasClass("triangle") == false) {
			$(`.${$id}`).css("width", $w);
			$(`.${$id}`).css("height", $h);
		}
		else {
			$w /= 2;
			$(`.${$id}`).css("border-left-width", $w);
			$(`.${$id}`).css("border-right-width", $w);
			$(`.${$id}`).css("border-top-width", $h);
		}
		$(`.${$id}`).css({"transform" : `rotate(${$a}deg)`});
		if($(".selected > div > div").hasClass("square-border") == true || $(".selected > div > div").hasClass("circle-border") == true) {
			$(`.${$id}`).css("border-width", `${$b}px`);
		}
	}
}