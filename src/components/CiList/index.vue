<template>
    <div class="cinema_body">
		<!-- <ul  class="msgHtmlBox" v-html='movieList'></ul> -->
		<Loading v-if="isLoading" />
		<Scroller v-else ref="scroller">
			<ul>
				<li v-if="isEmpty" class="empty">暂无影院</li>
				<li v-for="item in cinemaList" :key="item.id">
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
					</div>
				</li>
				<!-- <li>
					<div>
						<span>深影国际嘉之华中心影城</span>
						<span class="q"><span class="price">39</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区福中一路2016号深圳音乐厅旁首层</span>
						<span>28.1km</span>
					</div>
					<div class="card">
						<div class="allowRefund bl">退</div>
						<div class="endorse bl">改签</div>
						<div class="snack">小吃</div>
					</div>
				</li>
				<li>
					<div>
						<span>CGV影城（卓悦中心 激光IMAX店）</span>
						<span class="q"><span class="price">38</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区福华路348号卓悦中心1栋B2层CGV影城</span>
						<span>28.3km</span>
					</div>
					<div class="card">
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">IMAX厅</div>
						<div class="hallType bl">4D厅</div>
					</div>
				</li>
				<li>
					<div>
						<span>保利国际影城（大中华店）</span>
						<span class="q"><span class="price">39</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区福华路北大中华国际交易广场4楼（会展中心地铁站A出口）</span>
						<span>28.6km</span>
					</div>
					<div class="card">
						<div class="allowRefund bl">退</div>
						<div class="endorse bl">改签</div>
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">杜比全景声厅</div>
					</div>
				</li>
				<li>
					<div>
						<span>金逸影城（中心城店）</span>
						<span class="q"><span class="price">41</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区福华一路怡景中心城G层（会展中心地铁站B出口）</span>
						<span>28.9km</span>
					</div>
					<div class="card">
						<div class="snack">小吃</div>
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">杜比全景声厅</div>
						<div class="hallType bl">Dolby Cinema厅</div>
						<div class="hallType bl">4D厅</div>
						<div class="hallType bl">MX4D厅</div>
					</div>
				</li>
				<li>
					<div>
						<span>博纳国际影城（皇庭店）</span>
						<span class="q"><span class="price">39</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区福华三路皇庭广场b1-3（会展中心c出口）</span>
						<span>29.1km</span>
					</div>
					<div class="card">
						<div class="endorse bl">改签</div>
						<div class="vipTag">折扣卡</div>
						<div class="hallType bl">杜比全景声厅</div>
					</div>
				</li>
				<li>
					<div>
						<span>英皇电影城（平安金融中心IMAX激光店）</span>
						<span class="q"><span class="price">39</span> 元起</span>
					</div>
					<div class="address">
						<span>福田区益田路5023号平安金融中心商场南塔L６层S607</span>
						<span>29.3km</span>
					</div>
					<div class="card">
						<div class="hallType bl">IMAX厅</div>
					</div>
				</li> -->
			</ul>
		</Scroller>
	</div>
</template>

<script>
export default {
	name: 'CiList',
	data(){
        return{
			cinemaList: '',
			isLoading: true,
            prevCityId: -1,
			isEmpty: false
        }
	},
	activated(){
        //没有再次切换城市
        var cityId = this.$store.state.city.id;
        if(this.prevCityId === cityId){ return };
        this.isLoading = true;
		this.isEmpty = false;

        console.log('执行')
        this.axios.get('/ajax/cinemaList?cityId=' + cityId).then((res)=>{
            console.log('res',res)
            if(res.statusText === "OK"){
                this.cinemaList = res.data.cinemas;
                this.prevCityId = cityId;
                this.isLoading = false;
				// 暂无影院
				if(this.cinemaList == ''){
					this.isEmpty = true;
				}
				this.$nextTick(() => {
                    this.$refs.scroller.refreshBScroll();
                })
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
.cinema_body ul{ padding:20px; overflow: hidden;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body ul li div{ margin-bottom: 10px; vertical-align:baseline;height: 18px;}
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

</style>