<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in movieList" :key="item.id">
                <div class="pic_show">
                    <img :src="item.img | setWH('128.180')" alt="">
                </div>
                <div class="info_list">
                    <div class="title">
                        <h2>{{item.nm}}</h2>
                        <span v-if="item.version"  class="version" :class="item.version"></span>
                    </div>
                    <!-- <span class="version v2d imax"></span> -->
                    <p v-if="item.sc">观众评<span class="grade">{{item.sc}}</span></p>
                    <p v-else><span class="grade">{{item.wish}}</span>人想看</p>
                    <p>主演：{{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div class="btn_mall">购票</div>
            </li>
            <!-- 示例 -->
            <!-- <li>
                <div class="pic_show">
                    <img src="" alt="">
                </div>
                <div class="info_list">
                    <h2>毒液<img src="" alt=""></h2>
                    <p>观众评<span class="grade">9.5</span></p>
                    <p>主演：甄子丹</p>
                    <p>今天2232家影院放映234场</p>
                </div>
                <div class="btn_mall">购票</div>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NowPlaying',
    data(){
        return {
            movieList: []
        }
    },
    mounted(){
        this.axios.get('/ajax/movieOnInfoList?10').then((res) => {
            if(res.statusText === "OK"){
                this.movieList = res.data.movieList;
                console.log(this.movieList)
            }
        })
    },
    filters: {
        formatClass(key){
			var card = [
				{ key: 'v2d', value: 'v2d'}
				// { key: 'endorse', value: 'bl'},
				// { key: 'sell', value: 'or'},
				// { key: 'snack', value: 'or'}
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

}
.movie_body .info_list .title{
    display: flex;
}
.movie_body .info_list h2{ 
    font-size: 17px; 
    line-height: 24px; 
    flex-shrink: 1; 
    padding-right: 5px; 
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow:ellipsis;
}

.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; display: inline-block; margin-left: 3px; vertical-align: middle;}
.movie_body .info_list .version{ 
    background-repeat: no-repeat;
    background-size: contain;
    width: 44px;
    height: 14px;
    display: inline-block;
    margin-top: 5px;
    flex: 0 0 auto;
    margin-right: 3px;
}
.movie_body .info_list .version.v2d{ 
    background-image: url('../../assets/2D-IMAX.png');
}
.movie_body .info_list .version.v3d{ 
    background-image: url('../../assets/3D.png');
}
.movie_body .info_list .version.v3d.imax{ 
    background-image: url('../../assets/3D-IMAX.png');
}

.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin: 0; padding: 0; border: none;}
</style>