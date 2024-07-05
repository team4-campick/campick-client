const videoData = [
  {
    title: "5성급숲속캠핑장⛺️",
    description:
      "#휘게포레스트 #캠핑 #평창 #계방산 #숲속캠핑 #힐링 #추천 #일상 #벤네비스 #벤네비스옵저버 #쉘터 #🌿 #⛺️ #텐트 #부부캠핑",
    user: "ddong1209",
    url: "https://www.tiktok.com/@ddong1209/video/7145423684981820673?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 1",
    videoFileName: "Download 1",
  },
  {
    title: "Camping",
    description:
      "#camping #youtube #adventurelife #camp #ASMR #캠핑 #차박 #유튜브 #생활모험가 #캠핑하루 #jeep #wrangler #korea #adventure #vanlife #여행",
    user: "camping_haru",
    url: "https://www.tiktok.com/@camping_haru/video/7057107870533438722?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 2",
    videoFileName: "Download 2",
  },
  {
    title: "동해 바다 🌊",
    description: "#차박캠핑 #추천추천 #감성영상 #추천뜨자 #틱톡추천",
    user: "chna.y0",
    url: "https://www.tiktok.com/@chna.y0/video/6923863496589397249?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 3",
    videoFileName: "Download 3",
  },
  {
    title: "한 여름밤의 꿈🌿",
    description:
      "✔️밀양 호반캠핑장#호반캠핑장#밀양호반캠핑장#국내여행#캠핑#여행#랜선여행#감성여행#힐링영상#위로영상#추천#tiktoktravel#tiog#추천#추천간판",
    user: "camping1004",
    url: "https://www.tiktok.com/@cho.rong/video/6992939056988441858?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 4",
    videoFileName: "Download 4",
  },
  {
    title: "봄맞이 캠핑에 최적화된 이름부터 유쾌한 캠핑장😀",
    description:
      "📌경기 용인 #싱글벙글캠핑장 / 경기 용인시 처인구 이동읍 상덕로 95-62 #캠핑 #캠핑장 #캠핑장추천 #용인캠핑장 #서울근교캠핑장 #경기도캠핑 📸 insta @hamnya_c",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7356552334194822416",
    userImage: "UserImage 5",
    videoFileName: "Download 5",
  },
  {
    title: "자연과 함께 하는 서울 근교 캠핑장🏞️",
    description:
      "🚗 서울에서 차로 40분 거리 📌경기 김포 #문수골힐링캠핑장 - 경기 김포시 월곶면 문수산로 104-107 #캠핑 #캠핑장 #캠핑장추천 #벚꽃캠핑장 #경기도캠핑장 #서울근교캠핑장 #김포캠핑장 #호수뷰캠핑장 #뷰맛집 #일몰맛집",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7350614692852698369",
    userImage: "UserImage 6",
    videoFileName: "Download 6",
  },
  {
    title: "봄 캠핑의 로망! 벚꽃 맛집 캠핑장🌸",
    description:
      "📌경남 합천 #꿈꾸는핑장 - 경남 합천군 봉산면 서부로 4324 #캠핑 #캠핑장 #캠핑장추천 #벚꽃캠핑장 #경남캠핑 #경남캠핑장 #경상도캠핑장 #봄캠핑장 #벚꽃캠핑 #벚꽃 #초속5센티미터",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7348380455772720386",
    userImage: "UserImage 7",
    videoFileName: "Download 7",
  },
  {
    title: "천혜의 자연 속 특별한 숲 속 캠핑장🏕️",
    description:
      "📌경남 거창 #거창국민여가캠핑장 미리내숲 - 경남 거창군 북상면 덕유월성로 1312 #캠핑 #캠핑장 #캠핑장추천 #숲속캠핑장 #경남캠핑 #경남캠핑장 #경상도캠핑장 #거창여행 #방갈로",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7348747725413813506",
    userImage: "UserImage 8",
    videoFileName: "Download 8",
  },
  {
    title: "유일무이 바다 위 지어진 해상 캠핑장🌊",
    description:
      "📌울산 북구 #당사현대차오션캠프 - 울산 북구 당사동 37 #캠핑 #캠핑장 #캠핑장추천 #바다캠핑장 #울산캠핑 #울산캠핑장 #경상도캠핑장 #오션뷰캠핑장 #프라이빗캠핑장 #뷰맛집",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7347633977554996481",
    userImage: "UserImage 9",
    videoFileName: "Download 9",
  },
  {
    title: "요들송이 들릴 것만 같은 캠핑장🎶",
    description:
      "📌전남 담양 #금성산성오토캠핑장 - 전남 담양군 금성면 새덕굴길 135-88 #캠핑 #캠핑장 #캠핑장추천 #잔디캠핑장 #전라도캠핑장 #전남캠핑장 #담양캠핑장 #캠핑장 #담양여행 #뷰맛집",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7350981721707269377",
    userImage: "UserImage 10",
    videoFileName: "Download 10",
  },
  {
    title: "춤이 절로 춰지는 제주의 푸른 노지 사이트🤫",
    description:
      "📌 제주 #월정리해수욕장 - 제주특별자치도 제주시 구좌읍 행원리 1릭 #백패킹 #백패킹추천 #백패킹장소 #백패킹스팟 #노지캠핑 #제주도캠핑장소 #제주도캠핑 #제주도백패킹 #백패킹장소추천",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7355439372591795457",
    userImage: "UserImage 11",
    videoFileName: "Download 11",
  },
  {
    title: "낭만 한도 초과, 제주도 차박의 모든 것🌊",
    description:
      "👉 차박 추천지 📌제주 한경 #신창풍차해안도로 - 제주 제주시 한경면 신창리 #제주여행 #제주도차박 #제주도캠핑 #제주도차박추천 #차박지추천 #오션뷰차박 #차박꿀팁 #차박장소 #차박장소추천",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7381399730464492801",
    userImage: "UserImage 12",
    videoFileName: "Download 12",
  },
  {
    title: "아담하면서 예쁜 수영장이 있는 지브리st 글램핑장🐸",
    description:
      " 📌강원 홍천 #하늘바라기글램핑 - 강원 홍천군 내촌면 아홉사리로 164-22  #캠핑 #캠핑장 #글램핑장 #글램핑장추천 #글램핑추천 #하늘바라기 #홍천글램핑 #강원도글램핑장 #홍천하늘바라기",
    user: "whyout_official",
    url: "https://www.tiktok.com/@whyout_official/video/7374364883544050960?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 13",
    videoFileName: "Download 13",
  },
  {
    title: "Camping cafe🔥",
    description:
      "#tlogger#tlog#티로거#티로그#색감#위로영상#위로#감성#힐링계#힐링 #서울근교 #korea #🇰🇷 #캠핑 #camping #seoul #seoultravel #koreatravel #koreantiktok #koreatrip",
    user: "hot-chu",
    url: "https://www.tiktok.com/@hot_chu/video/7070690138686311682?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 14",
    videoFileName: "Download 14",
  },
  {
    title: "2H1M",
    description:
      "📍Teratak Kak Ju,Janda BaikBest campsite ni,tapi masih terjejas akibat banjir teruk hujung 2021#campingmalaysia #campsitemalaysia #camplifestyle",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7063358681638915354",
    userImage: "UserImage 15",
    videoFileName: "Download 15",
  },
  {
    title: "Camping vlog with NOCM ✨",
    description:
      "firstime join campmeet dan jumpa geng naturehike yang lain dan membawa pulang 3 hadiah 🙈 jumpa lagi nanti di nocm campmeet 2.0 insyaallah.. Campsite 👉🏻 The Woods Ulu Yam#campingvlog #campingvlogmalaysia #nocm #naturehikemalaysia #campingvibes #campinglife #aestheticcamping #aestheticvlog #fyp #foryou #foryoupage",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7158314845941681435",
    userImage: "UserImage 16",
    videoFileName: "Download 16",
  },
  {
    title: "Just a short camping vlog..",
    description:
      "masuk list tau campsite ni, toilet bersih, view depan sungai, air sungai pon cantik ! #campingaesthetic #campinglife #campinglifestyle #campingmalaysia #campsitemalaysia #campingfood #campingfoodideas #fyp #foryou #foryoupage",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7153192657068592411",
    userImage: "UserImage 17",
    videoFileName: "Download 17",
  },
  {
    title: "Meal i cooked while camping ✨",
    description:
      "Boleh la korang tiru nanti.. apa lagi best nak masak dekat campsite ni ?#campingfood #campingfoodideas #familycamping #familycampingmalaysia #campingmalaysia #malaysiacamping #malaysiacampsite #aestheticvlog #aestheticvideos #campingvlog #myfooddiary #yunkai #yunkaicampsite #myfoodie #campingvibes",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7170934669922323739",
    userImage: "UserImage 18",
    videoFileName: "Download 18",
  },
  {
    title: "Aesthetic camping vlog 🏕️",
    description:
      "📍 bin khalid son’s campsite #campingvlog #campingmalaysia #campingvibes #familycampingmalaysia #naturehikemalaysia #naturehikeoutdoors #khakiscampers #aestheticvlog #aestheticvideos #nightcamping #binkhalidsons",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7196612703283105050",
    userImage: "UserImage 19",
    videoFileName: "Download 19",
  },
  {
    title: "Another memories together",
    description:
      "#campingvlog #campingvibes #glampinglife #naturehike #naturehikeango4 #familycampingmalaysia #malaysiacampsite #camping #campinglife #aestheticcamping #campingaesthetic #aestheticvlog",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7208782811828931867",
    userImage: "UserImage 20",
    videoFileName: "Download 20",
  },
  {
    title: "Cozy camping with me 🌱",
    description:
      "#campingvibes #campingmalaysia #naturehikemalaysia #naturehike #aestheticcamp #aestheticvideos #aestheticvlog #campingvlog #camping #campingglamping",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7240699181625609474",
    userImage: "UserImage 21",
    videoFileName: "Download 21",
  },
  {
    title: "Night vibe ✨",
    description:
      "#camping #campingmalaysia #cozycamping #cozyvibes #campingnight #naturehike #naturehikemalaysia #campingglamping #캠핑 #감성캠핑 #감성캠퍼 #노르디스크 #비무르 #에어텐트 #텐풍 #네이처하이크",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7243987424374787330",
    userImage: "UserImage 22",
    videoFileName: "Download 22",
  },
  {
    title: "Camping with love 🌱",
    description:
      "#camping #campingmalaysia #cozycamping #cozyvibes #campingnight #naturehike #naturehikemalaysia #campingglamping #캠핑 #감성캠핑 #감성캠퍼 #노르디스크 #비무르 #에어텐트 #텐풍 #네이처하이크 #네이처하이크에어텐트",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7250813770962963713",
    userImage: "UserImage 23",
    videoFileName: "Download 23",
  },
  {
    title: "my kind of therapy 💆🏻‍♀️",
    description:
      "#escapefouroutdoor #camping #campingmalaysia #cozycamping #cozyvibes #campingnight #naturehike #naturehikemalaysia #campingglamping #캠핑 #감성캠핑 #감성캠퍼 #노르디스크 #비무르 #에어텐트 #텐풍 #네이처하이크",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7258566815608179969",
    userImage: "UserImage 24",
    videoFileName: "Download 24",
  },
  {
    title: "Camping jadi huru hara gaisssss 🤣",
    description:
      "Betul la cakap otai otai, nak camping dekat tepi pantai ni jiwa nak kena kental.. tak boleh bawak bincang dia punya angin. Tonton vlog penuh di youtube saya #camping #campingmalaysia #cozycamping #cozyvibes #campingnight #naturehike #naturehikemalaysia #campingglamping #캠핑 #감성캠핑 #감성캠퍼 #노르디스크 #비무르 #에어텐트 #텐풍 #네이처하이크",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7284541265171991809",
    userImage: "UserImage 25",
    videoFileName: "Download 25",
  },
  {
    title: "Glamping setup - tent tour ✨",
    description:
      "Special setup just for Wetlands Festival 2024. Ini antara setup terpaling glamping saya pernah buat dan mungkin kali terakhir, penat giler 🤣 Tapi kami enjoy moment dekat event ni, view cantik 👍🏻 Thank you team pilih kami untuk join this event ! Jadi saya simpan memori semalam di sini 🫶🏻#글램핑 #홈어웨이홈 #숲속캠핑 #아웃도어 #캠핑 #가평캠핑장 #glamping #camping #outdoor #campingmalaysia #aestheticvlog #glamcamping #fy #foryourpages #foryou",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7331962348535680257",
    userImage: "UserImage 26",
    videoFileName: "Download 26",
  },
  {
    title: "Siapa tau campsite mana ni ? 🙊",
    description:
      "Best betul ! Akan repeat lagi tempat ni ✨ #camping #familycampingmalaysia #campingmalaysia",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7293375811682307329",
    userImage: "UserImage 27",
    videoFileName: "Download 27",
  },
  {
    title: "Camping",
    description: "#틱톡플랜 #틱톡챌린지 #틱톡초보 #캠핑 #감성캠핑",
    user: "uu8864",
    url: "https://www.tiktok.com/@uu8864/video/6976441020644871426?q=감성캠핑&t=1720161540919",
    userImage: "UserImage 28",
    videoFileName: "Download 28",
  },
  {
    title: "Camp at camp luying 2.0 with Supernova Malaysia ✨",
    description:
      "Creating Another Home Away From Home #글램핑 #홈어웨이홈 #숲속캠핑 #아웃도어 #캠핑 #가평캠핑장 #glamping #camping #outdoor #campingmalaysia #aestheticvlog #glamcamping",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7300466529554992385",
    userImage: "UserImage 29",
    videoFileName: "Download 29",
  },
  {
    title: "Healing at Little England Fraser’s Hill",
    description:
      "Kali ni kami camping di Bukit Fraser pula. #Malaysia #글램핑 #홈어웨이홈 #숲속캠핑 #아웃도어 #캠핑 #가평캠핑장 #glamping #camping #outdoor #campingmalaysia #aestheticvlog #glamcamping",
    user: "eika_atikaa",
    url: "https://www.tiktok.com/@eika_atikaa/video/7303536875237690626",
    userImage: "UserImage 30",
    videoFileName: "Download 30",
  },
];

export default videoData;
