<template>
    <div class="cinema_body">
		<Loading v-if="isLoading" />
		<ul v-else>
			<!-- <li v-if="isEmpty" class="empty">暂无影院</li> -->
			<li v-for="item in featureList" :key="item.id">
				<div>
					<span>{{item.nm}}</span>
					<span class="q" v-if="item.sellPrice"><span class="price">{{item.sellPrice}}</span> 元起</span>
				</div>
				<div class="address">
					<span>{{item.addr}}</span>
					<span>{{item.distance}}</span>
				</div>
				<div class="card">
					<div v-for="(num, key) in item.tag" :key="key" v-if="num===1" :class="key | formatClass">{{ key | formatCard}}	
				</div>
					<!-- <div class="allowRefund bl">退</div>
                  	<div class="endorse bl">改签</div>
                  	<div class="snack">小吃</div> -->
				</div>
			</li>
			<li>
				<div>
					<span>橙天嘉禾影城（深圳卓悦汇IMAX店）</span>
					<span class="q"><span class="price">39</span> 元起</span>
				</div>
				<div class="address">
					<span>福田区梅林街道中康路126号卓悦汇购物中心L4-27号</span>
					<span>26.1km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
						<div class="snack">小吃</div>
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">IMAX厅</div>
						<div class="hallType bl">杜比全景声厅</div>
						<div class="hallType bl">4K厅</div>
				</div>
			</li>
			<li>
				<div>
					<span>英皇UA电影城（深圳深业上城店）</span>
					<span class="q"><span class="price">27</span> 元起</span>
				</div>
				<div class="address">
					<span>福田区皇岗路5001号深业上城M层和L1层</span>
					<span>26.5km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
						<div class="endorse bl">改签</div>
						<div class="snack">小吃</div>
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">IMAX厅</div>
				</div>
			</li>
			<li>
				<div>
					<span>卢米埃深圳华强北IMAX影城</span>
					<span class="q"><span class="price">28</span> 元起</span>
				</div>
				<div class="address">
					<span>福田区中航路中航城天虹购物中心4楼</span>
					<span>26.7km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
					<div class="hallType bl">IMAX厅</div>
					<div class="hallType bl">杜比全景声厅</div>
					<div class="hallType bl">RealD厅</div>
					<div class="hallType bl">RealD 6FL厅</div>
				</div>
			</li>
			<li>
				<div>
					<span>星美影商城（京基IMAX店）</span>
					<span class="q"><span class="price">29.9</span> 元起</span>
				</div>
				<div class="address">
					<span>福田区滨河大道9289号京基滨河时代北区4层</span>
					<span>31.7km</span>
				</div>
				<div class="card">
					<div class="allowRefund bl">退</div>
					<div class="endorse bl">改签</div>
					<div class="hallType bl">IMAX厅</div>
				</div>
			</li>
			<li>
				<div>
					<span>万达影城（海雅广场IMAX店）</span>
					<span class="q"><span class="price">46.9</span> 元起</span>
				</div>
				<div class="address">
					<span>宝安区建安一路与新圳路交汇处海雅缤纷城四层（地铁灵芝站）</span>
					<span>39.7km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
					<div class="hallType bl">IMAX厅</div>
					<div class="hallType bl">RealD 6FL厅</div>
			</div>
			</li>
			<li>
				<div>
					<span>卢米埃深圳汇港IMAX影城</span>
					<span class="q"><span class="price">40</span> 元起</span>
				</div>
				<div class="address">
					<span>南山区蛇口工业三路1号汇港3楼（海上世界地铁站B出口）</span>
					<span>43.4km</span>
				</div>
				<div class="card">
					<div class="endorse bl">改签</div>
					<div class="snack">小吃</div>
					<div class="vipTag">折扣卡</div>
					<div class="hallType bl">IMAX厅</div>
					<div class="hallType bl">杜比全景声厅</div>
					<div class="hallType bl">RealD厅</div>
					<div class="hallType bl">RealD 6FL厅</div>
				</div>
			</li>
		</ul>
	</div>
    
</template>

<script>
export default {
	name : 'Feature',
	data(){
        return{
			featureList: '',
			isLoading: true,
			prevCityId: -1,
			isEmpty: true
        }
	},
	activated(){
        //没有再次切换城市
        var cityId = this.$store.state.city.id;
        if(this.prevCityId === cityId){ return };

        this.isLoading = true;
        this.axios.get('/ajax/cinemaList?cityId=' + cityId + '&service/subItemsId=3').then((res)=>{
            console.log(res)
            if(res.statusText === "OK"){
                this.featureList = res.data.cinemas;
                this.prevCityId = cityId;
				this.isLoading = false;
				this.isEmpty = false;
			}
			if(this.featureList == ''){
				this.isEmpty = true;
			}
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