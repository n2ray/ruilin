/**
 * Main JS file for Ruilin
 */
$(document).ready(function()
{	

	// Mousewheel jQuery 插件页面横向滚动
	$('html, body, *').mousewheel(function(event, delta) {
		this.scrollLeft -= -(delta * 40);
		event.preventDefault();
	});
	
	// Convert post date to chinese date
	$('.post-date').each(function(){
		$(this).text(cnDate($(this).text()));
	});
	
	if(isWritingModeSupported() == false)
	{
			
		$('.header .post-excerpt, .paper').each(function(){
			$(this).shuPai();
			$(this).addClass('shu-moz');
		});
		
		function paperSize()
		{
			var headerWidth=0, logoWidth=0, menuWidth=0, paperWidth=0, outerPaperWidth=0;
			var whiteSpaces=($(window).height()<640) ? 40 : 80;
			
			
			$('.header, #pag, .paper').css('top', whiteSpaces);
			$('.footer').css('bottom', whiteSpaces);
			$('.shu-moz').find('img').each(function(){
				$(this).parent().css('height',$(this).width()+'px');
				$(this).css('top',$(this).width()+22+'px');
			});
			
			// Get logo width
			logoWidth = $('.header .blog-logo').outerWidth(true);
			
			// Get menu width
			$('.header .menu ul li').each(function(){
				$(this).find('.post-excerpt').each(function(){
					$(this)
					.width($(window).height()-whiteSpaces*2)
					.css({
						'margin-right': -$(this).width()+30+'px',
						'margin-top': '-4px'
					});
				});
				$(this).width($(this).find('.post-title').outerWidth(true)+$(this).find('.post-date').outerWidth(true)+$(this).find('.post-excerpt').outerHeight(true)+20);
				menuWidth += $(this).outerWidth(true);
			});

			// Get header's total width
			headerWidth = logoWidth+menuWidth;
			
			// Get & set paper's total width
			$('.paper').width($(window).height()-whiteSpaces*2).each(function(){
				$(this).css({
					'margin-right': -$(this).width()+30+'px'
				});
			});
			paperWidth = $('.paper').outerHeight(true);
			
			// Get footer's total width
			footerWidth = $('.footer').outerWidth(true);
			
			// Set the total outer paper width for scroll
			outerPaperWidth = (headerWidth+paperWidth+footerWidth < $(window).width()) ? $(window).width() : headerWidth+paperWidth+footerWidth+200;
			$('.outer_paper').width(outerPaperWidth).height($(window).height());
			
			// Set Table
			$('.shu-moz table').each(function(){
				var num = $(this).find('tr:first').find('th').length;
				//console.log(num);
				$(this).find('th, td').each(function(){
					$(this).width($('.paper').width()/num);
					$(this).find('img').each(function(){
						if($(this).height()>$('.paper').width())
							$(this).height($('.paper').width());
					});
				});
			});
			
		}
		

		
	}
	else
	{
		
		$('.post-excerpt, .paper').addClass('shu fr');
		
		// Set float right
		$('.paper *:not(strong, em, code, blockquote p, a[href], tbody, td, th, img)').addClass('fr');
		
		function paperSize()
		{

			var headerWidth=0, logoWidth=0, menuWidth=0, paperWidth=0, outerPaperWidth=0;
			var whiteSpaces=($(window).height()<640) ? 40 : 80;
			
			// Set contents height
			$('.header, .header *:not(li div:not(.post-excerpt)), .paper, .paper *:not(strong, em, code, blockquote p, ul, a[href], td, th, img)').height($(window).height()-(whiteSpaces*2));
			$('.paper blockquote, .paper ul li').height($('.paper').height()-42);
			$('.header, #pag, .paper').css('top', whiteSpaces);
			$('.footer').css('bottom', whiteSpaces);
			
			// Set Table
			$('.shu table').each(function(){
				var num = $(this).find('tr:first').find('th').length;
				//console.log(num);
				$(this).find('th, td').each(function(){
					$(this).height($('.paper').height()/num);
					$(this).find('img').each(function(){
						if($(this).height()>$('.paper').height())
							$(this).height($('.paper').height());
					});
				});
			});
			
			// Get logo width
			logoWidth = $('.header .blog-logo').outerWidth(true);
			
			// Get menu's total width
			$('.header .menu ul li').each(function(){
				$(this).width($(this).find('.post-title').outerWidth(true)+$(this).find('.post-date').outerWidth(true)+$(this).find('.post-excerpt').outerWidth(true));
				menuWidth += $(this).outerWidth(true);
			});
			
			// Get header's total width
			headerWidth = logoWidth+menuWidth;
			
			// Get & set paper's total width
			$('.paper').children().each(function(){
				paperWidth += $(this).outerWidth(true);
			});
			$('.paper').width(paperWidth);
			
			// Get footer's total width
			footerWidth = $('.footer').outerWidth(true);
			
			// Set the total outer paper width for scroll
			outerPaperWidth = (headerWidth+paperWidth+footerWidth < $(window).width()) ? $(window).width() : headerWidth+paperWidth+footerWidth+200;
			$('.outer_paper').width(outerPaperWidth).height($(window).height());
			
		}

	}

	paperSize();
	$(window).resize(function(){
		paperSize();
	});

	$('.post-excerpt, .paper').eachTextNode(function() {
	    this.data = this.data
				.replace('\“','﹃') // &#65091;
				.replace('\”','﹄') // &#65092;
				.replace('\‘','﹁') // &#65089;
				.replace('\’','﹂') // &#65090;
				.replace('\（','︵') // &#65077;
				.replace('\）','︶') // &#65078;
				.replace('\《','︽') //
				.replace('\》','︾') //
				.replace('\［','︻') // &#65083;
				.replace('\］','︼'); //&#65084;
	});
	
	$('.home-bt').on('click',function(ev){
		ev.preventDefault();
		history.back(1);
	});
	
	if(totalPages>1){
		for(o=1;o<totalPages+1;o++){
			$('#pag ul').append('<li><a href="'+blogURL+'/page/'+o+'">第'+cnNum(o)+'頁</a></li>');
		}
		//$('#pag ul').prepend('<li>第</li>').append('<li>頁</li>');
	}
	
	$('.loading').css({'display':'none'});
	window.scrollTo($('.outer_paper').outerWidth(true),0);
	
	//return false;
});