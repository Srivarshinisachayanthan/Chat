const QUESTION = $('#QUESTION');
const ME_11 = $('#ME11');
const ME_12 = $('#ME12');

var userId="";
var toId = "";

$('.chatpage').hide();

function RegisterUser(){
    
    let uniqueId;
    if(ME_11.is(":checked")){
        uniqueId  = "11in23";
        userName = "ANGEL";
    }else{
        uniqueId  = "12in23";
        userName  = "ANGEL_HUSBAND"
    }

    firebase.database().ref("users/"+uniqueId).set({
        id : uniqueId,
        name : userName
    })

}

ME_11.on('click', ()=>{
    ChatPage('Angel');
    userId = "11in23";
    toId = "12in23";
});

ME_12.on('click', ()=>{
    ChatPage("Angel's_Husband");
    userId = "12in23";
    toId = "11in23";
});

function ChatPage(user) {
    
    $('#QUESTION').hide();
    $('.chatpage').show();
    if(user=='Angel'){
        $('#name').text("Angel'sHusband").css('font-size','15px').css('color','white');            
        $('#UserName').text("USER : Angel").css('font-size','15px').css('color','white').css('margin-bottom','20px');           
    }else{
        $('#name').text("Angle").css('font-size','15px').css('color','white');
        $('#UserName').text("USER : Angel'sHusband").css('font-size','15px').css('color','white').css('margin-bottom','20px');
    }

}

$('#sendBtn').on('click', (e) => {

    // console.log(userId,toId);
    e.preventDefault();

    let txtmessage = $('#sendTxt').val();

    $('#sendTxt, textarea').val("");
    // ("input[type=text], textarea").val(""); 

    if(txtmessage==""){

        $('#sendTxt').css('border','0.5px solid red');
    
    } else {

        $('#sendTxt').css('border','1px solid white');

        let date_time =  Date().toString().split(" ");        
        let userFromId = userId;
        let userToId = toId;
        let yearId = date_time[3];
        let dateId = date_time[2];
        let monthId = "";
        let timeId = date_time[4];

        switch(date_time[1]){
            
            case 'Jan' : monthId = "01";break;
            case 'Feb' : monthId = "02";break;
            case 'Mar' : monthId = "03";break;
            case 'Apr' : monthId = "04";break;
            case 'May' : monthId = "05";break;
            case 'Jun' : monthId = "06";break;
            case 'Jul' : monthId = "07";break;
            case 'Aug' : monthId = "08";break;
            case 'Sep' : monthId = "09";break;
            case 'Oct' : monthId = "10";break;
            case 'Nov' : monthId = "11";break;
            case 'Dec' : monthId = "12";break;

        }

        let UniqueMessageId = "" + yearId + " " + monthId + "  " + dateId + " " + timeId;
        firebase.database().ref('users/'+userId+'/Messages/' + UniqueMessageId + "/").set({
            from : userFromId,
            to : userToId,
            message : txtmessage,
            Date : date_time[2],
            month : date_time[1],
            day  : date_time[0],
            year : date_time[3],
            time : date_time[4]

        });

        firebase.database().ref('users/'+toId+'/Messages/'+UniqueMessageId+"/").set({
            to : userToId,
            from : userFromId,
            message : txtmessage,
            Date : date_time[2],
            month : date_time[1],
            day  : date_time[0],
            year : date_time[3],
            time : date_time[4]
        });

    }


});

function WhiteUserContent ( localuser , localmessage ) {
    let dateTime = Date().toString().split(" ");
    let date = dateTime[2]+"-"+dateTime[1]+"-"+dateTime[3]+" "+dateTime[0]+" "+dateTime[4];
    let html = '<div class="whiteMessage"> <div class="userandtimestamp"><h3 class="userNameAppend"> ' + localuser + ' </h3> <h4 class="dateTimeAppend"> ' + date + ' </h4> </div><p class="message"> ' + localmessage + ' </p></div>';
    return html;
}

function GreenUserContent ( localuser , localmessage ) {
    let dateTime = Date().toString().split(" ");
    let date = dateTime[2]+"-"+dateTime[1]+"-"+dateTime[3]+" "+dateTime[0]+" "+dateTime[4];
    let html = '<div class="greenMessage"> <div class="userandtimestamp"><h3 class="userNameAppend"> ' + localuser + ' </h3> <h4 class="dateTimeAppend"> ' + date + ' </h4> </div><p class="message"> ' + localmessage + ' </p></div>';   
    return html;
}

document.getElementById('sendTxt').addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
});