/**
 * Created by orian.galkowicz on 24/05/2017.
 */
new Vue({
    el: '#app',
    data: {
        inGame: false,
        you: {
            life: 100,
            damage: 0
        },
        monster: {
            life: 100,
            damage: 0
        },
        turns: []
    },
    methods: {
        attack(isSpecial) {
            let text = '';
            this.monster.damage = this.calculateDamage(10);
            if (isSpecial) {
                this.you.damage = this.calculateDamage(20);
                text = 'hard';
            }
            this.you.damage = this.calculateDamage(10);
            this.monster.life -= this.you.damage;
            this.you.life -= this.monster.damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for '+ text + ' '+ this.you.damage
            });
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Monster for '+ this.monster.damage
            });
            console.log('attack');
        },
        heal() {
            if (this.you.life <= 90) {
                this.you.life += 10;
            } else {
                this.you.life = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals 10'
            });
        },
        resetGame() {
            this.monster.life = this.you.life = 100;
            this.monster.damage = this.you.damage = 0;
            this.turns = [];
            console.log('restart game');
        },
        endOfGame() {
            let winner = this.monster.life < this.you.life ? 'Win!' : 'Lost.';
            let newGame = confirm(`You ${winner} New Game?`);
            newGame && this.resetGame();
            console.log('game over');
        },
        calculateDamage(max){
            return Math.floor(Math.random() * max) + 1;
        },
        updateLogs() {

        }
    },
    watch: {
        monster: {
            handler: function () {
                this.you.life <= 0 && this.endOfGame();
                this.updateLogs();
            },
            deep: true
        },
        you: {
            handler: function () {
                this.monster.life <= 0 && this.endOfGame();
                this.updateLogs();
            },
            deep: true
        }
    }
});