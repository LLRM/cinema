<template>
    <div class="movie_body">
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" ref="scroller">
            <ul>
                <li v-if="isEmpty" class="empty">暂无影院</li>
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in comingList" :key="item.id">
                    <div class="pic_show"  @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2  @tap="handleToDetail(item.id)">{{item.nm}}
                            <img v-if="item.version" src="@/assets/2D-IMAX.png">
                        </h2>
                        <p><span class="person">{{item.wish}}</span> 人想看</p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.rt}}上映</p>
                    </div>
                    <div class="btn_pre">
                        预售
                    </div>
                </li>
                <!-- 示例 -->
                <!-- <li>
                    <div class="pic_show">
                        <img src="" alt="">
                    </div>
                    <div class="info_list">
                        <h2>毒液<img src="" alt=""></h2>
                        <p><span class="person">12123</span>人想看</p>
                        <p>主演：甄子丹</p>
                        <p>2021-1-1上映</p>
                    </div>
                    <div class="btn_pre">预售</div>
                </li> -->
            </ul>
        </Scroller>
    </div>
</template>

<script>
export default {
    name: 'ComingSoon',
    data(){
        return{
            comingList: [],
            pullDownMsg: '',
            isLoading: true,
            prevCityId: -1,
            isEmpty: false
        }
    },
    activated(){

        var cityId = this.$store.state.city.id;
        //若id相同，则未更改城市，无需重新发起请求
        if(this.prevCityId === cityId){ return; }
        // 重新发起请求，正在更新中
        this.isLoading = true;
        this.isEmpty = false;

        this.axios.get('/ajax/comingList?cityId=' + cityId + '&token=&limit=').then((res)=>{
            if(res.statusText === "OK"){
                this.comingList = res.data.coming;
                console.log(this.comingList);
                //更新完成
                this.isLoading = false;
                //保存此次城市id
                this.prevCityId = cityId;
                // 暂无影院
				if(this.comingList == ''){
					this.isEmpty = true;
				}
                //重新渲染better-scroll
                this.$nextTick(() => {
                    this.$refs.scroller.refreshBScroll();
                })
            }
        })
    },
    methods: {
        handleToDetail(movieId){
            console.log(movieId)
            this.$router.push('/movie/detail/2/' + movieId)
        },
        handleToScroll(pos){
            // console.log('scroll');
            if(pos.y > 30){
                this.pullDownMsg = '正在更新中';
            }
        },
        handleToTouchEnd(pos){
            // console.log('touchend');
            if(pos.y > 30){
                this.axios.get('/ajax/movieOnInfoList?10').then((res) => {
                    if(res.statusText === "OK"){
                        this.pullDownMsg = '更新成功';
                        setTimeout(() => {
                            this.movieList = res.data.movieList;
                            this.pullDownMsg = '';
                        }, 1000)
                    }
                })
            }
        }

    }
}
</script>

<style scoped>
#content .movie_body{
    flex: 1;
    overflow: auto;
}
.movie_body ul{
    margin: 0 12px;
    overflow: hidden;
}
.movie_body ul li{
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
}
.movie_body .pic_show{
    width: 64px;
    height: 90px;
}
.movie_body .pic_show img{
    width: 100%;
    height: 100%;
}
.movie_body .info_list{
    margin-left: 10px;
    flex: 1;
    position: relative;
}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:180px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}

.movie_body .info_list img{ width:50px; display: inline-block; margin-left: 3px; vertical-align: middle;}

.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin: 0; padding: 0; border: none;}
.movie_body li.empty{ border-bottom: none;}
</style>