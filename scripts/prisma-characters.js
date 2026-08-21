(() => {
  const characters = [
    { id: 301, no: 21, name: "アルス", job: "勇者", profile: "滅びた故郷の焦土を胸に、深淵への復讐を誓った流れ者。仲間との旅が、その剣を変えていく。", x: 2, y: 2 },
    { id: 302, no: 22, name: "フリーダ", job: "竜騎士", profile: "幼い頃から竜と魂を分かち合い、空を駆けてきた歴戦の竜騎士。豪胆な姉御肌で、リンを妹のように気にかける。", x: 3, y: 2 },
    { id: 303, no: 23, name: "リーシア", job: "星詠師", profile: "古代から生きる伝説級の魔導師。アランやリュウに魔道の基礎を授け、今も静かに世界の理を見つめている。", x: 4, y: 2 },
    { id: 304, no: 24, name: "クロード", job: "聖拳士", profile: "幼馴染のレオンに救われた過去を持つ武人。救えなかった命への悔いを胸に、己の拳を振るう。", x: 5, y: 2 },
    { id: 305, no: 25, name: "レオン", job: "聖騎士", profile: "クロードの幼馴染であり、レイラが師と仰ぐ王国最高峰の騎士。厳格な秩序ではなく、温かな正義を守ろうとする。", x: 6, y: 2 },
    { id: 306, no: 26, name: "シャニー", job: "忍者", profile: "ある契約を背負い、魔王城に身を置く寡黙な忍び。冷たい刃の奥で、故郷と大切な者への想いを捨てきれずにいる。", x: 7, y: 2 },
    { id: 101, no: 1, name: "ジョセフ", job: "戦士", profile: "かつて王国軍の精鋭として民を守った歴戦の戦士。守れなかった村の灰を背負い、それでも若者たちの前に立つ。", x: 0, y: 0 },
    { id: 102, no: 2, name: "マリー", job: "僧侶", profile: "修道院を失い、光を拒むために祈り続ける僧侶。幼馴染のミネルバとは、救いへ至る別々の道を選んだ。", x: 1, y: 0 },
    { id: 103, no: 3, name: "ゼリード", job: "斥候", profile: "奪うことでしか生きられなかった盗賊。かつて見逃された屈辱を抱え、契約も功績も鼻で笑う。", x: 2, y: 0 },
    { id: 104, no: 4, name: "ケイト", job: "魔法使い", profile: "ソフィアに育てられた気弱な少年魔法使い。師の背後から一歩踏み出し、自分の意志で戦う強さを探している。", x: 3, y: 0 },
    { id: 105, no: 5, name: "シャオ", job: "武闘家", profile: "炎の里で己を鍛え続ける拳士。ある人への怒りと自分の弱さを拳に込め、強さの答えを追う。", x: 4, y: 0 },
    { id: 106, no: 6, name: "エリーゼ", job: "踊り子", profile: "大人たちが消えた風の集落で、子どもたちのために笑い続けた踊り子。明るい笑顔の奥に、深い不安と喪失を隠す。", x: 5, y: 0 },
    { id: 107, no: 7, name: "リュウ", job: "武闘家", profile: "伯爵家の跡取りという身分を捨て、守るための拳を選んだ求道者。寡黙な一撃に、揺るがぬ意志を宿す。", x: 6, y: 0 },
    { id: 108, no: 8, name: "アリサ", job: "斥候", profile: "焼けた村から逃れ、野盗として生き延びた少女。ハイネに拾われてからは、生きる技を守る力へ変えようとしている。", x: 7, y: 0 },
    { id: 109, no: 9, name: "ガイル", job: "戦士", profile: "始まりの村で育った快活な若者。アルスへの憧れを胸に、幼馴染のサラと初めて村の外へ踏み出す。", x: 8, y: 0 },
    { id: 110, no: 10, name: "サラ", job: "僧侶", profile: "始まりの村で人々を癒してきた祈り手。アルスを希望として敬いながら、無茶ばかりのガイルを静かに気にかける。", x: 0, y: 1 },
    { id: 201, no: 11, name: "アラン", job: "魔法剣士", profile: "誇りだけを残して没落した貴族の魔法剣士。幼馴染クロードへの嫉妬を越え、自分の名で立ち上がろうとする。", x: 1, y: 1 },
    { id: 202, no: 12, name: "ソフィア", job: "賢者", profile: "ケイトの師であり、生と死の境界さえ研究する賢者。皮肉な微笑みの裏で、弟子と街の人々を誰より気にかける。", x: 2, y: 1 },
    { id: 203, no: 13, name: "ハヤテ", job: "忍者", profile: "かつてアランの父に仕え、今も彼を影から守り続ける忍。リンとの出会いが、凍てついた心を少しずつほどいていく。", x: 3, y: 1 },
    { id: 204, no: 14, name: "レイラ", job: "聖騎士", profile: "レオンを師と仰ぎ、王国の正義を信じてきた若き聖騎士。光の宮殿で見たものが、その信念を大きく揺らす。", x: 4, y: 1 },
    { id: 205, no: 15, name: "バロン", job: "剣闘士", profile: "傭兵団を率い、ジョセフと肩を並べて民を守った歴戦の戦士。戦場を英雄譚ではなく、生きて帰るための場所として知る。", x: 5, y: 1 },
    { id: 206, no: 16, name: "ミネルバ", job: "賢者", profile: "祈りではなく証明を選んだ、マリーの幼馴染。魔導と錬金を究め、六属性の外にある謎へ手を伸ばす。", x: 6, y: 1 },
    { id: 207, no: 17, name: "ハイネ", job: "侍", profile: "義を重んじる剣豪で、アリサに生きるための技を授けた師。酒席ではフリーダと肩を並べる、静かな頼もしさを持つ。", x: 7, y: 1 },
    { id: 208, no: 18, name: "リン", job: "剣闘士", profile: "フリーダを姉のように慕う、天真爛漫な剣士。レイラの親友であり、ハヤテの冷えた心にも無邪気な光を届ける。", x: 8, y: 1 },
    { id: 209, no: 19, name: "シルビア", job: "エンターテイナー", profile: "華やかな舞台に立ちながら、ジョセフと語られぬ「あの日」を共有する表現者。幕が下りた後の瞳は、遠い過去を見つめている。", x: 0, y: 2 },
    { id: 210, no: 20, name: "カリン", job: "侍", profile: "敵を屠るより、凶刃を止めるために剣を振るう女侍。幼い日の敗北を胸に、不殺の剣を研ぎ続ける。", x: 1, y: 2 }
  ];

  const selector = document.querySelector("#character-selector");
  const art = document.querySelector("#character-art");
  const number = document.querySelector("#character-number");
  const job = document.querySelector("#character-job");
  const name = document.querySelector("#character-name");
  const profile = document.querySelector("#character-profile");

  if (!selector || !art || !number || !job || !name || !profile) return;

  const imagePath = (character) => `./assets/prisma-character-lineup/char-${character.id}.webp`;

  const selectCharacter = (character, button) => {
    selector.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    art.classList.add("is-changing");
    art.onload = () => art.classList.remove("is-changing");
    art.onerror = () => art.classList.remove("is-changing");
    art.alt = `${character.name}の立ち絵`;
    art.src = imagePath(character);
    number.textContent = `NO. ${String(character.no).padStart(2, "0")}`;
    job.textContent = character.job;
    name.textContent = character.name;
    profile.textContent = character.profile;
  };

  characters.forEach((character, index) => {
    const item = document.createElement("div");
    item.setAttribute("role", "listitem");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "prisma-cast__face";
    button.style.setProperty("--face-x", character.x);
    button.style.setProperty("--face-y", character.y);
    button.setAttribute("aria-label", `${character.name}、${character.job}`);
    button.setAttribute("aria-pressed", String(index === 0));
    button.innerHTML = `<span>${character.name}</span>`;
    button.addEventListener("click", () => selectCharacter(character, button));
    button.addEventListener("pointerenter", () => {
      const preload = new Image();
      preload.src = imagePath(character);
    }, { once: true });
    button.addEventListener("focus", () => {
      const preload = new Image();
      preload.src = imagePath(character);
    }, { once: true });

    item.append(button);
    selector.append(item);
  });

  art.alt = "アルスの立ち絵";
})();
