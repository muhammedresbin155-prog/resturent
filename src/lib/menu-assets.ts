export type MenuArtwork = {
  name: string;
  category: string;
  description: string;
  image: string;
};

// Artwork and editorial descriptions are reused from the two supplied Stitch screens.
export const menuArtwork: MenuArtwork[] = [
  {
    name: "Hyderabadi Dum Mutton Biriyani",
    category: "Biriyani",
    description: "Slow-cooked tender baby goat layered with aged long-grain basmati, saffron, and fresh ground spices.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmyqVaFCuFWzGntAbBmbfzf7EBnxxHuBqHqT5Aqltfjq72ADJq32Nfh2YRyRfHhdV2mCSDRWAV8iBvu1LRb8JOIDH08Iqu3sOeiVPuhhqT8tr4_vRr7B_byvm7wr0vs-elCbHG0FBSb6_ERUFGYLf-Qjlj_5BKfhQue-abK-NEFcHBU7TbPLoOIEov-2n3jFsyU6b6TuMj6vQ6DV9EXTd7xZwixjV-D8XqVW4Msx4rCO-HgbDPo_rpkg",
  },
  {
    name: "Charcoal Grilled Herb Chicken",
    category: "Grill",
    description: "Smoked organic chicken thigh marinated in crushed coriander, cold-pressed mustard oil, and mountain garlic.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3sPcaGm-8g0_8b2A9_-nnKKzMWNyeRNgQ4UAeDyjZQyUgcEGwuBpmI7ICxO4Wou-z21UtyPmVD0W1PO-LIr8Pr3p0vQTSaVZLjJP-lRXWQWr4VrKPZVPw2OAYl5_FDPfkeOLLEzOpPuphXoRtYNEOvfVe5G8uV9prV5ughlcYSpc7agwzC24e1v6oVIjJjS-xpF-AHf83f5vSkMOzwAcWKhFQW5oQRzCIPgiASAkE0ow9Qyuh0N02oA",
  },
  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    description: "Malai paneer cubes simmered in butter-rich plum tomato gravy finished with artisanal fenugreek.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3SEhPeG6v0ng-FlXJCGKaAgDotY2oxClKSUdHVzEosBkigBbR8GJf5sFttuqrzqgQEuax56k3NGDn00pEMKxCLnvsNU_ditrgXj7G-OqXUXiL6yD6SCvaGRfCQ4N-HW_54APwxEtqf8jXgqd5bsbPCm0eMUUeyqNjEhhhb_CIqJLzkjEwq92es1DLtRtFekjG_0ICI7DWA__yA3bzwN86ZefhhVYrM7jrsv1xJzcLQeTiQHJ-BEfypw",
  },
  {
    name: "Truffle Butter Naan & Dal Makhani",
    category: "Main Course",
    description: "24-hour slow-cooked black urad dal enriched with dairy butter, served with crisp truffle-infused tandoor bread.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAir3c7-tu2PVRaAiMJmwXUp99mbobNVqWxn_An0txYIRvYcyEiUy2w5WnQviquXZS7sREjuZgOccLE0W9uTe5FUlPfoTfBTHf8nftypMojd-Pp0SqVbedvroqu3uJReXqqggRVlTQLzzPlZqtih06pqkcC0JghGwnaoSpEkxtzZWWmyhkFsjKhlbO98fv6LHurJp8JjA-rUImIUz9SLo0NBThe_0jvoFppAWe9YwzYgy4bLz-dk1MtAg",
  },
  {
    name: "Malabar Prawn Biriyani",
    category: "Biriyani",
    description: "Plump Arabian Sea tiger prawns simmered in coastal masala and layered with fragrant Khaima rice.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN_f-ZCmMlOJ7GhMUh9aIfak8QhR4B8DkJTHWeKXwnahjzaTwCOhTy4mvNwiw-41os4DjnXz12nqPNHjDG6gknHMTYWMwf5BkNbON4f4zAv4n_2yp2UE2e_T0IVMHQmx0IyXDR4wnvPQomPvpRQaqWAWoyCS1zdY-5MXuxcvJ3snWx8xWeFyXJuNmommgGxmAgq8XykgebuXxPfckHSAsHqPewRPzaeAnIFj7-ca4ZT0Btp8-2SsGnqA",
  },
  {
    name: "Peri-Peri Flame Grilled Fish",
    category: "Grill",
    description: "Locally sourced catch fillet marinated in house-fermented African bird's eye chili and charred lemon.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpOKQyuTKapO0uytbOZmmCBM4tLgK7bBkmOeCpt8vTEr_E5LbeGS6F3sQdWzAQDnKi-qh-sl4HLBzvgp3oPJr30joqXNl2_ILSmzaqCcZNv-4ckU2toeuIECOHOQ9JT4L91R8XH5LjrDNa07Gr_1kS7xDbOG1wrgJ5LIV0OBnGxu4UtvYyfh6gSo5bGpKhg5uiZUImM1kkAQl-B8TKBkTyFX27xoboruAB1LQCbqi2znqpIkleIdadIQ",
  },
  {
    name: "Crispy Lotus Stem & Spiced Corn",
    category: "Snacks",
    description: "Golden tossed lotus root rings and sweet kernels with crushed Sichuan pepper, scallions, and dry mango glaze.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIfONEfHCCCX871P8LdCpz5ztzIGIofoSVky48YjWMyHlK_QaNXxe-EyJV1ozMCgv7aPK6xWe6WGq2oZ_8bsJ_9qEYRU5DIKAGu8mZy0iYqhz-47yMBqSELdzzLOqQGTWci285Z9wiM0nhJL_1q_Njj68HVRUNWBS2LNVwubCmgIbIZlVSwbbpzdRavZFP1cuHPjwzMWfcV84NQLwwkiCc_MhZz8FidH8uwfGlwBtYWOve3KZzAdm2Ig",
  },
  {
    name: "Smoked Mutton Seekh Kebab",
    category: "Grill",
    description: "Minced goat shoulder infused with caramelized mint, brown onions, and aromatic royal garam masala.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASVxMp4Bln9V_hD7jPrb0d45AxV-xTxSCiAixhmqY7ZRGX3Qna0-asIC1S7xs1sSAGd0MHNbR6My5BicMZYliqKy3NiXRX5R88-iEVKOyQnEFr1HB36PvXrEMuRLRaSM64MgTrw-9gRU8KfjyiZMXGsXOe42ICD7htKqEhzbmyNgg-zdhgd9NGjnE_kEI-GhGrtsmGfAv_Lj5IJbwCiox0STu-cOWiEyGLK_iZmXppMQnWQic25BOEUw",
  },
  {
    name: "Fresh Cold-Pressed Valencia Orange Juice",
    category: "Juice",
    description: "100% pure extraction from ripe seasonal sun-ripened oranges, zero added sugar or preservatives.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN50l8WeEgCS3gWa92qG_wCFRX5Cek0hSCLAJm_-ycNzX19CIfDlWy7E4vc8Ls9SZy39UeVAzugwS_MDWwXe2k_hYdzZOglgd2P0MeUicXfbFTcj4k7CLgFcGtVhhh8Kl5q-vY-n1yb0F0ianfLlrgY22jbE_Zq0EOO47uVYvrtRXYuZF_SV5VYt5VQm6yJOx_ME-2d9f0y_yEdMm1LDCbaN65bZJHEvJusoHpNCtbE96l_K0Jh_oBww",
  },
  {
    name: "Spiced Pomegranate & Mint Refresher",
    category: "Juice",
    description: "Cold-pressed ruby arils laced with garden mint, pink rock salt, and toasted cumin distillate.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx7C8fk7TVEYmvUPkgAMKDYZW7tnKVRB8RAseEQ-_LLrk0CRzc2Nws3dFaeKB7SN58xIINJjjtvyHg3M9xWqmlda_dn-axllvi7lMujn_PGwt0p4rrxlZ-fY7gXQgqeb5GXb9DCwgAQwWneDiAoUe_-q0vsyaMkSnBm50C7MGeKd6Yv9kRbq41ukocFYU__2TnBETazliP-Er_zw3qscZ34bPc2zRNnIA56KQiPT-ttoYvfNtwSWkfaQ",
  },
  {
    name: "Golden Stuffed Samosa Chaat Platter",
    category: "Snacks",
    description: "Crisp shortcrust samosas smothered with Punjabi chole, spiced Greek yogurt, tamarind chutney, and fine sev.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoTUIxrJB0ZmZIWZygzHd7gjjw9bBpwQircf-2Vp-CgHUgrnbVe9vMAlZj4x_u_tJ9RbiSj-tPqiI-sUtWS3GDggcULDUHdPf3rnnBrbf85e-q9BWbWR8HwqE0KtdxgwmMeEVpVgMckBeqlvdthLO76c5ctyQ8VvJgzDIn-zXx-5KMbepIzSKN9sAYHNvptAULrNwORyLFahAJm6XxGlqS_jyswWWY7nWxoEIlhoBhOWYB4zIUQQc1Cw",
  },
  {
    name: "Awadhi Chicken Biriyani",
    category: "Biriyani",
    description: "Fragrant royal yakhni broth infused with rose water and whole mace, gently steamed with bone-in chicken.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOXpAA4qqq8bGDA8MbaoCkdvmwEEsS_ALXc8otVsHHxJ9mEizPczuWxQZUfuXRj6rzP3aByOHZ1sLT6GaW4MCkGjM1OpY87LtoH4WT7ZZWW0hVbIgYLcNk2R9bzyDSVUzzozNH9nwZOXrqI9VlR4tktuZHMdouLTn5aKEHTTMBoq1UXFzvYHAbJyyD1-nKVsTARjhemhUVXlpi5Qtg4zRG3SvZK-GSaTOgM_3YbwKnK7fYAl3F3MgOXg",
  },
];

const normalized = (value: string) => value.toLocaleLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

export function artworkFor(name: string, category: string, id: string) {
  const normalizedName = normalized(name);
  const exact = menuArtwork.find((artwork) => normalized(artwork.name) === normalizedName);
  if (exact) return exact;

  const imagePool = menuArtwork.filter((artwork) => artwork.category.toLowerCase() === category.toLowerCase());
  const fallback = imagePool.length ? imagePool : menuArtwork;
  const numericId = Number(id.replace(/\D/g, ""));
  const index = Number.isFinite(numericId) && numericId > 0
    ? (numericId - 1) % fallback.length
    : [...id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % fallback.length;
  return fallback[index];
}

export function descriptionFor(name: string) {
  const exact = menuArtwork.find((artwork) => normalized(artwork.name) === normalized(name));
  return exact?.description ?? "A fresh selection from the Verdant Kitchen menu, prepared to order.";
}
