<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img">
                        <img :src="item.img | setWH('128.180')">
                    </div>
                    <div class="info">
                        <p>
                            <span>{{item.nm}}</span><span>{{item.sc}}</span>
                        </p>
                        <p v-if="item.enm">{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.pubDesc}}</p>
                    </div>
                </li>
                <!-- 示例 -->
                <!-- <li>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                    <div class="info">
                        <p>
                            <span>名字</span><span>8.8</span>
                        </p>
                        <p>english name</p>
                        <p>动画</p>
                        <p>2021-2-1中国大陆上映</p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data(){
        return {
            message: '',
            moviesList: []
        }
    },
    methods: {
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
    },
    watch: {
        message(newVal){
            var that = this;
            var cityId = this.$store.state.city.id;
            // 取消上一次请求
            this.cancelRequest();
            
            this.axios.get('/ajax/search?cityId=' + cityId + '&kw=' + newVal, {
                //在请求中配置cancelToken这个属性，是为了使得请求具有可以取消的功能；
                //cancelToken属性的值是一个CancelToken实例对象，在它的executor函数中提取出cancel函数，执行这个cancel函数来取消请求。
                cancelToken: new this.axios.CancelToken(function executor(c) {
                    that.source = c;
                })
            }).then((res) => {
                // 在这里处理得到的数据
                var movies = res.data.movies;
                if(res.statusText === "OK" && movies){
                    this.moviesList = res.data.movies.list;
                }else{
                    this.moviesList = [];
                }
            }).catch((err) => {
                if (this.axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })
        }
    }
}
</script>

<style scoped>
#content .search_body{
    overflow: auto;
}
.search_body .search_input{
    padding: 8px 10px;
    background: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper{
    padding: 0 10px;
    line-height: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
}
.search_body .search_input_wrapper i{
    font-size: 16px;
    padding: 4px 0;
}
.search_body .search_input_wrapper input{
    border: none;
    font-size: 13px;
    color: #333;
    padding: 4px 0;
    outline: none;
    margin-left: 5px;
    width: 100%;
}
.search_body .search_result h3{
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result ul li{
    border-bottom: 1px dashed #c9c9c9;
    padding: 10px 15px;
    display: flex;
}
.search_body .search_result .img{
    width: 60px;
}
.search_body .search_result .img img{ 
    width: 100%; 
}
.search_body .search_result .info{ 
    margin-left: 15px; 
    flex:1;
}
.search_body .search_result .info p{
    font-size: 13px;
    height: 22px;
    line-height: 22px;
    display: flex;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){
    font-size: 18px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.search_body .search_result .info p:nth-of-type(1)  span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>