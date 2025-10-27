$(document).ready(function(){
  console.log("jQuery is ready!");
  //Task 1-2
$("#searchInput").css({
  width: "300px",
  display: "block",
  margin: "0 auto 15px auto",
  background: "#111",
  color: "#fff",
  border: "2px solid #6a0297",
  borderRadius: "8px",
  padding: "8px 12px",
  textAlign: "center",
  transition: "0.3s"
});


$("#searchInput").hover(
  function() { $(this).css("box-shadow","0 0 8px #bb86fc"); },
  function() { $(this).css("box-shadow","none"); }
);
$("#searchInput").on("focus",function(){
  $(this).css("border-color","#bb86fc");
}).on("blur",function(){
  $(this).css("border-color","#6a0297");
});


$("#suggestBox").css({
  width: "300px",
  margin: "0 auto",
  background: "#1a1a1a",
  border: "2px solid #6a0297",
  borderRadius: "8px",
  color: "#ccc",
  display: "none",
  position: "relative",
  zIndex: "10",
  textAlign: "left"
});


$(".show-card").css({
  height: "420px",
  border: "2px solid #6a0297",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#111",
  transition: "0.3s"
});

$(".show-card img").css({
  width: "100%",
  height: "250px",
  objectFit: "cover"
});


$(".show-card").hover(
  function(){
    $(this).css({
      transform: "translateY(-5px)",
      boxShadow: "0 0 12px #6a0297"
    });
  },
  function(){
    $(this).css({
      transform: "translateY(0)",
      boxShadow: "none"
    });
  }
);

const shows = [
  "Stranger Things",
  "Breaking Bad",
  "Game of Thrones",
  "Doctor House",
  "The Witcher",
  "Friends",
  "Peacemaker",
  "Forever"
];

$("#searchInput").on("keyup", function() {
  const val = $(this).val().toLowerCase();
  const box = $("#suggestBox");
  box.empty().hide();

  if (val.length > 0) {
    const matched = shows.filter(s => s.toLowerCase().includes(val));
    matched.forEach(s => box.append(`<div class='suggest-item'>${s}</div>`));
    if (matched.length > 0) box.slideDown(150);
  }

  $(".show-card").each(function() {
    const text = $(this).find("h3").text().toLowerCase();
    $(this).toggle(text.indexOf(val) > -1);
  });
});


$(document).on("click", ".suggest-item", function() {
  const chosen = $(this).text();
  $("#searchInput").val(chosen);
  $("#suggestBox").slideUp(150);
  $(".show-card").each(function() {
    const title = $(this).find("h3").text();
    $(this).toggle(title === chosen);
  });
});

$(document).on("click", function(e) {
  if (!$(e.target).closest("#searchInput, #suggestBox").length) {
    $("#suggestBox").slideUp(150);
  }
});

//Task 3
$("#highlightWidget").css({
  position: "fixed",
  bottom: "30px",
  right: "30px",
  zIndex: 99999
});

$("#highlightToggle").css({
  width: "65px",
  height: "65px",
  borderRadius: "50%",
  background: "#6a0297",
  color: "#fff",
  border: "none",
  fontSize: "26px",
  cursor: "pointer",
  boxShadow: "0 0 15px rgba(187,134,252,0.7)",
  transition: "all 0.3s ease"
}).hover(
  function(){ $(this).css({ background:"#9d4edd", transform:"scale(1.1)" }); },
  function(){ $(this).css({ background:"#6a0297", transform:"scale(1.0)" }); }
);

$("#highlightBox").css({
  display: "none",
  flexDirection: "row",
  alignItems: "center",
  background: "#111",
  border: "2px solid #6a0297",
  borderRadius: "8px",
  padding: "8px",
  position: "absolute",
  bottom: "80px",
  right: "0",
  boxShadow: "0 0 10px rgba(187,134,252,0.7)"
});

$("#highlightInput").css({
  background: "#1a1a1a",
  color: "#fff",
  border: "1px solid #6a0297",
  borderRadius: "5px",
  padding: "5px 8px",
  width: "160px"
});

$("#highlightToggle").on("click", function(){
  $("#highlightBox").fadeToggle(200);
});

$("#highlightInput").on("keypress", function(e){
  if(e.which === 13){
    const term = $(this).val().trim();
    if(!term) return;
    $("mark").each(function(){
      const parent = $(this).parent();
      $(this).replaceWith($(this).text());
      parent.html(parent.html());
    });
    $("body *:not(script):not(style)").each(function(){
      const node = $(this);
      if(node.children().length === 0){
        const text = node.text();
        const regex = new RegExp(`(${term})`, "gi");
        const newHTML = text.replace(regex, "<mark style='background:#FFD700;color:#000;padding:2px 4px;border-radius:3px;'>$1</mark>");
        node.html(newHTML);
      }
    });
  }
});
//Task 4 
$("body").append("<div id='scrollProgress'></div>");

$("#scrollProgress").css({
  position: "fixed",
  bottom: 0,
  left: 0,
  height: "4px",
  width: "0%",
  background: "linear-gradient(90deg, #6a0297, #bb86fc, #9d4edd)",
  boxShadow: "0 -2px 8px rgba(187,134,252,0.6)",
  zIndex: 99999,
  transition: "width 0.15s ease-out"
});

$(window).on("scroll", function(){
  const scrollTop = $(this).scrollTop();
  const docHeight = $(document).height() - $(window).height();
  const scrolled = (scrollTop / docHeight) * 100;
  $("#scrollProgress").css("width", scrolled + "%");
});
//Task 5 
function animateCounters(){
  $(".counter").each(function(){
    const $this=$(this);
    const target=parseInt($this.attr("data-count"));
    if($this.data("animated")) return;
    const elementTop=$this.offset().top;
    const viewportBottom=$(window).scrollTop()+$(window).height();
    if(elementTop<viewportBottom-50){
      $this.data("animated",true);
      $({countNum:0}).animate({countNum:target},{
        duration:2000,
        easing:"swing",
        step:function(){
          $this.text(Math.floor(this.countNum));
        },
        complete:function(){
          $this.text(this.countNum+"+");
        }
      });
    }
  });
}
$(window).on("scroll",animateCounters);
animateCounters();

//Task 6 
$("#submitPopup").on("click", function(e){
  e.preventDefault();
  const btn = $(this);
  const originalText = btn.text();

  if ($(".spinner").length === 0) {
    $("<style>")
      .text(`
        .spinner {
          display:inline-block;
          width:14px;
          height:14px;
          border:2px solid #fff;
          border-top:2px solid transparent;
          border-radius:50%;
          animation:spin 0.8s linear infinite;
          margin-right:8px;
          vertical-align:middle;
        }
        @keyframes spin {
          0%{transform:rotate(0deg);}
          100%{transform:rotate(360deg);}
        }
      `)
      .appendTo("head");
  }

  btn.prop("disabled", true)
     .html("<span class='spinner'></span> Please wait...")
     .css({
       opacity:"0.7",
       cursor:"not-allowed",
       background:"#9d4edd"
     });

  setTimeout(function(){
    btn.prop("disabled", false)
       .text(originalText)
       .css({
         opacity:"1",
         cursor:"pointer",
         background:"#6a0297"
       });
    showToast("Subscription successful!");

    $("#popup").fadeOut(300); 
  }, 3000);
});

//Task 7
function showToast(message) {
  if ($("#toast").length === 0) {
    $("<style>")
      .text(`
        #toast {
          position: fixed;
          top: 30px;
          right: 30px;
          background: #6a0297;
          color: #fff;
          padding: 12px 20px;
          border-radius: 6px;
          box-shadow: 0 0 15px rgba(187,134,252,0.7);
          font-weight: 500;
          display: none;
          z-index: 999999;
        }
      `)
      .appendTo("head");
    $("body").append("<div id='toast'></div>");
  }
  $("#toast").text(message).fadeIn(300).delay(2000).fadeOut(600);
}
// Task 8 
if(!$("#copyToast").length){
$("<style>").text(`
#copyToast{
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:#6a0297;
color:#fff;
padding:12px 22px;
border-radius:6px;
box-shadow:0 0 15px rgba(187,134,252,.7);
font-weight:500;
display:none;
z-index:999999;
}
`).appendTo("head");
$("body").append("<div id='copyToast'>Copied successfully!</div>");
}
$(document).on("copy",function(){
$("#copyToast").stop(true,true).fadeIn(300).delay(1500).fadeOut(500);
});
// Task 9 
function lazyLoadImages(){
  $("img[data-src]").each(function(){
    const img=$(this);
    const top=img.offset().top;
    const bottom=top+img.outerHeight();
    const viewTop=$(window).scrollTop();
    const viewBottom=viewTop+$(window).height();
    if(bottom>viewTop-200&&top<viewBottom+200){
      const src=img.attr("data-src");
      if(src&&!img.attr("src")){
        img.attr("src",src).hide().fadeIn(600);
        img.removeAttr("data-src");
      }
    }
  });
}
$(window).on("scroll",lazyLoadImages);
lazyLoadImages();


});

