import BackTop from 'components/contents/backTop/BackTop'

export const backTop = {
  components:{
    BackTop
  },
  data(){
    return{
      showBackTop: false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    listenShowBackTop(position){
      if(position.y <= -1000)
        this.showBackTop = true
      else
        this.showBackTop = false
    }
  }
}
