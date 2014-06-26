/*******************************************************************************
 *
 * jquery.文字竖排 Chrome, Safari, Firefox, Opera
 * Author: o@cailei.net
 * Creation date: 06/02/2013
 *
 * last modified: 02/06/14 20.38
 ******************************************************************************/
(function($){
	
	// made Shu Pai text
	$.fn.shuPai = function()
	{	
		this.contents().each( shu );
		
		function shu(){
			var nn = this.nodeName.toLowerCase();
			if(nn === '#text' && this.data.replace(/\s+/g, "").length !== 0){
				$(this).wrap('<shu />');
			}else if(this.nodeType === 1){
				$(this).contents().each( shu );
			}
		}
		
		this.css({
			'-moz-transform-origin' : '0 0',
			'-moz-transform' : 'rotate(90deg)',
			'-o-transform-origin' : '100% 0',
			'-o-transform' : 'rotate(90deg)',
			'transform-origin' : '0 0',
			'transform' : 'rotate(90deg)'
		});
		
		this.find('shu').each(function(){
			$(this).textSplit();
			//if($(this).parent()[0].tagName == 'H6') $(this).prepend('<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>');
		}).contents().unwrap();
		this.find('shu').remove();

	}

	// Wrap each text into <span>
	$.fn.textSplit = function()
	{
		var holder = this;
		var text = holder.text().replace(/<[^>]+>/gi,'').split('');
		if(text.length>0){
			console.log(holder.parent().context.tagName);
			holder.html('<span>' + text.join('</span><span>') + '</span>');
		}
		
		// Prevent punctuation on the first position
		var marks = new Array('，','。','：','；','、','！','︼');
		holder.find('span').each(function(){
			if(marks.indexOf($(this).text()) >= 0){
				$(this).prev().append('<m>'+$(this).text()+'</m>');
				$(this).remove();
			}
		});
		
	}
	
	// Replace text in node which don't have child-node
	$.fn.eachTextNode = function( fn )
	{
	    this.contents().each( tReplace );
	    function tReplace() {
	        var nn = this.nodeName.toLowerCase();
	        if( nn === '#text' ) {
	            fn.call( this );
	        } else if( this.nodeType === 1 && this.childNodes && this.childNodes[0] && nn !== 'script' && nn !== 'textarea' ) {
	            $(this).contents().each( tReplace );
	        }
	    }
	    return this;
	};

})(jQuery)

