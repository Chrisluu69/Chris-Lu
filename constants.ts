
import { Question, Era } from './types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'c1',
    era: Era.CLASSICAL,
    text: "是誰提出了「失範」（Anomie）的概念，用以描述現代社會中社會規範崩潰的狀態？",
    options: ["卡爾·馬克思", "埃米爾·涂爾幹", "馬克斯·韋伯", "格奧爾格·齊美爾"],
    correctIndex: 1,
    explanation: "涂爾幹在《社會分工論》和《自殺論》中引入了「失範」概念，描述一種由於社會整合不足導致的規範缺失狀態。"
  },
  {
    id: 'c2',
    era: Era.CLASSICAL,
    text: "在《新教倫理與資本主義精神》中，哪位思想家論證了宗教觀念如何影響經濟發展？",
    options: ["馬克斯·韋伯", "奧古斯特·孔德", "赫伯特·斯賓塞", "維弗雷多·帕累托"],
    correctIndex: 0,
    explanation: "韋伯認為加爾文教派的禁慾主義為現代資本主義的興起提供了心理條件和倫理動力。"
  },
  {
    id: 'm1',
    era: Era.MODERN,
    text: "歐文·高夫曼使用哪種概念將社會互動分析為一場戲劇表演？",
    options: ["功能主義", "戲劇理論", "社會交換論", "衝突論"],
    correctIndex: 1,
    explanation: "高夫曼在《日常生活的自我呈現》中使用了戲劇比喻，解釋個人如何進行印象管理。"
  },
  {
    id: 'm2',
    era: Era.MODERN,
    text: "誰是「結構功能主義」的主要架構師，並開發了 AGIL 模型？",
    options: ["羅伯特·默頓", "C·賴特·米爾斯", "塔爾科特·帕森斯", "尼克拉斯·魯曼"],
    correctIndex: 2,
    explanation: "帕森斯開發了 AGIL 模型（適應、達標、整合、維模），作為社會系統的一般理論。"
  },
  {
    id: 'pm1',
    era: Era.POST_MODERN,
    text: "哪位哲學家探討了權力與知識之間的關係，並使用了「全景監獄」的比喻？",
    options: ["尚·布希亞", "米歇爾·傅柯", "雅克·德希達", "尚-法蘭索瓦·李歐塔"],
    correctIndex: 1,
    explanation: "傅柯在《規訓與懲罰》中借用邊沁的全景監獄來闡述現代社會中的監視、規訓與權力運作。"
  },
  {
    id: 'pm2',
    era: Era.POST_MODERN,
    text: "哪位學者提出了「流動的現代性」（Liquid Modernity）這一概念？",
    options: ["齊格蒙·鮑曼", "烏利希·貝克", "安東尼·紀登斯", "皮耶·布迪厄"],
    correctIndex: 0,
    explanation: "鮑曼用「流動的現代性」來描述晚期現代社會中持續變遷且缺乏固態結構的特徵。"
  },
  {
    id: 'pm3',
    era: Era.POST_MODERN,
    text: "誰將後現代定義為「對元敘事的懷疑」？",
    options: ["尚-法蘭索瓦·李歐塔", "吉爾·德勒茲", "朱迪斯·巴特勒", "愛德華·薩伊德"],
    correctIndex: 0,
    explanation: "李歐塔在《後現代狀態》中提出，後現代的核心特徵是對宏大敘事或元敘事的合法性產生懷疑。"
  }
];
