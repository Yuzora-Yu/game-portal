(() => {
  const characters = [
    { id: 301, no: 21, name: "アルス", job: "勇者", profile: "故郷を深淵の災厄で失った寡黙な剣士。復讐から始まった旅の中で、誰かを守るために剣を振るう道を選んでいく。", x: 2, y: 2 },
    { id: 403, label: "STORY CHARACTER", name: "ルーナ", job: "祈り手", profile: "山奥の村でアルスと共に育った、明るく心優しい少女。光神の祠に花を供え、危機の中でも誰かを助けようと手を伸ばす。", art: "./assets/game-pages/GAME01_prisma-abyss/prisma-character-lineup/luna-403.webp", face: "./assets/game-pages/GAME01_prisma-abyss/prisma-character-lineup/luna-403-face.webp" },
    { id: 302, no: 22, name: "フリーダ", job: "竜騎士", profile: "竜と共に空を駆けてきた歴戦の竜騎士。傷を負っても豪胆さを失わず、仲間を前へ送り出す姉御肌。", x: 3, y: 2 },
    { id: 303, no: 23, name: "リーシア", job: "星詠師", profile: "長い時を生き、古い記録と魔術に通じる伝説級の魔導師。見過ごした謎を放っておけず、自分の目で確かめるため旅に加わる。", x: 4, y: 2 },
    { id: 304, no: 24, name: "クロード", job: "聖拳士", profile: "人を守るため真っ先に前へ出る聖拳士。届かなかった拳への悔いを抱えながら、次こそは救うために立ち上がる。", x: 5, y: 2 },
    { id: 305, no: 25, name: "レオン", job: "聖騎士", profile: "秩序と責任を重んじる聖騎士。厳しい言葉の奥に民を守る意志を持ち、恐れを抱えた者の隣でも盾を構える。", x: 6, y: 2 },
    { id: 306, no: 26, name: "シャニー", job: "忍者", profile: "深淵の瘴気と契約を背負う寡黙な忍。自分を道具のように扱いながらも、故郷と大切な人への想いまでは捨てていない。", x: 7, y: 2 },
    { id: 101, no: 1, name: "ジョセフ", job: "戦士", profile: "かつて『不倒の城壁』と呼ばれた歴戦の戦士。綺麗事では済まない戦場を知り、それでも若者だけに重荷を背負わせまいと前に立つ。", x: 0, y: 0 },
    { id: 102, no: 2, name: "マリー", job: "僧侶", profile: "失った修道院の記憶を抱えて歩く僧侶。祈りを言い訳にはせず、傷ついた人を目の前にすれば静かに立ちはだかる。", x: 1, y: 0 },
    { id: 103, no: 3, name: "ゼリード", job: "斥候", profile: "奪うことで生き延びてきた、皮肉屋の斥候。過去の負い目から目をそらしながらも、消された事実を拾い直そうとする。", x: 2, y: 0 },
    { id: 104, no: 4, name: "ケイト", job: "魔法使い", profile: "ソフィアに師事する気弱な少年魔法使い。怖さを隠さず、それでも師の背後から一歩踏み出す未完の才能。", x: 3, y: 0 },
    { id: 105, no: 5, name: "シャオ", job: "武闘家", profile: "炎の里で己を鍛え続ける拳士。大切な人への怒りと守れなかった悔しさを抱え、拳を向ける先を自分で選び直していく。", x: 4, y: 0 },
    { id: 106, no: 6, name: "エリーゼ", job: "踊り子", profile: "風の集落で子どもたちの前に立ち、笑顔を絶やさなかった踊り子。暮らしを運ぶ風を信じ、怖さを抱えたまま歩き出す。", x: 5, y: 0 },
    { id: 107, no: 7, name: "リュウ", job: "武闘家", profile: "言葉より先に拳を構える寡黙な武闘家。余計な飾りを嫌い、守ると決めたもののためなら迷わず危険へ踏み込む。", x: 6, y: 0 },
    { id: 108, no: 8, name: "アリサ", job: "斥候", profile: "素早さと勘で危機を切り抜ける、ぶっきらぼうな斥候。ハイネに教わった技を、逃げ延びるためだけでなく誰かを守るために使う。", x: 7, y: 0 },
    { id: 109, no: 9, name: "ガイル", job: "戦士", profile: "始まりの村から飛び出した快活な戦士。怖い時ほど笑って前へ出るが、仲間を置いて走ることはない。", x: 8, y: 0 },
    { id: 110, no: 10, name: "サラ", job: "僧侶", profile: "始まりの村で人々を癒してきた祈り手。穏やかな言葉と確かな手当てで、無茶をする仲間を日常へ連れ戻す。", x: 0, y: 1 },
    { id: 201, no: 11, name: "アラン", job: "魔法剣士", profile: "没落した家名と誇りを背負う魔法剣士。誰かの評価ではなく、自分の名と選択で立つためにもがき続ける。", x: 1, y: 1 },
    { id: 202, no: 12, name: "ソフィア", job: "賢者", profile: "未知の謎を前にすると目を輝かせる皮肉屋の賢者。鋭い言葉とは裏腹に、弟子と街の人々を巻き込む危険には誰より慎重。", x: 2, y: 1 },
    { id: 203, no: 13, name: "ハヤテ", job: "忍者", profile: "消された過去の痕跡を静かに追う忍。感情を言葉にすることは少ないが、失われたものを無かったことにはさせない。", x: 3, y: 1 },
    { id: 204, no: 14, name: "レイラ", job: "聖騎士", profile: "王国の正義を信じ、鍛錬を重ねてきた若き聖騎士。命令と自分の目で見たものが食い違う時も、選ぶことから逃げない。", x: 4, y: 1 },
    { id: 205, no: 15, name: "バロン", job: "剣闘士", profile: "傭兵団を率いて数多の戦場を生き抜いた戦士。勝つことより全員で帰ることを見据え、退路を作ってから剣を抜く。", x: 5, y: 1 },
    { id: 206, no: 16, name: "ミネルバ", job: "賢者", profile: "結晶樹の根元で六つの力を調べる研究者。ひとつに混ぜるのではなく、違う色のまま共に巡る方法を探している。", x: 6, y: 1 },
    { id: 207, no: 17, name: "ハイネ", job: "侍", profile: "筋を通し、自分の目で人を見定める剣士。アリサの師として、過去を無理に語らせず歩ける道を示す。", x: 7, y: 1 },
    { id: 208, no: 18, name: "リン", job: "剣闘士", profile: "まっすぐな刃と負けん気を持つ剣士。迷いを隠して強がるより、確かめるために剣を取り、信じた相手へ背中を預ける。", x: 8, y: 1 },
    { id: 209, no: 19, name: "シルビア", job: "エンターテイナー", profile: "華やかな舞台に立ちながら、槍を手に街道へも出る表現者。守るだけでは届かない場所へ、自分の足で進もうとする。", x: 0, y: 2 },
    { id: 210, no: 20, name: "カリン", job: "侍", profile: "敵を斬り伏せるより、凶刃を止めるために剣を振るう侍。不殺の誓いを甘さと笑われても、守るための一太刀を磨き続ける。", x: 1, y: 2 }
  ];

  const selector = document.querySelector("#character-selector");
  const art = document.querySelector("#character-art");
  const number = document.querySelector("#character-number");
  const job = document.querySelector("#character-job");
  const name = document.querySelector("#character-name");
  const profile = document.querySelector("#character-profile");

  if (!selector || !art || !number || !job || !name || !profile) return;

  const imagePath = (character) => character.art || `./assets/game-pages/GAME01_prisma-abyss/prisma-character-lineup/char-${character.id}.webp`;

  const centerSelectedFace = (button) => {
    if (!window.matchMedia("(max-width: 1280px)").matches) return;
    const left = button.offsetLeft - ((selector.clientWidth - button.offsetWidth) / 2);
    selector.scrollTo({ left, behavior: "smooth" });
  };

  const selectCharacter = (character, button) => {
    selector.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    art.classList.add("is-changing");
    art.classList.toggle("is-portrait", Boolean(character.portrait));
    art.onload = () => art.classList.remove("is-changing");
    art.onerror = () => art.classList.remove("is-changing");
    art.alt = `${character.name}の立ち絵`;
    art.src = imagePath(character);
    number.textContent = character.label || `NO. ${String(character.no).padStart(2, "0")}`;
    job.textContent = character.job;
    name.textContent = character.name;
    profile.textContent = character.profile;
    centerSelectedFace(button);
  };

  characters.forEach((character, index) => {
    const item = document.createElement("div");
    item.setAttribute("role", "listitem");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "prisma-cast__face";
    button.style.setProperty("--face-x", character.x);
    button.style.setProperty("--face-y", character.y);
    if (character.face) {
      button.classList.add("prisma-cast__face--image");
      button.style.setProperty("--face-image", `url("${character.face}")`);
    }
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

  const more = document.createElement("div");
  more.className = "prisma-cast__more";
  more.setAttribute("role", "listitem");
  more.innerHTML = "<p><strong>AND MORE…</strong><span>旅の先で出会う人々</span></p>";
  selector.append(more);

  art.alt = "アルスの立ち絵";
})();
