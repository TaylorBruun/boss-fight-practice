const hero = {
    health: 100,
    dmg: 8
}

const boss = {
    health: 100,
    dmg: 10
}

const chars = {hero, boss}


function progressUpdate(){
    for(let key in chars){
        let charHP = chars.health
        let 
    }
}

function drawBossHP(){
    let template = `<div id="boss-hp-bar" class="progress-bar bg-danger" style="width: ${boss.health}%">${boss.health}%</div>`
    document.getElementById('boss-hp-bar').innerHTML = template
}

function hitBoss(hitter){
    if(boss.health < hitter.dmg){
        boss.health = 0
    }
    
    else if(boss.health > 0 && hitter.health > 0){
        boss.health -= hitter.dmg
    }
    drawBossHP()
}

drawBossHP()