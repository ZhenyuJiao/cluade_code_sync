import { useState, useMemo, useEffect } from 'react';
import { getCases } from '../api';

const EMBEDDED_CASES = [
  {
    "id": 1,
    "title": "用 AI 写小红书文案接单，一单50-200元",
    "category": "写作",
    "difficulty": "入门",
    "timeCost": "每天30分钟",
    "income": "500-2000元/月",
    "problem": "很多小商家和店主想在小红书上推广，但自己不会写文案，请专业写手又太贵。他们会找便宜的代写服务。",
    "solution": "你用 Claude 生成初稿，再根据客户的产品特点稍微调整，一篇高质量种草文案10分钟搞定。",
    "result": "一单收50-200元，熟练后一天接3-5单，月入2000+。老客户还会长期合作。",
    "summary": "帮商家在小红书写种草文案。AI 出初稿你润色，10分钟一篇。闲鱼挂服务，客户源源不断。",
    "steps": ["注册 Claude 账号（claude.ai），有免费额度先用着", "去小红书搜你目标领域（美妆/美食/家居）的爆款笔记，收藏5篇作为参考", "让 Claude 分析这些爆款的共同点：'分析这5篇爆款文案的风格、结构和用词特点'", "用提示词生成初稿：'帮我写一篇[产品名]的小红书种草文案，目标用户是[谁]，风格参考[参考文案]，包含：痛点引入+产品亮点+使用感受+推荐'", "手动改一下，加入「我用了之后…」「朋友都问我…」这种个人体验感", "去闲鱼挂服务：'AI文案代写，一篇XX元，包修改到满意'"],
    "tools": ["Claude", "小红书", "闲鱼"],
    "tips": "前3单免费写，攒案例截图。有作品就好接单了。专注一个领域（比如只做美妆）能越写越好，老客户也会回头。"
  },
  {
    "id": 2,
    "title": "AI 生成头像/壁纸挂闲鱼卖，一单净赚15元",
    "category": "设计", "difficulty": "入门",
    "timeCost": "每天1小时", "income": "1000-3000元/月",
    "problem": "很多人想要好看的微信头像、手机壁纸，但不会自己做。找人设计太贵，网上找的又容易撞款。",
    "solution": "用 AI 绘画工具批量生成各种风格的壁纸和头像，挂到闲鱼上。客户下单后根据要求定制，5分钟出一张。",
    "result": "一张卖5-20元，每天接10-20单，周末更多。节日主题（圣诞/春节）能爆单，一天赚500+。",
    "summary": "用 AI 画好看的壁纸、头像挂闲鱼卖。节日主题容易爆单，一天赚500+。",
    "steps": ["选一个 AI 绘画工具：国内的用通义万相/文心一格（免费），国外的用 Midjourney（付费但效果更好）", "学写提示词：风格+主体+氛围+比例。例如：'治愈系动漫风格，一只柴犬坐在咖啡杯旁，日落光线，柔和色彩，9:16竖版手机壁纸'", "批量生成50张不同风格的，挑最好看的20张上传闲鱼", "闲鱼开店：标题写'原创手机壁纸 定制头像 5元起 不满意重做'", "有人下单后，按他要求的风格现做，5分钟出图，发百度网盘链接交付"],
    "tools": ["AI绘画工具", "闲鱼", "Canva（加字/修图）"],
    "tips": "节日提前两周准备：春节做红色喜庆风，情人节做情侣头像。考试季做'上岸'壁纸，开学季做励志壁纸，都很好卖。"
  },
  {
    "id": 3,
    "title": "用 AI 写短视频脚本，一条50-200元",
    "category": "视频", "difficulty": "进阶",
    "timeCost": "每天1-2小时", "income": "2000-5000元/月",
    "problem": "抖音快手上的中小博主每天要更新，最头疼的就是想选题和写脚本。自己写又慢又容易枯竭。",
    "solution": "用 AI 分析爆款视频结构，批量生成脚本框架。你加点个人风格就能交付。",
    "result": "一条脚本50-200元，一个博主每月要20-30条。服务3-5个博主，月入5000+稳定。",
    "summary": "帮短视频博主写脚本。AI 生成框架你润色，专注一个领域（美食/旅游/知识），老客户月付。",
    "steps": ["选定一个垂直领域：美食、旅游、知识科普、好物推荐…选你最熟悉或感兴趣的", "在该领域找10个爆款视频，让 Claude 分析：'分析这10个爆款脚本的结构，总结出3种万能公式'", "用 Claude 批量生成脚本：'用[公式一]写一个[主题]的60秒短视频脚本，开头2秒要有钩子，中间有反转/干货，结尾引导关注'", "在猪八戒/闲鱼/接单群挂服务：'短视频脚本代写，一条XX元，可试写一条免费'", "签3-5个稳定客户，每月固定供稿"],
    "tools": ["Claude", "剪映", "抖音/快手"],
    "tips": "难点是谈客户，不是写脚本。先免费写3条发小红书展示实力，客户自然来找你。前期报价低一点（30-50元/条）积累口碑。"
  },
  {
    "id": 4,
    "title": "AI 代做Excel数据分析，一单10-50元",
    "category": "办公", "difficulty": "入门",
    "timeCost": "每单15-30分钟", "income": "500-1500元/月",
    "problem": "大量小商家、个体户、甚至公司文员不会用 Excel。要整理销售数据、做统计报表、生成图表，对他们来说很难。",
    "solution": "客户把原始数据发给你，你丢给 AI 处理，整理成表格和图表。你完全不需要懂 Excel 函数。",
    "result": "一单10-50元，15分钟搞定。回头率很高，很多人每月都要做报表。",
    "summary": "帮人处理Excel数据。客户发原始数据，AI自动整理出表格和图表。需求巨大，回头客多。",
    "steps": ["在闲鱼挂服务：'Excel数据处理，10元一次，量大优惠。支持：数据整理/分类汇总/生成图表'", "客户发来数据（比如一堆销售记录或报名表），你直接发给 Claude", "提示词：'帮我把这份数据整理成表格，按日期排序，统计每个产品的销量和金额，生成一个柱状图'", "把 AI 整理好的结果保存，检查一下数据对不对", "发给客户，收钱"],
    "tools": ["Claude", "WPS/Excel", "闲鱼"],
    "tips": "需求量极大，很多小公司每月都要做报表。做成熟客后可以包月服务，一个月200-500元，你每星期花1小时就行。"
  },
  {
    "id": 5,
    "title": "AI PPT 代做，毕业季月入8000+",
    "category": "办公", "difficulty": "进阶",
    "timeCost": "每单1-3小时", "income": "3000-8000元/月",
    "problem": "大学生答辩、职场人年终汇报、创业者路演…都需要PPT。但大部分人做不好，也没时间做。",
    "solution": "用 AI 生成 PPT 内容和配图，再在 Gamma 或美册等工具中一键生成精美的 PPT。",
    "result": "简单PPT一页10元，复杂的一单500+。4-6月毕业季是旺季，一个月能做30-50单。",
    "summary": "帮学生和职场人做PPT。AI出内容，工具排版，你负责质量把控。毕业季月入过万的不少。",
    "steps": ["注册 Gamma.ai 或美册AI（国内），这些工具输入大纲就能自动生成PPT", "让 Claude 生成内容：'帮我写一份[主题]的PPT大纲，包含封面+目录+6页正文+结束页，每页配图建议'", "把大纲导入 Gamma，选好模板，自动生成", "在淘宝/闲鱼开店：'PPT代做，一页10元起，加急另算'", "高质量路演PPT可以报价500-2000元一单"],
    "tools": ["Claude", "Gamma/美册AI", "Canva"],
    "tips": "4月到6月是毕业答辩季，客单价高（100-500元/单），提前一个月开店。年底12月是年终汇报旺季。先把作品集做好挂上去。"
  },
  {
    "id": 6,
    "title": "AI 翻译+人工润色，比纯翻译赚3倍",
    "category": "翻译", "difficulty": "入门",
    "timeCost": "按字数计费", "income": "1000-3000元/月",
    "problem": "很多人需要翻译文档，纯机器翻译不准确，纯人工翻译太贵太慢。AI翻译+人工润色正好解决这个痛点。",
    "solution": "用 AI 做翻译初稿，你逐段检查修正术语和文化表达。比纯人工快10倍，比纯机器准10倍。",
    "result": "中英互译50-100元/千字，专注某个领域（电商/法律）可以报价200元+/千字。",
    "summary": "AI 翻译+人工润色，又快又准。专注电商翻译或医学翻译，收入翻倍。",
    "steps": ["让 AI 翻译：'请把以下内容翻译成英文，保持专业语气。注意：[具体注意事项]'", "逐段读一遍，重点检查：专业术语是否准确、文化表达是否地道、语气是否合适", "修正后放到 Grammarly 里跑一遍语法检查", "在 Upwork/fiverr/淘宝 挂服务：'专业翻译+人工校对，中英互译'", "积累案例后专注一个领域（比如跨境电商翻译），报价可以翻倍"],
    "tools": ["Claude", "DeepL", "Grammarly"],
    "tips": "不要跟纯机器翻译比价格，要比质量。专注做跨境电商产品描述翻译，很多深圳卖家长期需要，一单几千字是常事。"
  }
];

export default function useCases() {
  const [cases, setCases] = useState(EMBEDDED_CASES);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCases().then(data => {
      if (data?.cases?.length) setCases(data.cases);
    }).catch(() => {
      // 后端不可用，使用嵌入式数据
    }).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...cases];

    if (filter !== 'all') {
      result = result.filter(c => c.category === filter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tools?.some(t => t.toLowerCase().includes(q))
      );
    }

    const difficultyOrder = { '入门': 1, '进阶': 2, '高阶': 3 };
    if (sort === 'easiest') {
      result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    } else if (sort === 'highest-income') {
      result.sort((a, b) => {
        const getMax = (s) => parseInt(s.replace(/[^0-9]/g, '').slice(-4)) || 0;
        return getMax(b.income) - getMax(a.income);
      });
    } else {
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  }, [cases, filter, sort, search]);

  const stats = useMemo(() => {
    const cats = new Set(cases.map(c => c.category));
    return { caseCount: cases.length, categoryCount: cats.size };
  }, [cases]);

  return { cases: filtered, allCases: cases, stats, loading, filter, setFilter, sort, setSort, search, setSearch };
}
