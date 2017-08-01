import React from 'react';

const items = [{
  name: 'First Order',
  src: 'first-order.jpg',
  color: '#792226',
  description: (
    <content>
      <p>
        {"The First Order, simply referred to as the Order, was a political and military faction—ruled by Supreme Leader Snoke and allied with the Knights of Ren—that came into existence as a result of the fall of the Galactic Empire. In the aftermath of the Battle of Jakku, the Empire formally surrendered to the New Republic by signing the Galactic Concordance, a peace treaty that marked the end of the Galactic Civil War in 5 ABY. In spite of its collapse the Empire's legacy survived in the Unknown Regions of the galaxy where former members of the Imperial Military plotted their return to power. Their cause would grow in support through some Imperial sympathizers who briefly inhabited a wing of Republic politics before abandoning the nascent democracy to join the Imperial-based movement in the Unknown Regions. Inspired by the fascist ideals of the Empire, this movement ultimately resulted in the formation of the First Order."}
      </p>

      <p>
        {"In the decades that followed the Empire's defeat, the First Order gradually built its strength through the secret mobilization of new fleets and armies in violation of the Galactic Concordance and Republic law. Despite further acts of defiance to the treaty, the Galactic Senate did not regard the First Order as a serious threat to the Republic. However, the Senate's inaction motivated the Rebel veteran Princess Leia Organa to found the Resistance. Although the First Order became entangled in a conflict with Organa's group, the Republic remained its primary target. After thirty years of plotting their revenge against the government that overthrew the Empire, the First Order test-fired the superweapon of Starkiller Base on the Hosnian system and thereby destroyed Hosnian Prime, the capital world of the Republic. Shortly thereafter, the Resistance launched a counterattack that resulted in the base's destruction."}
      </p>
    </content>
  ),
}, {
  name: 'Palpatine',
  src: 'emporer.jpg',
  color: '#387089',
  description: (
    <content>
      <p>
        {'Palpatine, also known as Darth Sidious, was a Force-sensitive Human male who served as the last Supreme Chancellor of the Galactic Republic and the first Emperor of the Galactic Empire. A Dark Lord of the Sith in the Order of the Sith Lords, recorded by history as the most powerful who had ever lived, his entire life was the culmination of a thousand-year plan to overthrow the Republic and the Jedi Order from within.'}
      </p>

      <p>
        {"Born in 82 BBY on the planet Naboo to the aristocratic House Palpatine, Palpatine discovered the Sith at a young age as a collector of dark side artifacts. In 65 BBY, he met Hego Damask, a Muun businessman who was in reality the Sith Lord Darth Plagueis. Under Plagueis's manipulation, Palpatine killed his father and pledged himself to his new Master's dark side teachings as Darth Sidious. Palpatine lived a double life for many years, serving an untarnished career as Naboo's ambassador in the Galactic Senate while learning from his master and training a young Zabrak as the Sith assassin Darth Maul. Plagueis and Sidious, both exceptionally skilled and powerful in the Force, were able to conceal their identities from the Jedi for decades. As Plagueis privately searched for the key to eternal life, Sidious manipulated galactic politics, culminating in the blockade of Naboo by the Trade Federation. In the wake of the political crisis, the Galactic Senate voted to elect him as Supreme Chancellor, and around the same time, in accordance with Bane's Rule of Two, Palpatine murdered Plagueis and usurped the role of Sith Master."}
      </p>
    </content>
  ),
}, {
  name: 'Darth Maul',
  src: 'darth-maul.jpg',
  color: '#ae7b5c',
  description: (
    <content>
      <p>
        {'Maul was a Dathomirian Zabrak male who lived during the last days of the Galactic Republic and the reign of the Galactic Empire. Maul, the son of Mother Talzin of the Nightsisters, was taken as the Sith apprentice of Darth Sidious, the Dark Lord of the Sith, and given the name Darth Maul. After revealing the existence of the Sith to the Jedi Order, Maul fell in a lightsaber duel against Obi-Wan Kenobi during the Battle of Naboo. Over a decade later, he returned from exile and formed the criminal army known as the Shadow Collective, intent on reclaiming the power he had lost. His quest for revenge against Kenobi and the Sith continued into the Imperial age, bringing him into conflict with the early rebellion against the Empire.'}
      </p>

      <p>
        {"As a Sith Lord, Maul believed it was his destiny to rule the galaxy and bring about the end of the Jedi and the Republic. After the Battle of Naboo, that destiny was taken by Count Dooku, a former Jedi Master who became Sidious' new apprentice. The Sith's war to destroy the Republic began without Maul, as the Clone Wars raged across the galaxy, but Maul returned during the conflict and brought the Shadow Collective together to destroy his enemies and regain what he had lost. He led the takeover of the planet Mandalore with the help of his allies, the Mandalorian splinter group Death Watch, and killed Duchess Satine Kryze as part of his revenge against Kenobi, as she was an old friend and romantic interest of the venerable Jedi Master. Maul was captured and imprisoned by Sidious soon thereafter, who used his former apprentice as part of a plot to eliminate Mother Talzin, whom Sidious considered a threat to his future rule of the galaxy."}
      </p>
    </content>
  ),
}, {
  name: 'Boba Fett',
  src: 'boba-fett.jpg',
  color: '#afae8f',
  description: (
    <content>
      <p>
        {"Boba Fett was a male human bounty hunter, and the genetic clone of infamous bounty hunter Jango Fett. Boba was created by the cloners on Kamino and was physically identical to the clone troopers created for the Grand Army of the Republic, though Boba was unaltered and did not grow at the same accelerated rate as the other clones. Raised as Jango's son, Boba learned the combat skills necessary to one day become a bounty hunter in his own right."}
      </p>

      <p>
        {'Jango was killed during the Battle of Geonosis, which sparked the Clone Wars between the Galactic Republic and the Confederacy of Independent Systems. The young boy swore vengeance against Jedi Master Mace Windu, who killed Jango, and teamed with a group of bounty hunters that included Aurra Sing and Bossk. Their plot to kill Windu failed, and Boba realized that he had gone too far in trying to kill the Jedi Master—but he vowed never to forgive Windu. After serving a brief prison sentence, Boba formed a team of bounty hunters and took on a number of missions.'}
      </p>
    </content>
  ),
}, {
  name: 'Kylo Ren',
  src: 'ben.jpeg',
  color: '#6a686d',
  description: (
    <content>
      <p>
        {"Kylo Ren, a human male, was a Force warrior and a former Jedi trainee under his uncle, Jedi Master Luke Skywalker, before Ren destroyed Skywalker's attempt to restore the Jedi Order and became an apprentice of Supreme Leader Snoke of the First Order. Given the name Ben Solo, he was born in 5 ABY, one year after the Battle of Endor, on the planet Chandrila to Princess Leia Organa and General Han Solo, whose busy lives left Ben with feelings of abandonment. This was exploited by the Supreme Leader, who tempted him to the dark side of the Force. Though Organa hoped training with Skywalker would help her son, he was seduced to the dark side, destroyed his fellow Jedi students, and became one of the Knights of Ren, earning the moniker of 'Jedi Killer' amongst the First Order ranks. He idolized his grandfather, the fallen Sith Lord Darth Vader, and hoped to finish what Vader started: the elimination of the Jedi. As a member of the First Order, Ren represented its mystical side and was able to command the First Order's armies, leading to a tense competition between Ren and First Order officers, such as General Armitage Hux."}
      </p>

      <p>
        {"After Ren's fall, Skywalker vanished into exile to search for the first Jedi Temple. Years later, the First Order recovered part of a map to Ahch-To, where the temple was found, in the archives of the Galactic Empire. They learned that Lor San Tekka, a member of the Church of the Force on the planet Jakku, had the rest of the map fragment, so Ren commanded the First Order forces in search of the map. The map fell into the hands of the Resistance, as Organa, the leader of the small military opposition to the First Order, hoped to find her twin brother and bring him back into the fight against the dark side. Ren hunted the map across the galaxy and eventually learned that it and the droid who carried it, BB-8, had come into Solo's possession. He tracked them to Takodana, where Ren discovered Rey, a Force-sensitive who had seen the map and was helping BB-8. Ren brought Rey to Starkiller Base, a First Order-controlled planet with a built-in superweapon, and attempted to probe her mind for the map's information, but she resisted and eventually managed to escape. Shortly after, the Resistance attacked Starkiller Base in the hopes of destroying it, and Ren encountered Solo once again. After a brief confrontation, he killed his father, hoping to eliminate the light that Ren struggled with inside himself. Ren then pursued Rey and the fugitive stormtrooper Finn into a forest as the battle raged on above. He engaged both in a lightsaber duel, besting Finn before being beaten and injured by Rey. As Starkiller Base began to implode from the attack, the Supreme Leader ordered General Hux to bring Ren before him so his training could be completed."}
      </p>
    </content>
  ),
}, {
  name: 'Captain Phasma',
  src: 'phasma.jpg',
  color: '#233d4a',
  description: (
    <content>
      <p>
        {"Phasma was a human female stormtrooper Captain of the First Order. She served as part of the unofficial commanding triumvirate for the First Order and their Starkiller Base operation, taking charge of the command of the First Order's stormtrooper soldiers. During the First Order–Resistance conflict, which took place 30 years after the Battle of Endor, Phasma served alongside the dark enforcer Kylo Ren and General Armitage Hux in their efforts against the Resistance."}
      </p>

      <p>
        {"Under orders from the Supreme Leader of the First Order, Snoke, the triumvirate searched for a galaxy map that would lead to the last of the Jedi, Luke Skywalker, on the planet Jakku. After the sacking of the village Tuanul, Phasma and her stormtroopers killed the survivors under orders from Ren. Afterward, FN-2187, one of her division's stormtroopers, had an awakening that led to him betraying the First Order, despite Phasma's efforts at reconditioning him. The First Order eventually decided on unleashing their Starkiller superweapon, an event which led to the destruction of the Hosnian system, where the New Republic's capital was located, for which Phasma was present."}
      </p>
    </content>
  ),
}];

export default items;
