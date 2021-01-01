var userId = "";
var toId  = "";

$('#ME11').on('click', ()=>{
    userId = "11in23";
    toId = "12in23";
});

$('#ME12').on('click', ()=>{
    userId = "12in23";
    toId = "11in23";
});

$(document).ready( ()=> {


    var rootRef = firebase.database().ref().child("users").child("11in23").child("Messages");
    rootRef.on('value', Messages11in23 => {

        // console.clear();
        
        let totMes = (Object.keys(Messages11in23.val())).toString().split(',');

        $('#chatContainer').empty();

        for(let totMesIter=0; totMesIter< totMes.length; totMesIter++){
            let print = (totMes[totMesIter]);
        
            rootRef.child(print).on('value', snap => {
        
                let queryMessage = snap.val();
                let AbsDate = queryMessage.Date;
                let Absto = queryMessage.to;
                let Absfrom = queryMessage.from;
                let Absmes = queryMessage.message;
                let Absday = queryMessage.day;
                let Absyear = queryMessage.year;
                let Abstime = queryMessage.time;
                let Absmonth = queryMessage.month;


                if(Absfrom == userId){
                    $('#chatContainer').append(GreenUserContent("ME",Absmes,Absyear,Absmonth,AbsDate,Abstime));
                }else {
                    $('#chatContainer').append(WhiteUserContent("Darling",Absmes,Absyear,Absmonth,AbsDate,Abstime));
                }

                $('#chatContainer').animate({scrollTop : 100000000}, 1000);

            });           

        } 

    });
});




function WhiteUserContent ( localuser , localmessage , Absyear, Absmonth , Absdate, Abstime) {
    let date = Absyear + " " + Absmonth + " " + Absdate + " " + Abstime;
    let html = '<div class="whiteMessage"> <div class="userandtimestamp"><h3 class="userNameAppend"> ' + localuser + ' </h3> <h4 class="dateTimeAppend"> ' + date + ' </h4> </div><p class="message"> ' + localmessage + ' </p></div>';
    return html;
}

function GreenUserContent( localuser , localmessage , Absyear, Absmonth , Absdate, Abstime) {
    let date = Absyear + " " + Absmonth + " " + Absdate + " " + Abstime;
    let html = '<div class="greenMessage"> <div class="userandtimestamp"><h3 class="userNameAppend"> ' + localuser + ' </h3> <h4 class="dateTimeAppend"> ' + date + ' </h4> </div><p class="message"> ' + localmessage + ' </p></div>';   
    return html;
}

$('#RemoveMessages').on('click', ()=> {

    firebase.database().ref('users').child('11in23').child("Messages").remove();
    firebase.database().ref('users').child('12in23').child("Messages").remove();
    
    let UniqueMessageId = "0";
    firebase.database().ref('users/11in23/Messages/' + UniqueMessageId + "/").set({
        from : "Admin",
        to : "Admin to 23-user's",
        message : "This is 23 web chat app for couples enjoy the chat application",
        Date : "6",
        month : "sep",
        day  : "Fri",
        year : "2019",
        time : "8:30-PM"

    });

    firebase.database().ref('users/12in23/Messages/'+UniqueMessageId+"/").set({
        from : "Admin",
        to : "Admin to 23-user's",
        message : "This is 23 web chat app for couples enjoy the chat application",
        Date : "6",
        month : "sep",
        day  : "Fri",
        year : "2019",
        time : "8:30-PM"
    });


});