const cl = document.getElementById("cl")
let getSegments = "";
let chop = document.querySelector('#chop')
let back = document.querySelector('#back-wheel')

function LoadVongQuay() {
    var TieuDe = $('#txtTieuDe').val();
    if (TieuDe != "")
    {
        $('#txtLoadTieuDe').html(TieuDe);
    }

    var sPhanQuay = $('#txtPhanQuay').val();//.replace("\N","\n");

    //setCookie("PhanQuay",sPhanQuay,30);

    var arrPhanQuay = sPhanQuay.split('\n');
    getSegments = [];
    var colors = ['#fc6', '#6cf', '#F56B6B', '#6cb', '#e6f', '#fa6', '#6af', '#FF1493', '#6ab', '#a6f'];

    for (var i = 0; i < arrPhanQuay.length; i++) {
        var trimmedValue = arrPhanQuay[i].trim();
        if (trimmedValue != "") {
            var colorIndex = i % colors.length;
            getSegments.push({ color: colors[colorIndex], label: trimmedValue });
        }
    }

    let rand = (m, M) => Math.random() * (M - m) + m
let tot = getSegments.length
let spinEl = document.querySelector('#spin')
let ctx = document.querySelector('#wheel').getContext('2d')
let winner = document.querySelector('#winner')
let dia = ctx.canvas.width
let rad = dia / 2
let PI = Math.PI
let TAU = 2 * PI
let arc = TAU / getSegments.length
let isSpinning = false;

let friction = 0.992 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

let getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
let ang = arc * i
ctx.save()
// COLOR
ctx.beginPath()
ctx.fillStyle = sector.color
ctx.moveTo(rad, rad)
ctx.arc(rad, rad, rad, ang, ang + arc)
ctx.lineTo(rad, rad)
ctx.fill()
// TEXT
ctx.translate(rad, rad)
ctx.rotate(ang + arc / 2)
ctx.textAlign = 'right'
ctx.fillStyle = '#fff'
if(tot <= 10){
    ctx.font = 'normal 20px sans-serif'
}
else if (tot > 10 && tot <=20){
    ctx.font = 'normal 17px sans-serif'
}
else if (tot > 20 && tot <= 30){
    ctx.font = 'normal 15px sans-serif'
}
else if (tot > 30 && tot <= 40){
    ctx.font = 'normal 14px sans-serif'
}
else if (tot > 40 && tot <= 50){
    ctx.font = 'normal 13px sans-serif'
}
ctx.fillText(sector.label, rad - 10, 5)
//
ctx.restore()
}

let spinTimeout; 
function rotate() {


    let sector = getSegments[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    // chop.style.transform = `rotate(${ang - PI / 2}rad)`;
    if (angVel === 0 && isSpinning) {
    if (!spinTimeout) {
        spinTimeout = setTimeout(() => {
        spinEl.textContent = 'Quay';
        spinEl.style.background = '#09f'; // Màu nền mặc định cho Quay
        }, 5000);
    }
    
    setTimeout(() => {
        //alert(`Kết quả: ${sector.label}`);
        // winner.textContent = sector.label;
        openTrungThuong(sector.label)
    }, 300);
    
    isSpinning = false; 
    } else {
    // spinEl.textContent = sector.label;
    spinEl.style.background = sector.color;
    if (spinTimeout) {
        clearTimeout(spinTimeout);
        spinTimeout = null;
    }
    }
    // Kiểm tra xem có đang thực thi hàm rotate() không
    // Lấy tất cả các thẻ có class là 'MyButton' và 'MyButton1'
    let buttons = document.querySelectorAll('.MyButton, .MyButton1');
    if (isSpinning) {
        // Lặp qua từng thẻ và ngăn chúng không cho phép người dùng bấm vào
        buttons.forEach(button => {
            button.classList.add('disable-click');
        });
        spinEl.classList.add('disable-click');
    }
    else{
        setTimeout(() => {
            buttons.forEach(button => {
                button.classList.remove('disable-click');
            });
            spinEl.classList.remove('disable-click');
        }, 4000);
    }

}

function openTrungThuong(KetQua) {
    //alert(KetQua);

    document.getElementById("dvTrungThuong").style.display = "block";
    document.getElementById("dvKetQuaQuay").innerHTML = "<div style='font-size: 23px;color: #4e4e4e;'>Bạn đã quay vào ô</div><div>" + KetQua + "</div>";

    //$('#dvCongrats').trigger('click');
}

function closeTrungThuong() {
    document.getElementById("dvTrungThuong").style.display = "none";
}

function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0 // Bring to stop
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
}

function engine() {
    frame()
    requestAnimationFrame(engine)
}


cl.onclick =  function clearCanvas() {
    // Dừng quá trình quay bằng cách đặt angular velocity về 0
    angVel = 0;
  
    $( "canvas" ).remove( "#wheel" );
    
    tot = 0; 
    // Tạo một canvas mới
    let newCanvas = $('<canvas id="wheel" width="390" height="390"></canvas>')[0];
    
    // Thay thế canvas cũ bằng canvas mới
    $('#wheelOfFortune').append(newCanvas);
    
    // Gọi lại hàm init và quay lại vị trí ban đầu
    ang = 0;

}
function init() {
    
    getSegments.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    
    spinEl.addEventListener('click', () => {
        if (!angVel && !isSpinning) 
        {
        angVel = rand(0.25, 0.45)
        isSpinning = true;
        }
    })
    spinEl.textContent = 'Quay';
    spinEl.style.background = '#09f';
}

init()

    ScrollToDiv('vqLeft');
    //document.cookie = "vqmm=" + sPhanQuay + "; expires=Thu, 18 Dec 2030 12:00:00 UTC";
    //alert(sPhanQuay1);
    
}
