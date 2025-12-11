"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Posts", [
      {
        userId: 1,
        titleId: 1,
        title: "Well, if you're here for a relatable mean girl...",
        content:
          "Well, if you're here for a relatable mean girl, then this manhwa is exactly what you need. The main character initially appears to be the cliché antagonist, but as the story progresses, we start seeing layers of complexity and subtle vulnerability. Her 'mean' facade is clearly a defense mechanism built up from past trauma and societal pressure within the noble family. It's truly compelling to watch her navigate court politics while slowly learning to trust and opening up to others. The development is slow, but incredibly rewarding. I highly recommend sticking with it past the first ten chapters for the full emotional payoff. The artwork is stunning and adds so much depth to the atmosphere.",
        tags: "#manga #history #romance",
        likes: 34,
        comments: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: 1,
        title: "Why villains are always more interesting",
        content:
          "Good characters don't struggle enough, and their motivations are often too simplistic and black-and-white. In contrast, the best antagonists usually have complex, morally ambiguous backstories that explain their descent into darkness. Their methods might be cruel, but their twisted goals often stem from a deeply human place: betrayal, loss, or a desire for radical change. We explore deeper philosophical questions when we analyze a villain's motives. Writers should invest more in developing villains who act not out of pure malice, but out of a desperate, understandable, albeit misguided, necessity. That's why I find myself rooting for the bad guys half the time. Share your favorite morally gray villains below, I need more recommendations!",
        tags: "",
        likes: 122,
        comments: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 2,
        title: "Anya supremacy",
        content:
          "Twilight is the best spy, Yor is the perfect assassin, but let's be honest—Anya Forger runs the show! Her telepathy and hilarious reactions to high-stakes spy missions are what truly makes Spy x Family shine. The way she tries to navigate her foster parents' secret lives, misunderstanding complex adult situations and constantly trying to maintain the 'family' facade, is pure gold. She brings genuine warmth and absurd comedy to every single panel. No matter how serious the mission gets, Anya’s adorable antics always steal the spotlight and elevate the manga from a simple action-comedy to a heartwarming family tale. Plus, her peanut obsession is the best running gag that always makes me smile!",
        tags: "#anime #comedy",
        likes: 51,
        comments: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        titleId: 3,
        title: "Time for Revenge!",
        content:
          "Incredible plot! Aria demonstrates simply fantastic character development, transforming from a pitiful victim into a brilliant strategist. I read it in one breath, unable to tear myself away until morning. I recommend it to anyone who loves strong female protagonists and complex intrigues where every action has significant consequences. This isn't just a story about revenge, but a deep analysis of politics and power. The pacing is fantastic, constantly keeping you on the edge of your seat. I hope the eventual adaptation captures its entire depth.",
        tags: "#revenge #time_travel",
        likes: 78,
        comments: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: 4,
        title: "Athanasia is My Love",
        content:
          "The artwork is simply a masterpiece! Every gown, every palace, every detail is drawn with incredible attention. The father-daughter relationship brings tears to my eyes, especially after Claude starts remembering Athanasia. This is a genre classic that every Otome fan should read. I eagerly await new chapters, as the ending promises to be very emotional and satisfying. Can anyone recommend something similar that focuses on this kind of powerful paternal love? It truly warms the heart!",
        tags: "#fantasy #royal",
        likes: 154,
        comments: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 4,
        title: "A Heartwarming Story",
        content:
          "This is so sweet! Finally, the prince and princess find common ground despite all the obstacles and political schemes trying to separate them. It's perfect for an evening read when you just want to relax and enjoy a good plot. No unnecessary drama, just pure romance and lots of cute moments that make you smile. In my opinion, this is one of the most underrated titles in the genre! Share your favorite touching scenes in the comments below!",
        tags: "#cute #romance",
        likes: 90,
        comments: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        titleId: 5,
        title: "Geniunely Well-Thought-Out Plot",
        content:
          "Raeliana is a true strategist! The dialogues between her and Noah are so witty and full of subtext that it's impossible to look away. This is one of the best manhwas in my collection. Plus, there's an excellent detective storyline where you constantly try to figure out who is behind all the conspiracies. This is a case where the heroine isn't just beautiful, but incredibly smart. Her ability to escape any situation is admirable, especially in critical situations where she must maintain her composure and cunning façade. A must-read for fans of smart protagonists.",
        tags: "#mystery #genius",
        likes: 210,
        comments: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: 5,
        title: "Noah Wynknight is a Crush!",
        content:
          "The cold Duke who melts for Raeliana. Can one ask for anything more? This is the perfect example of a contract turning into real feelings, but not in a cliché way. Watching their 'battles' of wits is pure pleasure. Definitely top-tier! If you like manhwas where the male lead is intelligent and passionate, this is for you. And his moments of jealousy are just a separate kind of art that adds so much comic relief to the tension. I highly recommend everyone check out the latest chapters!",
        tags: "#duke #contract_marriage",
        likes: 65,
        comments: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 6,
        title: "Sudden Princess",
        content:
          "Light and engaging fantasy. I love how the main character uses her knowledge from her past life to improve her family's fate. The plot develops quickly and never gets boring, constantly presenting new challenges and funny situations. This is an excellent example of 'reincarnation' where the heroine doesn't just get a second chance, but actively uses it to achieve her goals and secure her future. Perfect for a relaxing read on the weekend, especially when you need a positive vibe and some magic in your life.",
        tags: "#fantasy #rebirth",
        likes: 45,
        comments: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        titleId: 6,
        title: "Must Read for Isekai Fans!",
        content:
          "I couldn't stop! The plot development is very dynamic; there wasn't a single dull moment. I adore stories about transmigrators, especially when they immediately gain power or unique knowledge. 10/10! I recommend this to anyone looking for a manhwa with a strong female lead and elements of magic. The romantic line here is also very gentle and gradual, creating a wonderful balance between action, comedy, and romance. A true masterpiece in the Isekai genre!",
        tags: "#isekai #adventure",
        likes: 115,
        comments: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: 7,
        title: "Pure Cuteness!",
        content:
          "This is the perfect manhwa for 'healing' the soul. The relationships between the characters are so touching and warm that you just want to hug them! I recommend it if you are tired of intrigues and want positivity, without unnecessary suffering. The plot focuses on restoring family ties and emotional healing, not on a struggle for the throne. This is a true 'slice of life' in a fantasy world. A must-read when you're feeling down and need kindness and heartwarming moments to lift your spirits.",
        tags: "#family #healing",
        likes: 188,
        comments: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 7,
        title: "Fantastic Magic and Friendship",
        content:
          "The magic system is very detailed and well-developed, and the scenes of the main character's friendship with the other children are simply charming. Such high-quality work is rare to find. I especially liked how the author depicted the process of learning magic and its use in everyday life. This adds realism to the fairy-tale world. I am thrilled with every new chapter! It's a genuine example of high-quality fantasy world-building, focusing on growth and bonds.",
        tags: "#magic #friendship",
        likes: 55,
        comments: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        titleId: 3,
        title: "A True Masterpiece of Revenge",
        content:
          "After the reversal of time, she becomes so resolute! Every step she takes is calculated, and she never repeats her past mistakes. It's a pleasure to watch her defeat her enemies and restore justice. Bravo to the author for such a strong and unbreakable female character! This manhwa keeps you in suspense until the last page, forcing you to analyze every detail of the heroine's plan. I couldn't tear myself away from reading this brilliant political drama.",
        tags: "#revenge #strong_female",
        likes: 140,
        comments: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: 4,
        title: "This is simply Perfect!",
        content:
          "I can't get enough of these drawings. Although the story starts tragically, it quickly shifts into something very bright and good, focusing on emotional connection. I don't regret a single minute spent reading about their happiness. Definitely one of the best works in recent years, evoking the warmest feelings. Be sure to leave a comment if you also adore this manhwa! It's so cute that it's simply irresistible and heals your inner child.",
        tags: "#heartwarming",
        likes: 87,
        comments: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 5,
        title: "The Best 'Fake' Marriage Story",
        content:
          "This is pure gold! The tension between the characters, their clever games, and the constant battle of wits are top-notch. If you are looking for a manhwa with smart characters where you don't know who to trust, this is your choice. Their 'contractual' marriage turns into something much more, and this process of emotional revelation is perfectly shown. Don't miss this story; it's worth your time, especially thanks to the intelligent and witty female lead and the handsome Duke!",
        tags: "#smart_plot",
        likes: 160,
        comments: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
