/*
======================================
[ Scroll Fix project__info ]
======================================
*/
jQuery(document).ready(function($){

  var Top=$(".project__info");
  var TopFix=$(".project__info__fixed");
  
  if(Top.length){
    kenit_fixed();
  }

  function kenit_fixed(){
    var offset=Top.offset();

    $(window).scroll(function(){
      if($(this).scrollTop()>offset.top+652){

        TopFix.addClass('active');

      }else{
        TopFix.removeClass('active');

      }
    });
  }
});

/*
======================================
[ Facebook ]
======================================
*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/*
======================================
[ Owl js ]
======================================
*/
$('.owl__banner').owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    nav:true,
    navText:[
     "<i class='fa fa-angle-left' aria-hidden='true'></i>",
     "<i class='fa fa-angle-right' aria-hidden='true'></i>"
  ],
    dots: false,
});
/*
======================================
[ Gallery ]
======================================
*/

$(document).ready(function() {

  var sync1 = $("#gallery-full");
  var sync2 = $("#gallery-thumbnail");
  var slidesPerPage = 5; 
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 3,
    slideSpeed : 2000,
    nav: true,
    autoplay: true,
    dots: false,
    loop: true,
    responsiveRefreshRate : 200,
    navText:[
     "<i class='fa fa-angle-left' aria-hidden='true'></i>",
     "<i class='fa fa-angle-right' aria-hidden='true'></i>"
    ],
    responsive:{
      0:{
          items:1,
      },
      600:{
          items:2,
      },
      1000:{
          items:2,
      },
      1400:{
          items:3,
      }
  }

  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: false,
    nav: true,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage,
    responsiveRefreshRate : 100,
    navText:[
     "<i class='fa fa-angle-left' aria-hidden='true'></i>",
     "<i class='fa fa-angle-right' aria-hidden='true'></i>"
    ],
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});
/*
======================================
[ Back to top ]
======================================
*/
jQuery(document).ready(function() {
  var offset = 220;
  var duration = 500;
  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.back-to-top').fadeIn(duration);
    } else {
      jQuery('.back-to-top').fadeOut(duration);
    }
  });
  jQuery('.back-to-top').click(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({
      scrollTop: 0
    }, duration);
    return false;
  })
});
/*
======================================
[ Menu Mobile ]
======================================
*/
function menu () {
  $('.menu-default-open').click( function () {
    $(".menu-default").toggle();
    var $this = $('.menu-default-open i');
        if ($this.hasClass('fa-times')) {
                $this.removeClass('fa-times');
                $this.addClass('fa-bars');
            } else if ($this.hasClass('fa-bars')) {
                $this.removeClass('fa-bars').addClass('fa-times');
            } else {
                $this.addClass('fa-bars');
            }
  });
  $('.menu-close').click( function () {
    $('.menu-default').css("display","none");
  });
};  
$(document).ready(menu);

$(document).ready(function($){
  $('#accordion').dcAccordion({
    eventType: 'click',
    autoClose: true,
    saveState: true,
    disableLink: true,
    speed: 'slow',
    showCount: false,
    autoExpand: true,
    classExpand  : 'dcjq-current-parent'
  });
        
});
/*
======================================
[ Load more ]
======================================
*/
jQuery(document).ready(function($) {

  if($('body').hasClass( "home" )||$('body').hasClass( "archive" )){

 
    var pageNum = parseInt(pbd_alp.startPage) + 1;
    

    var max = parseInt(pbd_alp.maxPages);
    

    var nextLink = pbd_alp.nextLink;
    
    /**
     * Replace the traditional navigation with our own,
     * but only if there is at least one page of new posts to load.
     */
    if(pageNum <= max) {
  
      $('#content')
        .append('<div class="pbd-alp-placeholder-'+ pageNum +'"></div>')
        .append('<p id="pbd-alp-load-posts" class="kenit-load-more"><a>Load More Posts</a></p>');
        

      $('.navigation').remove();
    }
    
    
    /**
     * Load new posts when the link is clicked.
     */
    $('#pbd-alp-load-posts a').click(function() {
    
   
      if(pageNum <= max) {
      
     
        $(this).text('Loading posts...');
        
        $('.pbd-alp-placeholder-'+ pageNum).load(nextLink + ' .post',
          function() {
          
            pageNum++;
            nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);
            

            $('#pbd-alp-load-posts')
              .before('<div class="pbd-alp-placeholder-'+ pageNum +'"></div>')
            
           
            if(pageNum <= max) {
              $('#pbd-alp-load-posts a').text('Load More Posts');
            } else {
              $('#pbd-alp-load-posts a').text('No more posts to load.');
            }
          }
        );
      } else {
        $('#pbd-alp-load-posts a').append('.');
      } 
      
      return false;
    });
  }
});

/*
======================================
[ Popup Click ]
======================================
*/

$(window).load(function(){
setTimeout(function() {
if ($.cookie('notice') == null) {
     window.setTimeout(function () {
      $('#modal-register').modal('show');
      }, 0);
     var date = new Date();
         var minutes = parseInt($('#modal-register').data("popup"));

         date.setTime(date.getTime() + (minutes * 60 * 1000));
         $.cookie('notice',"foo", { expires: date });
       }
  }, 0);
     
});

var modalVerticalCenterClass = ".modal";
function centerModals($element) {
    var $modals;
    if ($element.length) {
        $modals = $element;
    } else {
        $modals = $(modalVerticalCenterClass + ':visible');
    }
    $modals.each( function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}
$(modalVerticalCenterClass).on('show.bs.modal', function(e) {
    centerModals($(this));
});
$(window).on('resize', centerModals);

/*
======================================
[ Google map ]
======================================
*/
function CenterControl(controlDiv, map, center) {
  var control = this;
  control.center_ = center;

  var data = [{}];
  for (var i = 0; i < locations.length; i++) {
    var j = i+1;
    var btn__map__UI = document.createElement('div');
    btn__map__UI.id = 'btn__map__UI'+i;
    btn__map__UI.className = 'btn btn-success';
    btn__map__UI.title = 'Click to change the map';
    controlDiv.appendChild(btn__map__UI);

    var btn__map__Text = document.createElement('div');
    btn__map__Text.id = 'btn__map__Text'+i;
    btn__map__Text.className = '';
    btn__map__Text.innerHTML = locations[i]['button'];
    btn__map__UI.appendChild(btn__map__Text);

    data.push({"name": btn__map__UI});

    data[j]['name'].addEventListener('click', function(i) {
        return function () {
            map.setCenter(locations[i]);
            map.setZoom(15);
          };
    }(i));

  }

}

function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: locations[0]
  });
  var centerControlDiv = document.createElement('div');
  centerControlDiv.className = 'api__map--btn';
  centerControlDiv.index = 99;
  var centerControl = new CenterControl(centerControlDiv, map, locations[0]);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  var markers = locations.map(function(location, i) {
    
    marker = new google.maps.Marker({
      position: location,
      icon: mapIcon,
    });

    var contentString = '<div class="api__map--content">'+
        '<span class="firstHeading">'+locations[i]['address']+'</span>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    infowindow.open(map, marker);
    return marker;
  });

  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

/*
======================================
[ Add Class Fixed Header Scroll ]
======================================
*/
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 250) {
        $("header.header").addClass("small");
    } else {
        $("header.header").removeClass("small");
    }
});