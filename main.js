const hero = {
    health: 100,
    dmg: 8,
    base: {health: 100, dmg: 1},
    lvl: 1
}

const boss = {
    health: 100,
    dmg: 1,
    base: {health: 100, dmg: 8},
    lvl: 1
}
 
currGold = 0
const chars = {hero, boss}


function drawBossHP(){
    let template = `<div id="boss-hp-bar" class="progress-bar bg-danger" style="width: ${Math.floor((boss.health/(boss.base.health*boss.lvl))*100)}%"> ${Math.floor((boss.health/(boss.base.health*boss.lvl))*100)}%</div>`
    document.getElementById('boss-hp-bar').innerHTML = template
}

function drawGold(){
    document.getElementById('hero-gold').innerText = `Gold: ${currGold}`
}

function hitBoss(hitter){
    if(boss.health < hitter.dmg){
        // boss.health = 0 NOTE this was for when the boss just died instead of leveling up
        boss.lvl++
        drawBossLvl()
        boss.health = boss.base.health * boss.lvl
        currGold += Math.floor(12 ** (1 + (boss.lvl/10)))
        drawGold()
    }
    
    else if(boss.health > 0 && hitter.health > 0){
        boss.health -= hitter.dmg
    }
    drawBossHP()
}

function reset() {
    hero.health = hero.base.health
    boss.health = boss.base.health
    drawBossHP()
    drawHeroHP()
}

function drawBossDmg(){
        document.getElementById('boss-dmg').innerText = `DMG: ${lastDmg}`
}

function drawBossLvl(){
    document.getElementById('boss-lvl').innerText= `LVL: ${boss.lvl}`
}

function drawHeroHP(){
    let template = `<div class="progress-bar bg-danger" style="width: ${hero.health}%">${hero.health}%</div>`
    document.getElementById('hero-hp-bar').innerHTML = template
}

let lastDmg = 0
function bossAttack() {
    if (boss.health > 0) {
        if (hero.health < boss.dmg) {
            hero.health = 0
        } else {
            if (hero.health > 0) {
                // TODO consider moving this math to a more accessible/stored place for dmg based on level
                lastDmg = boss.lvl * (boss.dmg * 1 + (Math.floor(Math.random() * 2)))
                hero.health -= lastDmg
                drawBossDmg()
            }
        }
    }
    if(hero.health < 0){
        hero.health = 0
    }
    drawHeroHP()
}

function buyHealth(){
    if(hero.health <= 90 && currGold >= 20){
        hero.health += 10
        currGold -= 20
        drawHeroHP()
        drawGold()
    }
}
const bossAttackSpeed = 1000
let hats = 1
let attackTimeLeft = 500

// function drawAttackTimer(){
    
//     attackTimeLeft = 2000
//     hats++
//     for(i=0; i<10; i++){
//         document.getElementById('boss-attack-bar').innerHTML = `
//         <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" style="width: ${(attackTimeLeft/bossAttackSpeed)*100}%"></div>`
//         attackTimeLeft -= 100
        
        
//     }
// }

setInterval(bossAttack, bossAttackSpeed)
// setInterval(drawAttackTimer, bossAttackSpeed)


drawHeroHP()
drawBossHP()