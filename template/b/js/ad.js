function getStyle(obj,name)
      {
		  if(obj.currentStyle)
		    {
				return obj.currentStyle[name]; //IE
			}
			else 
			{
				return getComputedStyle(obj,false)[name]; //火狐和Chrome
			}
	  }
	 
function startMove(obj,json,fnEnd)
{
	 
	 clearInterval(obj.timer);
	 
	 obj.timer=setInterval(function() {
	   var bstop=true;
	   for(var attr in json)
	   {
		 //var cur=parseInt(getStyle(obj,attr)); //取整数，取非数字（例如字母）前的整数
		 var cur=0
		 if (attr=='opacity') //判断是不是透明度？ 如果是则特殊处理一下。
		 {
			 cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		 }
		 else
		 {
			 cur=parseInt(getStyle(obj,attr)); //取整数，取非数字（例如字母）前 
		 }
		 var speed=(json[attr]-cur)/10;
		 speed=speed>0?Math.ceil(speed):Math.floor(speed);
		 
		 if(cur!=json[attr])
		
		   bstop=false;
		 
		   
			if (attr=='opacity')
			{
			    obj.style.filter='alpha(opacity:'+(cur+speed)+')'; //cur+speed本身就是数字，不能加在''之间。
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px'; 
			}	 
	   }
	   
	  if(bstop)
	     {
		     clearInterval(obj.timer);
			 if(fnEnd) fnEnd();
	     }
	 },30)

}
window.onload=function (){
	var oDiv=document.getElementById('play');
	var aLi=oDiv.getElementsByTagName('ol')[0].getElementsByTagName('li');
	
	var aUl=oDiv.getElementsByTagName('ul')[0];
	
	var now=0;
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			now=this.index;
			tab();
		};
	}
	
	function tab(){
		for(var i=0;i<aLi.length;i++)
			  {
				 aLi[i].className=''; 
			  }
		aLi[now].className='active';
			
		startMove(aUl,{top:-110*now});
		
	}
	function next(){
		
		now++;
		if(now==aLi.length)
		{
		  now=0;
		}
	
		tab();
	}
	timer=setInterval(next,5000);
	oDiv.onmousemove=function(){
		clearInterval(timer);
	}
	oDiv.onmouseout=function(){
		timer=setInterval(next,5000);
	}
	
};