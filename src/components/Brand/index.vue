<template>
    <div class="cinema_body">
		<!-- <Loading v-if="isLoading" /> -->
		<ul>
			<!-- <li v-if="isEmpty" class="empty">暂无影院</li> -->
			<li v-for="item in brandList" :key="item.id">
				<div>
					<span>{{item.nm}}</span>
					<span class="q" v-if="item.sellPrice"><span class="price">{{item.sellPrice}}</span> 元起</span>
				</div>
				<div class="address">
					<span>{{item.addr}}</span>
					<span>{{item.distance}}</span>
				</div>
				<div class="card">
					<div v-for="(num, key) in item.tag" :key="key" v-if="num===1" :class="key | formatClass">{{ key | formatCard}}</div>
					<div v-for="items in item.tag.hallType" :key="items" class="bl">{{ items }}</div>	
				</div>
			</li>
			<!-- <li>
				<div>
					<span>中影UL城市影院（布心店）</span>
					<span class="q"><span class="price">22.9</span> 元起</span>
				</div>
				<div class="address">
					<span>罗湖区东昌路今日家园腾均商业百货二楼（布心地铁A出口直行50米华润万家二楼）</span>
					<span>20km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影UL城市影院（莲塘店）</span>
					<span class="q"><span class="price">38</span> 元起</span>
				</div>
				<div class="address">
					<span>罗湖区莲塘聚宝商业中心三楼（莲塘工商银行楼上）</span>
					<span>20.3km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影UL城市影院（彩田店）</span>
					<span class="q"><span class="price">38</span> 元起</span>
				</div>
				<div class="address">
					<span>福田区彩田路3030号彩德城三层</span>
					<span>26.7km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影UL城市影院（龙珠店）</span>
					<span class="q"><span class="price">28</span> 元起</span>
				</div>
				<div class="address">
					<span>南山区西丽镇桃源村三期岁宝百货二楼（地铁桃源村B口）</span>
					<span>33km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影UL城市影院（西丽店）</span>
					<span class="q"><span class="price">28</span> 元起</span>
				</div>
				<div class="address">
					<span>南山区留仙大道366商业步行街中段迪嘉购物城2楼</span>
					<span>34.4km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影UL城市影院（宝立方店）</span>
					<span class="q"><span class="price">28</span> 元起</span>
				</div>
				<div class="address">
					<span>宝安区西乡流塘新安四路198号宝立方博览中心三楼</span>
					<span>39.9km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li>
			<li>
				<div>
					<span>中影ul城市影院（海雅店）</span>
					<span class="q"><span class="price">38</span> 元起</span>
				</div>
				<div class="address">
					<span>南山区海雅百货7楼</span>
					<span>40.1km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
				</div>
			</li> -->
		</ul>
	</div>
    
</template>

<script>
export default {
    name : 'Brand',
	data(){
        return{
			brandList: '',
			isLoading: true,
			prevCityId: -1,
			isEmpty: true
        }
	},
	activated(){
        //没有再次切换城市
        // var cityId = this.$store.state.city.id;
        // if(this.prevCityId === cityId){ return };

        this.isLoading = true;
        this.axios.get('/ajax/cinemaList?cityId=30&brandId=201744').then((res)=>{
            console.log(res)
            if(res.statusText === "OK"){
                this.brandList = res.data.cinemas;
                // this.prevCityId = cityId;
				// this.isLoading = false;
				// this.isEmpty = false;
			}
			// if(this.brandList == ''){
			// 	this.isEmpty = true;
			// }
        })
    },
	filters: {
		formatCard(key){
			var card = [
				{ key: 'allowRefund', value: '退'},
				{ key: 'endorse', value: '改签'},
				{ key: 'sell', value: '折扣卡'},
				{ key: 'snack', value: '小吃'}
			];
			
			for(var i=0;i<card.length;i++){
				if( (card[i].key === key) ){
					return card[i].value;
				}
			}
		},
		formatClass(key){
			var card = [
				{ key: 'allowRefund', value: 'bl'},
				{ key: 'endorse', value: 'bl'},
				{ key: 'sell', value: 'or'},
				{ key: 'snack', value: 'or'}
			];
			for(var i=0;i<card.length;i++){
				if(card[i].key === key){
					return card[i].value;
				}
			}
		}
	}
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px; vertical-align:baseline;height: 18px;}
.cinema_body div span:nth-of-type(1){ max-width: 255px; display: inline-block; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; }
.cinema_body .q{ font-size: 11px; color:#f03d37;display: inline-block; margin-left: 15px;}
.cinema_body .q .price{ font-size: 18px; display: inline;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(1){ display:inline-block; width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex; width: 330px; height: 17px; overflow: hidden; flex-wrap: wrap; font-size: 0;} 
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.cinema_body li.empty{ border-bottom: none; }
</style>