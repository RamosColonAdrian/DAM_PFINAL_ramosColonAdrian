//https://lol.fandom.com/wiki/Aphelios

db.champions.insertMany([
  {
    name: 'Atrox',
    position: 'top',
    type: 'fighter',
    skills: [
      {
        name: '[Q]-THE DARKIN BLADE',
        manaCost: 0,
        description:
          'Aatrox slams his greatsword down, dealing physical damage. He can swing three times, each with a different area of effect.'
      },
      {
        name: '[W]-INFERNAL CHAINS',
        manaCost: 0,
        description:
          'Aatrox smashes the ground, dealing damage to the first enemy hit. Champions and large monsters have to leave the impact area quickly or they will be dragged to the center and take the damage again.'
      },
      {
        name: '[E]-UMBRAL DASH',
        manaCost: 0,
        description:
          'Passively, Aatrox heals when damaging enemy champions. On activation, he dashes in a direction.'
      },
      {
        name: '[R]-WORLD ENDER',
        manaCost: 0,
        description:
          'Aatrox unleashes his demonic form, fearing nearby enemy minions and gaining attack damage, increased healing, and Move Speed. If he gets a takedown, this effect is extended.'
      }
    ]
  },
  {
    name: 'Ahri',
    position: 'mid',
    type: 'mage',
    skills: [
      {
        name: '[Q]-ORB OF DECEPTION',

        manaCost: 60,

        description:
          'Ahri sends out and pulls back her orb, dealing magic damage on the way out and true damage on the way back.'
      },
      {
        name: '[W]-FOX-FIRE',

        manaCost: 25,

        description:
          'Ahri gains 40% bonus movement speed, decaying over 2 seconds and releases fox-fires that seek nearby enemies and deal magic damage.Enemies hit with multiple fox-fires take 30% damage from each additional fox-fire beyond the first. Deals double damage against minions below 20% health.'
      },
      {
        name: '[E]-CHARM',

        manaCost: 50,

        description:
          'Blows a kiss dealing magic damage and charms an enemy causing them to walk harmlessly towards Ahri and immediately stopping in-progress movement abilities.'
      },
      {
        name: '[R]-SPIRIT RUSH',

        manaCost: 100,

        description:
          "Nimbly dashes foward firing 3 essence bolts at nearby enemies (prioritizing champions) dealing magic damage.Can be cast up to 3 times within 15 seconds before going on cooldown. Consuming a champion's essence with Essence Theft while active extends the ability's recast duration by and up to 10 seconds and grants an additional recast, storing up to 3 recasts."
      }
    ]
  },
  {
    name: 'Akali',
    position: 'mid',
    type: 'assassin',
    skills: [
      {
        name: '[Q]-FIVE POINT STRIKE',

        manaCost: 130,

        description:
          'Slings kunai in an arc, dealing magic damage. Enemies at the tip are briefly slowed by 50%.'
      },
      {
        name: '[W]-TWILIGHT SHROUD',

        manaCost: 80,

        description:
          "Drops a smoke bomb, unleashing a spreading cover of smoke that obscures Akali from enemy vision and grants her Movement Speed, decaying over 2 seconds and increases her maximum Energy by 80.Entering or exiting obscured extends Shroud's duration by 3 seconds.While invisible, Akali is stealthed and cannot be selected by hostile spells or attacks, even if revealed - except turrets."
      },

      {
        name: '[E]-SHURIKEN FLIP',

        manaCost: 30,

        description:
          'Active: Flip backward and fire a shuriken forward, dealing magic damage and marking the first enemy or smoke cloud hit. Re-cast: Dash to the marked target, dealing the same damage.'
      },
      {
        name: '[R]-PERFECT EXECUTION',

        manaCost: 0,

        description:
          'Active: Two dashes: The first vaults over enemies, dealing magical damage.The second is a piercing thrust that executes, dealing magic damage based on missing health.'
      }
    ]
  },
  {
    name: 'AKSHAN',
    position: 'mid',
    type: 'assassin',
    skills: [
      {
        name: '[Q]-AVENGERANG',

        manaCost: 60,

        description:
          'Akshan throws a boomerang that will return dealing physical damage to enemies hit (both times), extending its range each time the boomerang hits an enemy, and briefly reveal them for 1 second. If the boomerang hits a champion, Akshan gains 40% Movement Speed decaying over 1 second. Avengerang deals less damage to non-champions.'
      },
      {
        name: '[W]-GOING ROGUE',

        manaCost: 40,

        description:
          "Passive: Enemy champions that kill Akshan's allies become Scoundrel for 60 seconds. When Akshan gets a takedown on a Scoundrel he gains 100 Gold, resurrects the slain allies, and removes all other Scoundrel. Active: Akshan becomes Camouflaged for 2 seconds, this duration will extend indefinitely while he is near a wall or in brush. Akshan also gains Movement Speed and mana regen (+12% missing) while moving toward Scoundrel. Akshan can recast Going Rogue to end Camouflage sooner."
      },
      {
        name: '[E]-HEROIC SWING',

        manaCost: 70,

        description:
          "First Cast: Akshan fires a grappling hook, attaching to the first terrain hit. If he is immobilized or grounded during this time, the hook will detach, ending Heroic Heroic Swing and put it on a cooldown. Second Cast: Akshan swings around the terrain in the direction of the cursor, repeatedly firing at the nearest enemy dealing physical damage each shot. He will prioritizes firing at enemy champions marked by Dirty  Dirty Fighting, and will not fire if he is channeling. Comeuppance. The swing will stop if he is immobilized, or hitting an enemy or terrain. Third Cast: Akshan dives off the rope, firing a final shot at the enemy. If his swing stopped before the third cast, he will still fire the final shot.Every champion takedown will refresh Heroic Heroic Swing's cooldown."
      },
      {
        name: '[R]-COMEUPPANCE',

        manaCost: 100,

        description:
          "Active: Akshan locks onto an enemy champion and begin overcharging his gun for up to 2.5 seconds, storing up bullets.Recast: Akshan can recast Comeuppance after 0.5 seconds, or it will recast after the channeling duration, firing the bullets each dealing physical damage increasing up to 300% (based on target's missing health), and applying stacks of Dirty Dirty Fighting.Comeuppance will execute minions. Each bullets damage is increased by (+0.5% per 1%) critical chance."
      }
    ]
  },
  {
    name: 'Alistar',
    position: 'support',
    type: 'tank',
    skills: [
      {
        name: '[Q]-PULVERIZE',

        manaCost: 65,

        description:
          'Active: Alistar smashes the ground, dealing magic damage and tossing nearby enemy units into the air for 1 second.'
      },
      {
        name: '[W]-HEADBUTT',

        manaCost: 65,

        description:
          'Active: Alistar rams into an enemy, dealing magic damage and knocking them back.'
      },
      {
        name: '[E]-TRAMPLE',

        manaCost: 50,

        description:
          'Active: Alistar tramples the ground, ignoring unit collision and dealing magic damage over 5 seconds to nearby enemies. Each pulse that damages at least one enemy champion grants Alistar a Trample stack. At 5 Trample stacks Alistar empowers his basic attack against an enemy champion to deal additional magic damage and stun for 1 second.'
      },
      {
        name: '[R]-UNBREAKABLE WILL',

        manaCost: 100,

        description:
          'Active: Alistar lets out a wild roar, removing all crowd-control effects on himself, and reducing incoming damage for 7 seconds.'
      }
    ]
  },
  {
    name: 'Amumu',
    position: 'jungler',
    type: 'tank',
    skills: [
      {
        name: '[Q]-BANDAGE TOSS',

        manaCost: 70,

        description:
          'Active: Amumu tosses up to 2 sticky bandages in a straight line. If it contacts an enemy, Amumu will pull himself to it, dealing magic damage and stunning the target for 1 second.'
      },
      {
        name: '[W]-DESPAIR',

        manaCost: 8,

        description:
          'Toggle: Amumu cries, refreshing Curse on nearby enemies and dealing magic damage each second.'
      },
      {
        name: '[E]-TANTRUM',

        manaCost: 35,

        description:
          'Passive: Amumu takes reduced damage from physical attacks, capped at 50%. Active: Amumu tantrums, dealing magic damage to surrounding units. Basic attacks that hit Amumu reduce the cooldown of Tantrum by 0.5 seconds.'
      },

      {
        name: '[R]-CURSE OF THE SAD MUMMY',

        manaCost: 100,

        description:
          'Active: Amumu entangles surrounding enemy units, dealing magic damage and applying Curse. Entangled enemies are stunned for 1.5 seconds and are stopped in the middle of their dashes.'
      }
    ]
  },
  {
    name: 'Anivia',
    position: 'mid',
    type: 'mage',
    skills: [
      {
        name: '[Q]-FLASH FROST',

        manaCost: 80,

        description:
          'Active: A massive chunk of ice flies toward target location, dealing magic damage. At the end of its range or if Anivia activates the spell again, the missile detonates, dealing magic damage in a small area and stunning enemies. Enemies damaged by Flash Frost are also slowed for 3 seconds.'
      },
      {
        name: '[W]-CRYSTALLIZE',

        manaCost: 70,

        description:
          'Active: Anivia condenses the moisture in the air into an impenetrable wall of ice to block the movement of all units. The wall lasts 5 seconds before it melts.'
      },
      {
        name: '[E]-FROSTBITE',

        manaCost: 50,

        description:
          'Active: Anivia blasts her target with a freezing wind, dealing magic damage. If the target has been slowed by Flash Frost or a fully formed Glacial Storm, they take double damage.'
      },
      {
        name: '[R]-GLACIAL STORM',

        manaCost: 60,

        description:
          "Toggle: Anivia calls forth a driving rain of ice and hail that increases in size over 1.5 seconds, dealing magic damage per second to targets, slowing their Movement Speed. When the Glacial Storm is fully formed, it slows targets' Movement Speed by an additional 50% and does 300% damage instead."
      }
    ]
  },
  {
    name: 'Annie',
    position: 'mid',
    type: 'mage',
    skills: [
      {
        name: '[Q]-DISINTEGRATE',

        manaCost: 60,

        description:
          '	Active: Annie shoots a mana infused fireball, dealing magic damage to her target. The mana cost is refunded if it kills the target.'
      },
      {
        name: '[W]-INCINERATE',

        manaCost: 90,

        description:
          'Active: Annie casts a cone of fire in front of her, dealing magic damage to all enemies in the area.'
      },
      {
        name: '[E]-MOLTEN SHIELD',

        manaCost: 20,

        description:
          'Active: Annie grants herself or an ally and Tibbers a shield for 3 seconds and Movement Speed decaying over 1.5 seconds. While the shield is active, enemies who basic attack it take magic damage.'
      },
      {
        name: '[R]-SUMMON: TIBBERS',

        manaCost: 100,

        description:
          'Active: Summons Tibbers, dealing magic damage to enemies in the target area. For the next 45 seconds, Tibbers burns nearby enemies as magic damage. Annie can control Tibbers by reactivating this ability. Tibbers enrages when: summoned; Annie stuns a Champion with Pyromania; and when Annie dies.Enrage: Tibbers gains 275% Attack Speed and 100% Movement Speed, decaying over 3 seconds.'
      }
    ]
  },
  {
    name: 'Aphelios',
    position: 'mid',
    type: 'mage',
    skills: [
      {
        name: '[Q]-DISINTEGRATE',

        manaCost: 60,

        description:
          '	Active: Annie shoots a mana infused fireball, dealing magic damage to her target. The mana cost is refunded if it kills the target.'
      },
      {
        name: '[W]-INCINERATE',

        manaCost: 90,

        description:
          'Active: Annie casts a cone of fire in front of her, dealing magic damage to all enemies in the area.'
      },
      {
        name: '[E]-MOLTEN SHIELD',

        manaCost: 20,

        description:
          'Active: Annie grants herself or an ally and Tibbers a shield for 3 seconds and Movement Speed decaying over 1.5 seconds. While the shield is active, enemies who basic attack it take magic damage.'
      },
      {
        name: '[R]-SUMMON: TIBBERS',

        manaCost: 100,

        description:
          'Active: Summons Tibbers, dealing magic damage to enemies in the target area. For the next 45 seconds, Tibbers burns nearby enemies as magic damage. Annie can control Tibbers by reactivating this ability. Tibbers enrages when: summoned; Annie stuns a Champion with Pyromania; and when Annie dies.Enrage: Tibbers gains 275% Attack Speed and 100% Movement Speed, decaying over 3 seconds.'
      }
    ]
  }
])


db.players.insertMany([
  {
    playerID:09,
    name: "Juan Ramirez",
    nickName: "JuanD",
    rank: "challenger",
    salary:45000,
    nationality: "France",
    position: "adc",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"02",
    kills:111,
    deaths:76,
    assists:432,
    championPool:"07"
  },
  {
    playerID:02,
    name: "Mario Lopez",
    nickName: "Mariano",
    rank: "diamond",
    salary:23700,
    nationality: "Sweden",
    position: "mid",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"02",
    kills:213,
    deaths:56,
    assists:432,
    championPool:"05"
  },
  {
    playerID:03,
    name: "Antonio Canales",
    nickName: "Rekles",
    rank: "master",
    salary:156000,
    nationality: "France",
    position: "adc",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"02",
    kills:453,
    deaths:196,
    assists:765,
    championPool:"07"
  },
  {
    playerID:04,
    name: "Luicas-jong",
    nickName: "xPEKE",
    rank: "gold",
    salary:233700,
    nationality: "Spain",
    position: "mid",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"01",
    kills:321,
    deaths:46,
    assists:432,
    championPool:"03"
  },
  {
    playerID:05,
    name: "Manolo Lama",
    nickName: "Cianide",
    rank: "master",
    salary:47800,
    nationality: "Sweden",
    position: "jungler",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"01",
    kills:433,
    deaths:123,
    assists:632,
    championPool:"07"
  },
  {
    playerID:06,
    name: "Carlos Latre",
    nickName: "soaz",
    rank: "diamond",
    salary:23210,
    nationality: "English",
    position: "support",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"01",
    kills:313,
    deaths:34,
    assists:1233,
    championPool:"05"
  },
  {
    playerID:07,
    name: "Juana de Arco",
    nickName: "Arcos",
    rank: "challenger",
    salary:65262,
    nationality: "Japan",
    position: "adc",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"02",
    kills:123,
    deaths:12,
    assists:23,
    championPool:"05"
  },
  {
    playerID:08,
    name: "Claro",
    nickName: "Forgiven",
    rank: "iron",
    salary:12123,
    nationality: "Spain",
    position: "adc",
    birthdate: new Date("1996/09/20"),
    region:"europe",
    team:"02",
    kills:232,
    deaths:71,
    assists:32,
    championPool:"08"
  }
])

db.teams.insertMany([
  {
    teamID:02,
    name: "Fnatic",
    coach: "Jakob YamatoCannon Mebdi",
    region: "europe",
    playingCurrently:true,
    headquarters: "London",
  }
])	


/*{
  _id: "$rank",
  count:{
    $sum:1
  }
}
*/