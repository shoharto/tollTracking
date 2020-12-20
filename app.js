var distance = require('google-distance-matrix');

var order_start_point = '5.422650207598139, 100.3370135522151';   //Lebuh Farquhar 25-B, Georgetown, 10200 Penang
var order_end_point = '5.375367708520319, 100.4035266698699';     //Jalan Baru, Perai,
var toll_point = '5.353863,100.352554';  // Penang bridge

var orderToToll = [order_start_point,toll_point];
var tollToOrder = [ toll_point,order_end_point];

distance.key('google-distance-matrix-API-KEY');
distance.units('imperial');

distance.matrix(orderToToll, tollToOrder, function (err, distances) {
  if (err) {
    return console.log(err);
  }
  if(!distances) {
    return console.log('no distances');
  }
  if (distances.status == 'OK') {
    // for (var i=0; i < orderToToll.length; i++) {
    //     for (var j = 0; j < tollToOrder.length; j++) {
    //         var origin = distances.origin_addresses[i];
    //         var destination = distances.destination_addresses[j];
    //         if (distances.rows[0].elements[j].status == 'OK') {
    //             var distance = distances.rows[i].elements[j].distance.text;
    //             console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
    //         } else {
    //             console.log(destination + ' is not reachable by land from ' + origin);
    //         }
    //
    //
    //
    //
    //
    //     }
    // }
    console.log('Order to Toll Distance = '+ distances.rows[0].elements[0].distance.text);
    console.log('order_start_point To order_end_point distance = '+distances.rows[0].elements[1].distance.text);
    console.log(distances.rows[1].elements[0].distance.text);
    console.log('Toll to Order Distance = '+distances.rows[1].elements[1].distance.text);
    console.log("********");
    var orderToToll = distances.rows[0].elements[0].distance.value;
    var tollToOrder = distances.rows[1].elements[1].distance.value;
    // var tollLack = distances.rows[1].elements[0].distance.value;
    // console.log(tollLack);
    var totalTollDistance = orderToToll + tollToOrder + 1;


    // console.log(totalTollDistance);

    console.log("********");

    var orderToOrder = distances.rows[0].elements[1].distance.value;
    // console.log(orderToOrder);

    if (totalTollDistance===orderToOrder){
      console.log("Order Will Pass by toll")
    }else {
      console.log("Order Won't Pass by toll")
    }
  }
});
