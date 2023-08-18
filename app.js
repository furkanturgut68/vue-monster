function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const app = Vue.createApp({
    data(){
        return {
            monsterHealth : 100,
            playerHealth : 100,
            round : 0,
            winner : null,
            loggeds : []
        }
    },
    methods: {
        userAttack(){
            this.round++
            const attackValue = getRandomNumber(5,11)
            this.monsterHealth -= attackValue
            this.isLoggeds('player','attack',attackValue)
            this.monsterAttack()
        },
        monsterAttack(){           
            this.round++
            const attackValue = getRandomNumber(8,18)
            this.playerHealth -= attackValue
            this.isLoggeds('monster','attack',attackValue)

        },
        specialAttack(){
            this.round++
            const attackValue = getRandomNumber(10,25)
            this.monsterHealth -= attackValue
            this.isLoggeds('player','specal attack',attackValue)
            this.monsterAttack()
        },
        healHelp(){
            this.round++
            const healValue = getRandomNumber(15,24)
            this.playerHealth += healValue
            this.isLoggeds('player','heal',healValue)
            this.monsterAttack()
        },
        surrender(){
            this.winner = 'monster'
        },
        newGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.round = 0
            this.winner = null
            this.loggeds = []
        },
        isLoggeds(who,what,value){
            console.log("islogged ....")
            this.loggeds.unshift({
                actionBy: who,
                actionPower: value,
                actionWhat : what
            });
        }
    },
    computed : {
        playerBar(){
            return {width:this.playerHealth+'%'}
        },
        monsterBar(){
            return {width:this.monsterHealth+ '%'}
        },
        specialControl(){
            return this.round % 3 !== 0
        },
        healControl(){
            return this.round % 5 !== 0
        }
    },
    watch : {
       playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner == 'draw'
            }else if(value <= 0){
                this.winner = 'monster'
                this.playerHealth = 0
            }
       },
       monsterHealth(value){
        if(value <= 0 && this.playerHealth <= 0){
            this.winner == 'draw'
        }else if(value <= 0){
            this.winner = 'player'
            this.monsterHealth = 0

        }
       }

    }
    
});
app.mount("#game");
