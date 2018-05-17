$(function(){
		
/****初始化变量****/
	var curChip = 2;//默认筹码是2， 有2,10,50,100,500
	var time = 15;//开奖间隔时间15
	var lotterytime = 30;//正在开奖时间，10s
	var waittime = 5;//空闲时间5秒
	var gametype = 0; //游戏的状态,0是可投注状态，1是正在开奖状态,2是空闲状态，3是游戏非正常状态
	var chipname = "chip0"; //筹码名称
	var chipleft = "9%";//筹码位置
	var mygold = 6000;//我的金币
	var uplimitValue = 5000;//投注上限5000
	var totalChipMoney = 0;//下注金额
	var musicBool = true;//是否开启背景音乐
	var chipdataSelf = [
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
					 ];//8个区域自己的投注筹码
	var chipdataTotal = [
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
					 ];//8个区域总的投注筹码

/****游戏初始化函数****/
	function init(){
		time = 15;//开奖间隔时间15
		lotterytime = 30;//正在开奖时间，10s
		waittime = 5;//空闲时间5秒
		gametype = 0; //游戏的状态,0是可投注状态，1是正在开奖状态,2是空闲状态，3是游戏非正常状态
		totalChipMoney = 0;//下注金额
		
		chipdataSelf = [
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
					 ];//8个区域自己的投注筹码
		chipdataTotal = [
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
					 ];//8个区域总的投注筹码
		
		game_state()
		
		/*播放开始音乐*/
		mbeigin = document.getElementById("mbegin");
		mbeigin.volume = 1;
		mbeigin.src = "./source/begin.wav"; 
		mbeigin.play();
		
		/*播放背景音乐*/
		if(musicBool)
		{
			mbg = document.getElementById("mbg");
			mbg.src = "./source/bg.wav"; 
			mbg.volume = 1;
			mbg.play();
		}	
	}

	init();

/****游戏音效****/
	$(".bgBtn").click(function(){
		if($(this).hasClass("close"))
		{
			$(this).removeClass("close")
			musicBool =true;
			if(mbg) mbg.play(); 
		}else
		{
			$(this).addClass("close")
			musicBool = false;
			if(mbg) mbg.pause(); 
		}	
	})

/****赋值我的金币****/
	$(".qb_num").text(mygold);	
	
/****充值弹窗****/
	$(".rcg_lg").click(function(){
		showcharge();
	})
	$(".charge_wrap_close").click(function(){
		hidecharge();
	})	
	//显示充值函数
	function showcharge(){
		$(".page").addClass("db");
	}	
	//隐藏充值函数
	function hidecharge(){
		$(".page").removeClass("db");
	}

/****筹码切换****/
	$(".bottom li").on("click",function(){
		chipname = "chip" + $(this).index();//修改筹码名称
		chipleft = 9 + $(this).index()*17 + "%";//修改筹码位置
		$(this).siblings("li").find("img").removeClass("current");
		$(this).find("img").addClass("current");
		//修改筹码值
		curChip = parseInt($(this).find("span").attr("data-value")) ;
	})

/****倒计时函数****/
function game_state(){
		//状态1：正常投注倒计时
		if(gametype == 0)
		{

			thetime = changeTimeType(time);
			$(".min").text(thetime[0]);
			$(".second").text(thetime[1]);
			time--;
			$(".txtTs").text("投注时间");
			timer1 = setInterval(function(){
				thetime = changeTimeType(time);
				$(".min").text(thetime[0]);
				$(".second").text(thetime[1]);
				if(time == 0)
				{
					//执行等待开奖函数,清除定时器
					clearInterval(timer1);
					setTimeout(function(){
						gametype = 1;
						game_state();
					},1000)	
				}
				time--;
			},1000)
		}

		//状态2：正在开奖中
		if(gametype == 1)
		{
			thetime = changeTimeType(lotterytime);
			$(".min").text(thetime[0]);
			$(".second").text(thetime[1]);
			lotterytime--;
			//游戏状态变成开奖状态
			$(".txtTs").text("正在开奖");
			
			//调用赛车直播函数
			$(".reward").addClass("db");
			var rankArr = [10,5,1,8,9,3,2,4,7,6];//名次
			resultFun(rankArr);//调用开奖函数
			
			
			timer2 = setInterval(function(){
				thetime = changeTimeType(lotterytime);
				$(".min").text(thetime[0]);
				$(".second").text(thetime[1]);
				 
				if(lotterytime == 4){
					hideResultTC();	
					//弹窗,
					winFunc(true);
				}
				
				if(lotterytime == 0){
					$(".hidebg,.winorlose,.win,.lose").removeClass("db");
					clearInterval(timer2);
					$(".moveChip").remove();
					$(".cnBox p").removeClass("db");
					setTimeout(function(){
						gametype = 2;
						game_state();
					},1000)	
				}
				lotterytime--;
			},1000)
		}	
		//状态2：空闲状态，游戏初始化准备
		if(gametype == 2)
		{
			thetime = changeTimeType(waittime);
			$(".min").text(thetime[0]);
			$(".second").text(thetime[1]);
			waittime--;
			//游戏状态变成空闲状态
			$(".txtTs").text("空闲时间");
			
			timer3 = setInterval(function(){
				thetime = changeTimeType(waittime);
				$(".min").text(thetime[0]);
				$(".second").text(thetime[1]);
				if(waittime == 0){
					clearInterval(timer3);
					setTimeout(function(){
						init();
					},1000)		
				}
				waittime--;
			},1000)
		}	
	}

/****点击投注****/
	$(".cnBox").click(function(){
		//判断游戏状态,如果是非投注状态，则不执行任何操作，直接返回
		if(gametype) return;
		
		//存储this变量
		_this = this;
		
		//点击的区域0,1,2,3,4,5,6,7...139
		var oNum = $(this).parents(".cc").index();//当前点击区域是第几块
		var tarIndex = $(this).index();//当前区块的点击的区域索引
		chipdataSelf[oNum][tarIndex] += curChip;//更新当前区域自己总的投注数量
		
		//判断金币
		moneybool = moneyFun();//金币是否足够，返回true,false
		
		//判断投注上限
		uplimitbool = uplimit(chipdataSelf[oNum][tarIndex]); //是否单个区域达到投注上限，返回true,false
		
		//金币不足，弹出充值窗口
		if(!moneybool) {
			showcharge();
			chipdataSelf[oNum][tarIndex] -= curChip;
			return;
		//单个投注上限， 弹出上限提示窗口
		}else if(!uplimitbool){
			console.log("单个区域最高投注5000金币");
			chipdataSelf[oNum][tarIndex] -= curChip;//还原当前区域的投注数量
			return;
		}
		
		$(this).addClass("cli");
		setTimeout(function(){
			$(_this).removeClass("cli")
		},100)	
		
		//投注成功， 减去投注金币， 更新总的投注金额和页面余额显示
		chipdataTotal[oNum][tarIndex] += curChip;//更新当前区域所有的投注数量
		mygold -= curChip;//更新我的金币总数量
		totalChipMoney = totalChipMoney + curChip;//更新我自己当前总投注金额
		$(".qb_num").text(mygold);	//更新页面余额显示
		
		//播放下注音乐
		mcoin = document.getElementById("mbegin");
		mcoin.src = "./source/coin.mp3"; 
		mcoin.volume = 1;
 		mcoin.play();
		
		//对应区域显示投注金额
		$(this).find("p").addClass("db").find(".sChip").text(chipdataSelf[oNum][tarIndex]); //当前区域自己的投注金额
		$(this).find("p").addClass("db").find(".tChip").text(chipdataTotal[oNum][tarIndex]);//当前区域总的投注金额
		
		//创建筹码并移动
		var moveChip = '<span style="left:'+chipleft+'" class="moveChip '+chipname+'"></span>';
		var targetl = $(this).offset().left;
		var targetw = $(this).innerWidth();
		var targett = $(this).offset().top;
		var targeth = $(this).innerHeight(); 
		var disl = Math.random()*(targetw - 15);
		var dist = Math.random()*(targeth - 15);
		var t_l = targetl + disl;
		var t_t = targett + dist;
		$(moveChip).appendTo("body").animate({"left":t_l,"top":t_t},function(){
			$(this).css({"left":disl,"top":dist});
			$(_this).append($(this));
		})
	})

/****判断金币是否足够****/
	function moneyFun(){
		if(mygold < curChip){
			return false;
		}else{
			return true;
		}
	}
	
/****判断是否达到投注上限****/
	function uplimit(value){
		if(value > uplimitValue){
			return false;
		}else {
			return true;
		}
	}

/****撤销****/
	$(".clear_con").on("click",function(){
		if(gametype) return; //非投注状态不能撤销
		$(".revokets").addClass("db");
	})
	
	$(".cancelBtn").click(function(){
		$(".revokets").removeClass("db");
	})
	$(".sureBtn").click(function(){
		$(".revokets").removeClass("db");
		mygold += totalChipMoney;
		$(".qb_num").text(mygold);
		clearChip();//调用清除筹码函数
	})
	
/****清除筹码下注****/
	function clearChip(){
		$(".moveChip").remove();
		$(".sChip").text("0");
		//更新总的投注数组
		for(var i=0;i<10;i++)
		{
			for(var j=0; j<14; j++)
			{
				chipdataTotal[i][j]-=chipdataSelf[i][j];
				//如果当前区域总的投注为0 ，那么隐藏投注数据显示
				if(chipdataTotal[i][j]==0)
				{
					$(".cnBox").eq(i*10+j).find("p").removeClass("db");
				}
			}
		}
		//更新我的总投注金币数量
		totalChipMoney = 0;
		//更新自己的投注数组
		chipdataSelf = [
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
					 ];//总的投注筹码
		//调用更新投注数据显示函数
		showChipData();
	}

/****更新投注数据的显示****/
	function showChipData(){
		for(var i=0;i<10;i++)
		{
			for(var j=0; j<14; j++)
			{
				chipdataTotal[i][j]-=chipdataSelf[i][j];
				//如果当前区域总的投注为0 ，那么隐藏投注数据显示
				if(chipdataTotal[i][j]==0)
				{
					$(".cnBox").eq(i*10+j).find("sChip").text(0);
					$(".cnBox").eq(i*10+j).find("tChip").text(chipdataTotal[i][j]);
				}
			}
		}
	}
	
/****时间格式转换(不足10秒的前面补0)****/
	function changeTimeType(time){
		var min = parseInt(time/60);
		var second = time%60;
		if(min<10) min =  "0" + min;
		if(second<10) second =  "0" + second;
		return [min,second];
	}

/**开奖函数**/
  function resultFun(rankArr){
  	for(var i=0;i<10;i++)
  	{
  		(function(){
  			var tInd = i;
  			setTimeout(function(){
		  		$(".rewardItem").eq(tInd).find("span").addClass("cho");
		  		$(".rewardItem").eq(tInd).find("ul").animate({"marginLeft":-70*(rankArr[tInd]+9)},2000,function(){
		  			$(".rewardItem").eq(tInd).find("p").addClass("db");
		  			$(".rewardNum span").eq(tInd).addClass("db num"+rankArr[tInd]);
		  			if(tInd == 9)
		  			{
		  				lightShake();
		  			}
		  		})
		  	},2000*i)
  		})(i);
  	}
  }
  
/*灯闪烁*/
function lightShake(){
	$(".light").addClass("db shake");
}
  
/****开奖后筹码去向(如果赢了就传参数winArg=true,输了或者没有投注就不传参数)****/
function winFunc(winArg)
{
	if(winArg)
	{
		//弹窗
		$(".hidebg,.winorlose,.win").addClass("db");
		
		setTimeout(function(){
			/*播放中奖音乐*/
			mwin = document.getElementById("mwin");
			mwin.volume = 1;
			mwin.src = "./source/win.wav"; 
			mwin.play();
		},1500)
	}
	else
	{
		$(".hidebg,.winorlose,.lose").addClass("db");
	}
}

//点击遮罩隐藏
$(".hidebg,.winorlose").on("click",function(){
	$(".hidebg,.winorlose,.win,.lose").removeClass("db");
})

/**投注区翻页**/
var page = 0;
$(".carBtn").on("click",function(){
	page=$(this).index();
	PageFun(page);
})

$(".rBtn").on("click",function(){
	page = (page+1) > 9 ? 0 : (page + 1);
	PageFun(page);
})

$(".lBtn").on("click",function(){
	page = (page-1) < 0 ? 9 : (page - 1);
	PageFun(page);
})

function PageFun(ind){
	$(".carBtn").removeClass("cho");
	$(".carBtn").eq(ind).addClass("cho");
	$(".allcc").animate({"marginLeft":(-100*ind)+'%'},200);
}

/**显示自己的投注开奖结果**/
function showResultTC()
{	
	$(".reward").addClass("db");
}
/**隐藏弹窗显示结果**/
function hideResultTC()
{	
	$(".reward").removeClass("db");
	$(".rewardItem span").removeClass("cho");
	$(".rewardItem p").removeClass("db");
	$(".rewardItem ul").css("marginLeft","0px");
	$(".light").attr("class","light");
	$(".rewardNum span").attr("class","");
}

/*往期结果*/
$(".past").click(function(){
	$(".hisBox").addClass("db");
})
$(".cloHis").click(function(){
	$(".hisBox").removeClass("db");
})
			 
/**菜单栏弹出**/
	$(".note").click(function(){
		$(".note_in22").toggleClass("db")
	})

	$(document).click(function(e){
		if(e.target.className == "note"){
			return
		}else{
			$(".note_in22").removeClass("db")
		}
		
	})
	
	//游戏规则
	$(".game_rule").click(function(){
		$(".rule").addClass("db");
	})
	
	$(".pop_close,.btn_return").click(function(){
		$(".rule").removeClass("db");
	})
	
	//投注记录
	$(".record").click(function(){
		$(".record_content").addClass("db");
	})
	$(".pop_close,.btn_return").click(function(){
		$(".record_content").removeClass("db");
	})
	
	$(".record_con").click(function(){
		$(this).next(".record_more2").toggleClass("db")
	})

/****第一次进游戏提示****/
	$(".guide_one").addClass("db")
	$(".next_step").click(function(){
		$(".guide_one").removeClass("db")
		$(".guide_two").addClass("db")
	})
	$(".next_step2").click(function(){
		$(".guide_two").removeClass("db")
		$(".guide_three").addClass("db")
	})
	$(".return_step").click(function(){
		$(".guide_three").removeClass("db")
	})
 
})