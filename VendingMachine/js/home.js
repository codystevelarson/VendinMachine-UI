var total = 0.00;
var change = 0.00;

$(document).ready(function () {
    loadSnacks();


    //Money buttons update total $$$$$
    $("#add-dollar-button").click(function () {
        total += 1.00;
        $("#total-box").val(Number(total).toLocaleString('en'));
    });
    $("#add-quarter-button").click(function () {
        total += 0.25;
        $("#total-box").val(Number(total).toLocaleString('en'));
    });
    $("#add-dime-button").click(function () {
        total += 0.10;
        $("#total-box").val(Number(total).toLocaleString('en'));
    });
    $("#add-nickle-button").click(function () {
        total += 0.05;
        $("#total-box").val(Number(total).toLocaleString('en'));
    });

    //Make Purchase
    $("#purchase-button").click(function () {
        var itemNumber = Number($("#item-box").val());
        purchaseSnack(total, itemNumber);
        $("#item-box").val('');

    });

    //Change Return
    $("#change-button").click(function () {
        Change = 0.00;
        $("#message-box").val('').attr({ class: "form-control" });
        total *= 100;
        var quarters = getQuarters(total);
        var dimes = getDimes(total);
        var nickels = getNickels(total);
        var pennies = getPennies(total);
        $("#change-box").val("Quarters: " + quarters + " Dimes: " + dimes + " Nickles: " + nickels + " Pennies: " + pennies);
        total = 0;
        $("#total-box").val('');
    });


    //Can't seem to get the item buttons to do anything no matter what I try :(
    $("#item-display").on('click', '.item-Button', function () {
        $("#item-box").val(this.id);
    })

});



function loadSnacks() {
    var itemDisplay = $("#item-display");
    itemDisplay.empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (itemArray) {
            $.each(itemArray, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var itemButton = '<div class="col-md-4 row" style="padding:20px"><button type="button" id="' + id + '" class="btn card item-Button">';
                itemButton += '<p class="itemNumber">' + id + '</p>';
                itemButton += '<p class="itemName col-md-12">' + name + '</p>';
                itemButton += '<p class="itemPrice col-md-12">$' + price + '</p>';
                itemButton += '<p class="itemQuantity col-md-12">Quantity Left:' + quantity + '</p>';
                itemButton += '</button></div>';

                itemDisplay.append(itemButton);
            });
        },
        error: function (data, status) {
            $("#errorMessages")
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later'));
            console.log(data);
            console.log(status);
        }
    });
}

function purchaseSnack(money, id) {
    $("#errorMessages").empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + money + "/item/" + id,
        success: function (data, status) {
            change += data.quarters * .25;
            change += data.dimes * .1;
            change += data.nickels * .05;
            change += data.pennies * .01;
            $("#total-box").val('');
            $("#change-box").val("Quarters: " + data.quarters + " Dimes: " + data.dimes + " Nickles: " + data.nickels + " Pennies: " + data.pennies);
            $("#message-box").attr({ class: "form-control is-valid" }).val("Thank You!!!");
            total = 0.00;
            loadSnacks();
        },
        error: function (data, status) {
            $("#message-box").val(data.responseJSON.message).attr({ class: "form-control is-invalid" });
            console.log(data);
        }

    })
}

function getQuarters(total) {
    return Math.floor(total / 25);
}

function getDimes(total) {
    return Math.floor((total - getQuarters(total) * 25) / 10);
}

function getNickels(total) {
    return Math.floor((total - (getQuarters(total) * 25) - (getDimes(total) * 10)) / 5);
}

function getPennies(total) {
    return Math.floor(total - (getQuarters(total) * 25) - (getDimes(total) * 10) - (getNickels(total) * 5));
}




//rectangle
var draw1 = SVG('svg1').size(1000, 400);
var rectangle = draw1.rect(225, 200).attr({
    'fill': '#42bff4',
    'fill-opacity': ".6",
    'stroke': '#ff2696',
    'stroke-width': '10px',
});

rectangle.x(500).y(25);
rectangle.radius(20, 60);

//line
var draw2 = SVG('svg2').size(2000,500)
var lines = draw2.line([[40,40],[300,400]]).stroke({width: 20, color: '#ff7926'})

lines.x(10).y(10);


//polylines

var draw3 = SVG('svg3').size(500,500);
var poly = draw3.polyline([[10,30],[250,350], [400,60]]).stroke({width: 15, color: '#fc3566'}).fill('none');