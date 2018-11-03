//MenuBuilder:
//parameter: root (defined as text to split URL on for relative links.  see: getRelativePortion)
//parameter: primaryMenu (defined as array of objects detailing primary menu items)
//parameter: subMenus (defined as array of objects detailing submenu items)
//parameter: altSubMenus (defined as array of objects detailing alt submenu items, allows for Primary Menu items added to subMenu, see )
function MenuBuilder(root, primaryMenu, subMenus, sidePrimaryMenu, altSubMenus){
	
	this.menuObj = primaryMenu;
	this.sideMenuObj = sidePrimaryMenu;
	this.subMenuObj = subMenus;
	this.sideSubMenuObj = altSubMenus;
	this.rootDir = root;
	this.outerDiv;
	
	this.getRelativePortion = function (link){
		"use strict";
		var rootDir = this.rootDir;
		try{
			if(link.indexOf("http") < 0){
				var url;
				var count;
				if(rootDir != null){
					url = window.location.href.split('?')[0].split('//')[1].split(rootDir)[1].split('/');
					count = url.length - 2;
				}else{
					url = window.location.href.split('?')[0].split('//')[1].split('/');
					count = url.length;
				}
				var s;
				var relativePortion = '';
				for(s = 0; s < count;s++){
					relativePortion += '../';
				}
				return relativePortion;
			}
			return '';
		}catch(err){
			console.log(err + " " + link);
			return "";
		}
	};
			//*********************************************************
			//***************		solidmenu		*******************
			//*********************************************************

	this.buildMenu = function(){
		try{
			//get header
			var hdr = document.getElementsByTagName('header')[0]; //first header	
			
			//outer div
			var oDiv = document.createElement('div');
			hdr.appendChild(oDiv);
			oDiv.setAttribute('class','oDiv');
			
			//tablet view button
			var btn_midMenu = document.createElement('button');
			oDiv.appendChild(btn_midMenu);
			btn_midMenu.setAttribute('id', 'btn_midMenu');
			btn_midMenu.setAttribute('class','sideviewtoggle btn_midMenu');
			btn_midMenu.setAttribute('onClick', 'menu2.toggle();');
			btn_midMenu.innerHTML = 'Menu';
			btn_midMenu.setAttribute('type','button'); //required for SharePoint
			
			//tablet view menu div (placeholder)
			var toggleMenuDiv = document.createElement('div');
			oDiv.appendChild(toggleMenuDiv);
	
			//primary menu div
			var primaryMenuDiv = document.createElement('div');
			oDiv.appendChild(primaryMenuDiv);
	
			//primary menu UL 
			var ul = document.createElement('ul');
			primaryMenuDiv.appendChild(ul);
			
			//begin use of menuObj
			for(var m = 0; m < this.menuObj.length; m++){
				var menuItem = this.menuObj[m];
				primaryMenuDiv.setAttribute('id',menuItem.id);
				primaryMenuDiv.setAttribute('class',menuItem.class);
				toggleMenuDiv.setAttribute('id',menuItem.sideId);
				toggleMenuDiv.setAttribute('class',menuItem.sideClass);
			
				if(Array.isArray(menuItem.primaryMenu)){
					var pmObj = menuItem.primaryMenu;
					var pmc = 0;
					for(pmc; pmc < pmObj.length; pmc++){
						var li = document.createElement('li');
						ul.appendChild(li);
						var a = document.createElement('a');
						li.appendChild(a);
						a.setAttribute('href', this.getRelativePortion(pmObj[pmc].href) + pmObj[pmc].href);
						a.innerHTML = pmObj[pmc].value;
						
						//determine if rel is none, set accordingly
						if(pmObj[pmc].rel !== "none"){
							a.setAttribute('rel', pmObj[pmc].rel);
						}
						//determine if i is last in array, place span accordingly
						if(pmc < pmObj.length -1){
							var span = document.createElement('span');
							li.appendChild(span);
							span.setAttribute('class', 'stx');
							span.innerHTML = ''; //'|' if stks needed
						}
					}
				}
				this.outerDiv = oDiv;
			}		
		}catch(err){
			console.log(err);	
		}

			
	};
	//
	this.buildSubMenu = function(){
		try{
			for(var m = 0; m < this.subMenuObj.length; m++){
				var subMenu = this.subMenuObj[m];
				var fmDiv = document.createElement('div');
				this.outerDiv.appendChild(fmDiv);
				fmDiv.setAttribute('id', subMenu.id);
				fmDiv.setAttribute('class', subMenu.class);
				
				var fmsDiv = document.createElement('div');
				fmDiv.appendChild(fmsDiv);
				if(subMenu.marginTop !== "NaN"){
					fmsDiv.setAttribute('style', subMenu.marginTop);
				}
				
				//submenu UL 
				var ful = document.createElement('ul');
				fmsDiv.appendChild(ful);
				ful.setAttribute('class','ulmenu');
				
				var i = 0;
				if(Array.isArray(subMenu.subMenu)){
					var menus = subMenu.subMenu;
					for(i; i < menus.length; i++){
						var li = document.createElement('li');
						ful.appendChild(li);
						
						var a = document.createElement('a');
						li.appendChild(a);
						a.setAttribute('href', this.getRelativePortion(menus[i].href) + menus[i].href);
						a.innerHTML = menus[i].value;
						
						//determine if rel is none, set accordingly
						if(menus[i].rel !== "none"){
							a.setAttribute('rel', menus[i].rel);
						}	
					}
				}
			}
		}catch(err){
			console.log(err);
		}
	};
			//*********************************************************
			//***************		sidemenu		*******************
			//*********************************************************

	this.buildSideMenu = function (){
		try{
			//get sideDiv
			var sideDiv = document.getElementById(this.menuObj[0].sideId);
			sideDiv.setAttribute('style','display:none;');
			//create outer UL
			var outerUL = document.createElement('ul');
			sideDiv.appendChild(outerUL);
			
			//attribute outerUL
			outerUL.setAttribute('class',this.menuObj[0].sideClass);
			outerUL.setAttribute('id',this.menuObj[0].sideId);
		
			//create obj
			var obj = this.sideMenuObj[0].primaryMenu;
	
			//populate UL
			var m = 0;
			for (m; m < obj.length;m++){
				
				//build IL
				var primaryIL = document.createElement('il');
				outerUL.appendChild(primaryIL);
				
				//build anchor
				var anchorLink = document.createElement('a');
				primaryIL.appendChild(anchorLink);
				
				//populate anchor
				anchorLink.innerHTML = obj[m].value;
				
				//evaluate rel
				if (obj[m].rel !== 'none'){
					anchorLink.setAttribute('href', '#');
					var subUL = this.sideMenuSub(obj[m].rel,this.sideSubMenuObj);
					primaryIL.appendChild(subUL);
				}else{
					anchorLink.setAttribute('href', this.getRelativePortion(obj[m].href) + obj[m].href);
				}
			}
		}catch(err){
			console.log(err);
		}
	};
	//	
	this.sideMenuSub = function (rel,sideSubMenus ){
		try{
			//create subUL
			var subUL = document.createElement('ul');
			
			var s = 0;
			for(s; s< sideSubMenus.length;s++){
				var sideSubMenu =sideSubMenus[s];
				//compare
				if(sideSubMenu.id === rel){
					//attribute subUL
					subUL.setAttribute('style','margin-top:' + sideSubMenu.marginTop + 'px;');
					
					//create menu obj
					var obj = sideSubMenu.subMenu;
					var sm = 0;
					for(sm; sm < obj.length; sm++){
					
						//create IL
						var il = document.createElement('il');
						subUL.appendChild(il);
						//create anchorLink
						var anchorLink = document.createElement('a');
						il.appendChild(anchorLink);
						//attribute anchorLink
						anchorLink.setAttribute('value',obj[sm].value);
						anchorLink.innerHTML = obj[sm].value;
						anchorLink.setAttribute('href',this.getRelativePortion(obj[sm].href) + obj[sm].href);
						//evaluate rel
						if (obj[sm].rel !== 'none'){
							var sub2UL = this.sideMenuSub(obj[sm].rel, sideSubMenus);
							il.appendChild(sub2UL);
						}
					}
				}
			}
			return subUL;
		}catch(err){
			console.log(err);	
		}
	};
	
	//calls MenuBuilder functions on obj creation
	this.buildMenu();
	this.buildSubMenu();
	this.buildSideMenu();

}


//*********************************************************************************
//**************   DD MENU JQUERY - REQUIRED FOR FUNCTIONALITY ********************
//*********************************************************************************
//**************   				DO NOT ALTER				   ********************
//*********************************************************************************

// JavaScript Document
/*
* Responsive Side Toggle Menu (c) Dynamic Drive (www.dynamicdrive.com)
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
* Requires: jQuery 1.7 or higher
*/

//** July 21st, 15'- Updated to v1.1,which adds multiple level ULs support inside toggle menu. Any nested UL inside menu will be auto transformed to an accordion

(function(w, $){

	var mediabreakpoint = 'screen and (max-width: 800px)' // CSS media query. Should match that found in menu.css
	var $smallscreentoggler = $('<div id="smallscreentoggler" data-state="closed">&#9776;</div>') // HTML for small screen menus toggler //&equiv;

	var defaults = {
		position: 'left',
		pushcontent: true,
		source: 'inline',
		revealamt: 0,
		downarrowsrc: '../img/toggledown.png',
		marginoffset: 0,
		dismissonclick: true,
		curstate: 'closed'
	}

	var menusarray = []

	w.sidetogglemenu = function(options){
		var s = $.extend({}, defaults, options)
		if ( !window.matchMedia ){ // if browser doesn't support media query detection via JavaScript
			s.pushcontent = false // disable revealing menu by pushing page content (as window.matchMedia is used in this case to restore BODY margins)
		}
		var thismenu = this,
				$body = $('body'),
				$menu = '',
				expandlength = ''
		menusarray.push( [this, s] )

		function buildulmenu($menu){
			var $submenus = $menu.find('ul').find('ul')
			$submenus.each(function(i){
				var $submenu = $(this).css('display', 'none')
				var $header = $submenu.parent()
				var $headerlink = $header.find('a:eq(0)')
				$headerlink.append('<img class="downarrow" src="' + s.downarrowsrc + '" />')
				$headerlink.on('click', function(e){
					$submenu.slideToggle()
					return false
				})
			})
		}

		function init(menuref){
			$menu = $(menuref).css({top: 0, visibility: 'hidden', zIndex: 1000, display: 'none'}).prependTo(document.body)//, display: 'none'
			$menu.on('click', function(e){
				if (e.target.tagName != 'A')
					e.stopPropagation()
			})
			buildulmenu($menu)
			$smallscreentoggler.prependTo(document.body)
			var delta = parseInt($menu.outerWidth()) - s.revealamt
			if ($smallscreentoggler.css('display') != 'block')
				this.toggle(s.curstate, delta)
			$menu.css((s.position == 'left')? 'left' : 'right', -delta)
			$menu.css({visibility: 'visible'})
			return delta
		}

		this.getmenu = function(){
			return $menu
		}

		this.toggle = function(action, w){
			var delta = w || expandlength
			s.curstate = action || ( (s.curstate == 'closed')? 'open' : 'closed' )
			if ($menu.css('position') != 'static'){
				var animprop = (s.position == 'left')? 'left' : 'right'
				$menu.css(animprop, (s.curstate == 'open')? 0 : -delta)
				$menu.css({display: 'block'}) //added to correct display after rotate
				$menu.css(($menu.left == '0px')? '-250px' : '0px') // added to correct left after rotate
				if (s.pushcontent === true){
					$body.css(animprop, (s.curstate == 'open')? delta + s.marginoffset : 0)
				}
			}
			else{
				$smallscreentoggler.trigger('toggle', action)
			}
		}

		if (s.pushcontent === true){
			$body.css({position: 'absolute'})
		}

		if (s.source == 'inline'){
			expandlength = init.call(this, 'div#' + s.id)
		}
		else{
			$.ajax({
				url: s.source,
				dataType: 'html',
				error:function(ajaxrequest){
					alert('Error fetching content.<br />Server Response: '+ajaxrequest.responseText)
				},
				success:function(content){
					expandlength = init.call(thismenu, content)
				}
			})
		}

		return this

	}

	jQuery(function(){ // run once in document load
		$smallscreentoggler.prependTo(document.body)
		
		$('body').on('click', function(e){ // dismiss menus onclick of BODY
			var $target = $(e.target)
			if (e.type == 'click' && !$target.hasClass('sideviewtoggle')){
				for (var i=0; i < menusarray.length; i++){
					if (menusarray[i][1].dismissonclick && menusarray[i][1].curstate == 'open')
						menusarray[i][0].toggle('closed')
				}
			}
		})

		$smallscreentoggler.on('toggle', function(e, action){ // define custom "toggle" event on smallscreentoggler
			for (var i=0; i < menusarray.length; i++){
				var $menu = menusarray[i][0].getmenu()
				$menu.css('display', ($menu.css('display') != 'block')? 'block' : 'none')
			}
		})

		$smallscreentoggler.on('click', function(e){ // trigger toggle event onclick of smallscreentoggler
			$smallscreentoggler.trigger('toggle')
			e.stopPropagation()
		})

		if (window.matchMedia){ 
			var mql = window.matchMedia( mediabreakpoint ) // CSS media queries matching
			var handlemediamatch = (function t(mql){
				if (mql.matches){ // if CSS media query condition met (ie: device width less than 480px)
					$('body').css({left:0, right:0})
				}
		    for (var i=0; i<menusarray.length; i++){
					var $menu = menusarray[i][0].getmenu()
					$menu.css('display', (mql.matches)? 'none' : 'block')
				}
					return t
			}) (mql)
			mql.addListener(function(){handlemediamatch(mql)})
		}
	})


}) (window, jQuery)



/* DD Mega Menu
* Created: June 13th, 2011 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

// July 27th, 11': Added ability to activate menu via "click" of the mouse, on top of the default "mouseover".

jQuery.noConflict()

jQuery.extend(jQuery.easing, {  //see http://gsgd.co.uk/sandbox/jquery/easing/
	easeOutBack:function(x, t, b, c, d, s){
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	}
})
//
var ddmegamenu={
	startzindex:200,
	wrapperoffset:[0,0], //10,25 additional width and height to add to outer wrapper of drop down menus to accomodate CSS drop down shadow, if any
	ismobile:navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null, //boolean check for popular mobile browsers

	init:function(setting){
		var $=jQuery
		var s=$.extend({fx:'slide', easing:'easeInOutSine', dur:'normal', hidedelay:200}, setting)
		if (s.fx=="none") //if fx is disabled, bypass animation
			s.dur=0
		var $mainmenu=$('#'+s.menuid)
		$anchors=($mainmenu.attr('rel'))? $mainmenu : $mainmenu.find('a[rel]')
		function buildmenu($anchors){
			$anchors.each(function(){ //loop through anchor links
				var $anchor=$(this)
				var $submenu=$('#'+$anchor.attr('rel').replace(/\[\w+\]/, '')) //extract "submenuid" from rel="submenuid[orientation]" to reference submenu
				var orienttoleft=/\[left\]/.test($anchor.attr('rel')) //check for rel="submenuid[left]" to indicate submenu should be left aligned
				$submenu.wrap('<div class="megawrapper" style=";position:absolute;top:0;left:0;visibility:hidden"><div style="position:absolute;left:0;top:0;width:100%;height:100%;"></div></div>')//overflow:hidden;z-index:'+ddmegamenu.startzindex+'
					.css({visibility:'inherit', top:-$submenu.outerHeight()}) //set submenu's top pos so it's out of view intially
					.data('timer', {}) //add timer data object to submenu object
				var $wrapper=$submenu.closest('div.megawrapper').css({width:$submenu.outerWidth()+ddmegamenu.wrapperoffset[0], height:$submenu.outerHeight()+ddmegamenu.wrapperoffset[1]}) //reference outermost wrapper of submenu and set its dimensions
				var $wrapperparent=$anchor.closest('div.megawrapper') //check if this anchor link is defined inside a submenu wrapper (nested menu)
				if ($wrapperparent.length>0){ //if so
					$wrapper.appendTo($wrapperparent) //move corresponding submenu wrapper to within its parent submenu wrapper
				}
				else{ //else if this submenu wrapper is topmost
					$wrapper.appendTo(document.body) //move it so it's a child of document.body
					$submenu.data('istopmenu', true) //indicate this is top level wrapper
				}
				$anchor.bind((setting.trigger=="click")? "click" : "mouseenter", function(e){ //when mouse clicks on or mouses over anchor
					clearTimeout($submenu.data('timer').hide)
					var offset=($submenu.data('istopmenu'))? $anchor.offset() : $anchor.position()
					if ($submenu.data('istopmenu')){
						$anchors.removeClass('selected')
						$anchor.addClass('selected')
					}
					$wrapper.css({visibility:'visible', left:offset.left-(orienttoleft? $wrapper.outerWidth()-$anchor.outerWidth()-ddmegamenu.wrapperoffset[0] : 0), top:offset.top+$anchor.outerHeight()})//, zIndex:++ddmegamenu.startzindex
					$submenu.stop().animate({top:0}, 0, s.easing) //animate submenu into view
					if (setting.trigger=="click" && !ddmegamenu.ismobile) //returning false in mobile browsers seem to lead to strange behavior
						return false
				})
				$anchor.mouseleave(function(){ //when mouse moves OUT anchor
					$submenu.data('timer').hide=setTimeout(function(){
						$submenu.stop().animate({top:-$submenu.outerHeight()}, 0, function(){$wrapper.css({visibility:'hidden'})}) //animate submenu out of view and hide wrapper DIV
						$anchor.removeClass('selected')
					}, s.hidedelay)
				})
				$anchor.click(function(e){
					if (ddmegamenu.ismobile) //on ipad/iphone, disable anchor link (those with a drop down menu) when clicked on (triggered by mouseover event on desktop), so menu is given a chance to appear
						return false
				})
				$wrapper.mouseenter(function(){ //when mouse moves OVER submenu wrapper
						clearTimeout($submenu.data('timer').hide)
				})
				$wrapper.bind('mouseleave click', function(e){ //when mouse moves OUT or CLICKs on submenu wrapper
					$submenu.data('timer').hide=setTimeout(function(){
						$submenu.stop().animate({top:-$submenu.outerHeight()}, (e.type=="click")? 0 : 0, function(){$wrapper.css({visibility:'hidden'})}) //animate submenu out of view and hide wrapper DIV
						$anchor.removeClass('selected')
					}, s.hidedelay)
				})
				buildmenu($submenu.find('a[rel]')) //build next level sub menus
			})
		}
		buildmenu($anchors)
	},

	docinit:function(setting){
		jQuery(function($){ //on document.ready
			ddmegamenu.init(setting)
		})
	}

}

